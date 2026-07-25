import { Link } from 'react-router-dom'

export default function MaintenancePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-100 px-4 text-center dark:from-navy-900 dark:via-navy-900 dark:to-navy-800">
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xl sm:p-10 dark:border-white/10 dark:bg-navy-800">
        <div className="mx-auto mb-4 inline-flex rounded-full bg-amber-100 p-4 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
          <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-navy-800 sm:text-3xl dark:text-white">
          We&apos;ll Be Right Back
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-gray-600 dark:text-gray-400">
          This site is currently undergoing maintenance. Please check back shortly.
        </p>
        <Link
          to="/login"
          className="mt-6 inline-block rounded-lg bg-primary-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-600"
        >
          Admin Login
        </Link>
      </div>
    </div>
  )
}
