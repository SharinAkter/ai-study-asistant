import { useAuth } from '../hooks/useAuth'

const dashboardCards = [
  {
    title: 'Notes',
    description: 'Manage your study notes — add, edit, and organize materials.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  },
  {
    title: 'Quiz',
    description: 'Practice with multiple-choice quizzes to test your knowledge.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
  },
  {
    title: 'Summary',
    description: 'Get smart summaries of lengthy notes for quick revision.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  },
  {
    title: 'Planner',
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
  const firstName = user?.name?.split(' ')[0] || 'Student'

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy-800 sm:text-3xl dark:text-white">
          Welcome Back, {firstName}!
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Your study dashboard — modules coming in future phases.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardCards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-navy-800/50"
          >
            <div className={`mb-4 inline-flex rounded-xl p-3 ${card.color}`}>
              {card.icon}
            </div>
            <h2 className="text-lg font-semibold text-navy-800 dark:text-white">{card.title}</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{card.description}</p>
            <span className="mt-4 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500 dark:bg-white/10 dark:text-gray-400">
              Coming Soon
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-navy-800/50">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-navy-800 dark:text-white">
            Your Progress This Week
          </h2>
          <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
            0% Completed
          </span>
        </div>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-white/10">
          <div className="h-full w-0 rounded-full bg-gradient-to-r from-primary-500 to-primary-400" />
        </div>
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          Progress tracking will be available once study modules are implemented.
        </p>
      </div>
    </div>
  )
}
