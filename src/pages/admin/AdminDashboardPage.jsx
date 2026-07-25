import { Link } from 'react-router-dom'
import { useAdmin } from '../../hooks/useAdmin'
import { useAuth } from '../../hooks/useAuth'

export default function AdminDashboardPage() {
  const { user } = useAuth()
  const { getStats, settings } = useAdmin()
  const stats = getStats()

  const statCards = [
    { label: 'Total Users', value: stats.totalUsers, color: 'text-blue-600 dark:text-blue-400' },
    { label: 'Active Session', value: stats.activeSession, color: 'text-green-600 dark:text-green-400' },
    { label: 'Announcements', value: stats.totalAnnouncements, color: 'text-purple-600 dark:text-purple-400' },
    { label: 'Modules Enabled', value: stats.enabledModules, color: 'text-amber-600 dark:text-amber-400' },
    { label: 'Registration', value: settings.allowRegistration ? 'Open' : 'Closed', color: 'text-indigo-600 dark:text-indigo-400' },
    { label: 'Maintenance', value: settings.maintenanceMode ? 'On' : 'Off', color: 'text-red-600 dark:text-red-400' },
  ]

  const quickLinks = [
    { label: 'Manage Users', to: '/admin/users', desc: 'Create, edit, delete users' },
    { label: 'Announcements', to: '/admin/announcements', desc: 'Site-wide notices' },
    { label: 'App Settings', to: '/admin/settings', desc: 'Platform configuration' },
    { label: 'Data Management', to: '/admin/data', desc: 'Export, import, backup' },
    { label: 'Sessions & Log', to: '/admin/sessions', desc: 'Monitor activity' },
  ]

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy-800 sm:text-3xl dark:text-white">Admin Overview</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Welcome, {user?.name}. Full control panel for AI Study Assistant.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-navy-800/50">
            <p className="text-sm text-gray-500 dark:text-gray-400">{card.label}</p>
            <p className={`mt-1 text-2xl font-bold ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-navy-800/50">
          <h2 className="text-lg font-semibold text-navy-800 dark:text-white">Quick Actions</h2>
          <ul className="mt-4 space-y-2">
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3 transition hover:bg-primary-50 dark:bg-white/5 dark:hover:bg-white/10">
                  <div>
                    <p className="font-medium text-navy-800 dark:text-white">{link.label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{link.desc}</p>
                  </div>
                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-navy-800/50">
          <h2 className="text-lg font-semibold text-navy-800 dark:text-white">Recent Users</h2>
          {stats.recentUsers.length === 0 ? (
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">No users yet.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {stats.recentUsers.map((u) => (
                <li key={u.id} className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3 dark:bg-white/5">
                  <div>
                    <p className="font-medium text-navy-800 dark:text-white">{u.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{u.email}</p>
                  </div>
                  <span className="text-xs text-gray-400">{new Date(u.createdAt).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
