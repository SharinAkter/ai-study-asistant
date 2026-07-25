import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useAdminStore } from '../store/adminStore'
import ThemeToggle from './ThemeToggle'

const navLinks = [
  { label: 'Overview', to: '/admin', end: true },
  { label: 'Users', to: '/admin/users' },
  { label: 'Announcements', to: '/admin/announcements' },
  { label: 'Settings', to: '/admin/settings' },
  { label: 'Data', to: '/admin/data' },
  { label: 'Sessions', to: '/admin/sessions' },
]

export default function AdminNavbar() {
  const { user, logout } = useAuth()
  const siteName = useAdminStore((s) => s.settings.siteName)
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setMenuOpen(false)
  }

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive
        ? 'text-primary-600 dark:text-primary-400'
        : 'text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-navy-900/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/admin" className="flex items-center gap-2">
          <img src="/logo.png" alt="" className="h-9 w-9 rounded-full object-cover" />
          <span className="text-lg font-bold text-navy-800 dark:text-white">
            {siteName}
            <span className="ml-2 rounded bg-red-500 px-2 py-0.5 text-xs text-white">Admin</span>
          </span>
        </Link>

        <div className="hidden items-center gap-5 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
          <span className="text-sm text-gray-500 dark:text-gray-400">{user?.name}</span>
          <ThemeToggle />
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200 dark:bg-white/10 dark:text-gray-200 dark:hover:bg-white/20"
          >
            Logout
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-gray-200 px-4 py-4 md:hidden dark:border-white/10">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.end} onClick={() => setMenuOpen(false)} className={linkClass}>
                {link.label}
              </NavLink>
            ))}
            <button type="button" onClick={handleLogout} className="text-left text-sm font-medium text-gray-600 dark:text-gray-300">
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
