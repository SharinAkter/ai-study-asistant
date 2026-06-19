import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 bg-gray-50 px-4 py-10 sm:px-6 lg:px-8 dark:border-white/10 dark:bg-navy-800/50">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="" className="h-8 w-8 rounded-full" />
          <span className="font-semibold text-navy-800 dark:text-white">
            Ai <span className="text-primary-500">Study</span> Assistant
          </span>
        </div>

        <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-400">
          <a href="#features" className="hover:text-primary-600 dark:hover:text-primary-400">
            Features
          </a>
          <Link to="/login" className="hover:text-primary-600 dark:hover:text-primary-400">
            Login
          </Link>
          <Link to="/register" className="hover:text-primary-600 dark:hover:text-primary-400">
            Register
          </Link>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-500">
          &copy; {year} AI Study Assistant. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
