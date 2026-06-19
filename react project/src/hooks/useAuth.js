import { useAuthStore } from '../store/authStore'

export function useAuth() {
  const user = useAuthStore((s) => s.user)
  const isLoading = useAuthStore((s) => s.isLoading)
  const error = useAuthStore((s) => s.error)
  const register = useAuthStore((s) => s.register)
  const login = useAuthStore((s) => s.login)
  const logout = useAuthStore((s) => s.logout)
  const clearError = useAuthStore((s) => s.clearError)

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    register,
    login,
    logout,
    clearError,
  }
}
