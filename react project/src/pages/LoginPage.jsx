import { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import LoadingSpinner from '../components/LoadingSpinner'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading, error, clearError, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/dashboard'

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, navigate, from])

  useEffect(() => {
    return () => clearError()
  }, [clearError])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await login({ email, password })
    if (success) {
      navigate(from, { replace: true })
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl sm:p-8 dark:border-white/10 dark:bg-navy-800">
      <h1 className="text-2xl font-bold text-navy-800 dark:text-white">Welcome Back</h1>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Sign in to continue your study journey
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {error && (
          <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-white/20 dark:bg-navy-900 dark:text-white"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-white/20 dark:bg-navy-900 dark:text-white"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-500 py-3 font-semibold text-white transition hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <LoadingSpinner size="sm" />
              Signing in...
            </>
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400">
          Register
        </Link>
      </p>
    </div>
  )
}
