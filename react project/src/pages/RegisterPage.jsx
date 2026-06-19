import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import LoadingSpinner from '../components/LoadingSpinner'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [formError, setFormError] = useState('')
  const { register, isLoading, error, clearError, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true })
    }
  }, [isAuthenticated, navigate])

  useEffect(() => {
    return () => clearError()
  }, [clearError])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')

    if (password !== confirmPassword) {
      setFormError('Passwords do not match.')
      return
    }

    const success = await register({ name, email, password })
    if (success) {
      navigate('/dashboard', { replace: true })
    }
  }

  const displayError = formError || error

  return (
    <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl sm:p-8 dark:border-white/10 dark:bg-navy-800">
      <h1 className="text-2xl font-bold text-navy-800 dark:text-white">Create Account</h1>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Start organizing your studies today
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {displayError && (
          <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
            {displayError}
          </div>
        )}

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-white/20 dark:bg-navy-900 dark:text-white"
            placeholder="John Doe"
          />
        </div>

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
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-white/20 dark:bg-navy-900 dark:text-white"
            placeholder="Min. 6 characters"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
              Creating account...
            </>
          ) : (
            'Create Account'
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400">
          Sign In
        </Link>
      </p>
    </div>
  )
}
