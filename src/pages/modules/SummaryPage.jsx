import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { sendChatMessage, summarizeText } from '../../utils/api'
import { getItem, setItem } from '../../utils/storage'
import { STORAGE_KEYS } from '../../utils/constants'
import LoadingSpinner from '../../components/LoadingSpinner'

function loadChatHistory(userId) {
  const all = getItem(STORAGE_KEYS.CHAT_HISTORY) || {}
  return all[userId] || []
}

function saveChatHistory(userId, messages) {
  const all = getItem(STORAGE_KEYS.CHAT_HISTORY) || {}
  all[userId] = messages
  setItem(STORAGE_KEYS.CHAT_HISTORY, all)
}

export default function SummaryPage() {
  const { user } = useAuth()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [noteText, setNoteText] = useState('')
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)
  const [summarizing, setSummarizing] = useState(false)
  const [error, setError] = useState('')
  const [tab, setTab] = useState('chat')
  const bottomRef = useRef(null)

  useEffect(() => {
    if (user?.id) {
      setMessages(loadChatHistory(user.id))
    }
  }, [user?.id])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleChat = async (e) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMsg = { role: 'user', content: input.trim(), time: new Date().toISOString() }
    const updated = [...messages, userMsg]
    setMessages(updated)
    setInput('')
    setLoading(true)
    setError('')

    try {
      const reply = await sendChatMessage(userMsg.content)
      const final = [...updated, { role: 'assistant', content: reply, time: new Date().toISOString() }]
      setMessages(final)
      saveChatHistory(user.id, final)
    } catch (err) {
      setError(err.message)
      setMessages(updated.slice(0, -1))
    } finally {
      setLoading(false)
    }
  }

  const handleSummarize = async () => {
    if (!noteText.trim() || summarizing) return
    setSummarizing(true)
    setError('')
    setSummary('')

    try {
      const result = await summarizeText(noteText)
      setSummary(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setSummarizing(false)
    }
  }

  const clearChat = () => {
    setMessages([])
    saveChatHistory(user.id, [])
  }

  const inputClass =
    'w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 outline-none focus:border-primary-500 dark:border-white/20 dark:bg-navy-900 dark:text-white'

  return (
    <div className="mx-auto flex h-[calc(100vh-8rem)] max-w-4xl flex-col">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-navy-800 dark:text-white">AI Study Assistant</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Chat with AI or summarize your study notes
        </p>
      </div>

      <div className="mb-4 flex gap-2">
        <button
          type="button"
          onClick={() => setTab('chat')}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            tab === 'chat'
              ? 'bg-primary-500 text-white'
              : 'bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-300'
          }`}
        >
          AI Chat
        </button>
        <button
          type="button"
          onClick={() => setTab('summarize')}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            tab === 'summarize'
              ? 'bg-primary-500 text-white'
              : 'bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-300'
          }`}
        >
          Smart Summary
        </button>
      </div>

      {error && (
        <div className="mb-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      {tab === 'chat' ? (
        <>
          <div className="flex-1 overflow-y-auto rounded-2xl border border-gray-200 bg-white p-4 dark:border-white/10 dark:bg-navy-800/50">
            {messages.length === 0 ? (
              <div className="flex h-full items-center justify-center text-center text-sm text-gray-500 dark:text-gray-400">
                Ask anything about your studies — the AI assistant is ready to help.
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                        msg.role === 'user'
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-gray-200'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl bg-gray-100 px-4 py-3 dark:bg-white/10">
                      <LoadingSpinner size="sm" />
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
            )}
          </div>

          <div className="mt-3 flex gap-2">
            {messages.length > 0 && (
              <button
                type="button"
                onClick={clearChat}
                className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 dark:border-white/20 dark:text-gray-400"
              >
                Clear
              </button>
            )}
            <form onSubmit={handleChat} className="flex flex-1 gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask your study question..."
                className={inputClass}
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="rounded-lg bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600 disabled:opacity-50"
              >
                Send
              </button>
            </form>
          </div>
        </>
      ) : (
        <div className="flex flex-1 flex-col gap-4">
          <textarea
            rows={8}
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Paste your lengthy study notes here..."
            className={`${inputClass} flex-1 resize-none`}
          />
          <button
            type="button"
            onClick={handleSummarize}
            disabled={summarizing || !noteText.trim()}
            className="flex items-center justify-center gap-2 rounded-lg bg-primary-500 py-3 font-semibold text-white hover:bg-primary-600 disabled:opacity-50"
          >
            {summarizing ? (
              <>
                <LoadingSpinner size="sm" />
                Summarizing...
              </>
            ) : (
              'Generate Summary'
            )}
          </button>
          {summary && (
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-navy-800/50">
              <h3 className="mb-3 font-semibold text-navy-800 dark:text-white">Summary</h3>
              <div className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300">{summary}</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
