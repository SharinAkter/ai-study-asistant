import { useState } from 'react'
import { useAdminStore } from '../store/adminStore'

const typeStyles = {
  info: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
  warning: 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300',
  success: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300',
  error: 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300',
}

export default function AnnouncementBanner() {
  const settings = useAdminStore((s) => s.settings)
  const [dismissed, setDismissed] = useState([])

  const items = [
    ...(settings.announcementBanner?.trim()
      ? [{ id: 'banner', type: 'info', message: settings.announcementBanner.trim() }]
      : []),
    ...settings.announcements.filter((a) => a.active),
  ].filter((item) => !dismissed.includes(item.id))

  if (items.length === 0) return null

  return (
    <div className="flex flex-col gap-2 px-4 py-2 sm:px-6 lg:px-8">
      {items.map((item) => (
        <div
          key={item.id}
          className={`flex items-center justify-between gap-3 rounded-lg px-4 py-2.5 text-sm ${typeStyles[item.type] || typeStyles.info}`}
        >
          <span>
            {item.title ? <strong className="font-semibold">{item.title}: </strong> : null}
            {item.message}
          </span>
          <button
            type="button"
            onClick={() => setDismissed((d) => [...d, item.id])}
            className="shrink-0 rounded p-1 hover:bg-black/5 dark:hover:bg-white/10"
            aria-label="Dismiss"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  )
}
