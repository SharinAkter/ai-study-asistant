import { Link } from 'react-router-dom'

export default function ModulePage({ title, description, icon, color }) {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 flex items-center gap-4">
        <div className={`rounded-2xl p-4 ${color}`}>{icon}</div>
        <div>
          <h1 className="text-2xl font-bold text-navy-800 sm:text-3xl dark:text-white">{title}</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">{description}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm dark:border-white/10 dark:bg-navy-800/50">
        <div className={`mx-auto mb-4 inline-flex rounded-full p-4 ${color}`}>{icon}</div>
        <h2 className="text-lg font-semibold text-navy-800 dark:text-white">{title} is Ready</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-gray-600 dark:text-gray-400">
          This module has been enabled by your admin. Full features will be available in the next development phase.
        </p>
        <Link
          to="/dashboard"
          className="mt-6 inline-block rounded-lg bg-primary-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-600"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  )
}
