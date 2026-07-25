import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import path from 'path'
import { GoogleGenerativeAI } from '@google/generative-ai'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '.env') })

const app = express()
const PORT = process.env.PORT || 5000
const MODEL = process.env.GOOGLE_AI_MODEL || 'gemini-flash-lite-latest'
const FALLBACK_MODELS = ['gemini-flash-lite-latest', 'gemini-flash-latest']
const API_KEY = process.env.GOOGLE_AI_API_KEY?.trim()

app.use(cors())
app.use(express.json())

function getModel() {
  if (!API_KEY) {
    throw new Error('Google AI API key is not configured. Add GOOGLE_AI_API_KEY to your .env file and restart the server.')
  }
  const genAI = new GoogleGenerativeAI(API_KEY)
  return genAI.getGenerativeModel({ model: MODEL })
}

function formatApiError(err) {
  const msg = err?.message || String(err)

  if (msg.includes('API key is not configured')) {
    return msg
  }

  if (msg.includes('429') || msg.includes('quota') || msg.includes('Quota exceeded')) {
    return `AI quota limit reached for model "${MODEL}". Wait a few minutes and try again, or change GOOGLE_AI_MODEL in .env (e.g. gemini-2.0-flash-lite). Check usage: https://aistudio.google.com/`
  }

  if (msg.includes('API_KEY_INVALID') || msg.includes('API key not valid')) {
    return 'Invalid Google AI API key. Create a new key at https://aistudio.google.com/apikey and add it to .env as GOOGLE_AI_API_KEY, then restart the server.'
  }

  return msg.split('\n')[0]
}

async function generateReply(prompt) {
  const modelsToTry = [MODEL, ...FALLBACK_MODELS.filter((m) => m !== MODEL)]
  let lastError

  for (const modelName of modelsToTry) {
    try {
      const model = getModel(modelName)
      const result = await model.generateContent(prompt)
      return result.response.text()
    } catch (err) {
      lastError = err
      if (!isQuotaError(err)) throw err
    }
  }

  throw lastError
}

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'AI Study Assistant API is running',
    provider: 'google-ai',
    model: MODEL,
    keyConfigured: !!API_KEY,
  })
})

app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required.' })
    }

    const reply = await generateReply(
      `You are a helpful AI study assistant for students. Answer clearly and support learning.\n\nStudent question: ${message.trim()}`
    )

    res.json({ reply })
  } catch (err) {
    res.status(500).json({ error: formatApiError(err) })
  }
})

app.post('/summarize', async (req, res) => {
  try {
    const { text } = req.body

    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'Text is required.' })
    }

    const summary = await generateReply(
      `Summarize the following study notes in clear, concise bullet points for quick revision:\n\n${text.trim()}`
    )

    res.json({ summary })
  } catch (err) {
    res.status(500).json({ error: formatApiError(err) })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  console.log(`Using Google AI model: ${MODEL}`)
  console.log(`API key loaded: ${API_KEY ? 'Yes' : 'No — check .env file'}`)
})
