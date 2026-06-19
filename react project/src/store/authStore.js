import { create } from 'zustand'
import { STORAGE_KEYS } from '../utils/constants'
import { getItem, setItem, removeItem } from '../utils/storage'

function loadUsers() {
  return getItem(STORAGE_KEYS.AUTH_USER) || []
}

function saveUsers(users) {
  setItem(STORAGE_KEYS.AUTH_USER, users)
}

function loadSession() {
  return getItem(STORAGE_KEYS.AUTH_SESSION)
}

function saveSession(session) {
  setItem(STORAGE_KEYS.AUTH_SESSION, session)
}

function clearSession() {
  removeItem(STORAGE_KEYS.AUTH_SESSION)
}

export const useAuthStore = create((set, get) => ({
  user: loadSession(),
  isLoading: false,
  error: null,

  register: async ({ name, email, password }) => {
    set({ isLoading: true, error: null })

    await new Promise((resolve) => setTimeout(resolve, 600))

    const users = loadUsers()
    const normalizedEmail = email.trim().toLowerCase()

    if (users.some((u) => u.email === normalizedEmail)) {
      set({ isLoading: false, error: 'An account with this email already exists.' })
      return false
    }

    if (password.length < 6) {
      set({ isLoading: false, error: 'Password must be at least 6 characters.' })
      return false
    }

    const newUser = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: normalizedEmail,
      password,
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)
    saveUsers(users)

    const session = { id: newUser.id, name: newUser.name, email: newUser.email }
    saveSession(session)
    set({ user: session, isLoading: false, error: null })
    return true
  },

  login: async ({ email, password }) => {
    set({ isLoading: true, error: null })

    await new Promise((resolve) => setTimeout(resolve, 600))

    const users = loadUsers()
    const normalizedEmail = email.trim().toLowerCase()
    const found = users.find(
      (u) => u.email === normalizedEmail && u.password === password
    )

    if (!found) {
      set({ isLoading: false, error: 'Invalid email or password.' })
      return false
    }

    const session = { id: found.id, name: found.name, email: found.email }
    saveSession(session)
    set({ user: session, isLoading: false, error: null })
    return true
  },

  logout: () => {
    clearSession()
    set({ user: null, error: null })
  },

  clearError: () => set({ error: null }),

  hydrate: () => {
    const session = loadSession()
    set({ user: session })
  },
}))
