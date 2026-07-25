const API_BASE = import.meta.env.DEV ? '/api' : 'http://localhost:5000'

async function request(endpoint, body) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const data = await res.json()

  if (!res.ok) {
    const msg = data.error || 'Request failed'
    if (msg.includes('429') || msg.includes('quota') || msg.includes('Quota exceeded')) {
      throw new Error('AI quota limit reached. Wait a few minutes or change GOOGLE_AI_MODEL in .env, then restart the server.')
    }
    throw new Error(msg.length > 200 ? msg.slice(0, 200) + '…' : msg)
  }

  return data
}

export async function sendChatMessage(message) {
  const data = await request('/chat', { message })
  return data.reply
}

export async function summarizeText(text) {
  const data = await request('/summarize', { text })
  return data.summary
}
