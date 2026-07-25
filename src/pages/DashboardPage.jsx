import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useModules, isModuleEnabled } from '../hooks/useModules'

const dashboardCards = [
  {
    key: 'notes',
    title: 'Notes',
    to: '/notes',
    description: 'Manage your study notes — add, edit, and organize materials.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  },
  {
    key: 'summary',
    title: 'Summary',
    to: '/summary',
    description: 'Get smart summaries of lengthy notes for quick revision.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  },
  {
    key: 'planner',
    title: 'Planner',
    to: '/planner',
    description: 'Plan your study routine and track daily tasks.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  },
]

export default function DashboardPage() {
  const { user } = useAuth()
  const modules = useModules()
  const firstName = user?.name?.split(' ')[0] || 'Student'
  const enabledCount = Object.values(modules).filter(Boolean).length

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy-800 sm:text-3xl dark:text-white">
          Welcome Back, {firstName}!
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {enabledCount > 0
            ? `${enabledCount} module${enabledCount > 1 ? 's' : ''} enabled — click a card to get started.`
            : 'Your study dashboard — waiting for admin to enable modules.'}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardCards.map((card) => {
          const enabled = isModuleEnabled(modules, card.key)
          return (
            <div
              key={card.key}
              className={`rounded-2xl border bg-white p-6 shadow-sm transition dark:bg-navy-800/50 ${
                enabled
                  ? 'border-primary-200 hover:shadow-md dark:border-primary-800/50'
                  : 'border-gray-200 dark:border-white/10'
              }`}
            >
              <div className={`mb-4 inline-flex rounded-xl p-3 ${card.color}`}>
                {card.icon}
              </div>
              <h2 className="text-lg font-semibold text-navy-800 dark:text-white">{card.title}</h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{card.description}</p>
              {enabled ? (
                <Link
                  to={card.to}
                  className="mt-4 inline-block rounded-lg bg-primary-500 px-4 py-2 text-xs font-semibold text-white hover:bg-primary-600"
                >
                  Open {card.title}
                </Link>
              ) : (
                <span className="mt-4 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500 dark:bg-white/10 dark:text-gray-400">
                  Coming Soon
                </span>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-navy-800/50">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-navy-800 dark:text-white">
            Your Progress This Week
          </h2>
          <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
            {enabledCount > 0 ? '0% Completed' : '—'}
          </span>
        </div>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-400 transition-all"
            style={{ width: enabledCount > 0 ? '0%' : '0%' }}
          />
        </div>
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          {enabledCount > 0
            ? 'Start using enabled modules to track your progress.'
            : 'Progress tracking will be available once modules are enabled.'}
        </p>
      </div>
    </div>
  )
}
