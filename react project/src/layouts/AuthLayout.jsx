import { Link, Outlet } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-navy-900 dark:via-navy-900 dark:to-navy-800">
      <header className="flex items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="" className="h-9 w-9 rounded-full" />
          <span className="text-lg font-bold text-navy-800 dark:text-white">
            Ai <span className="text-primary-500">Study</span>
          </span>
        </Link>
        <ThemeToggle />
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}
