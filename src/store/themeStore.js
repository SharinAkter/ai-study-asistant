import { create } from 'zustand'
import { STORAGE_KEYS } from '../utils/constants'
import { getItem, setItem } from '../utils/storage'

function applyTheme(isDark) {
  document.documentElement.classList.toggle('dark', isDark)
}

function getInitialDark() {
  const savedTheme = getItem(STORAGE_KEYS.THEME)
  if (savedTheme !== null) return savedTheme === 'dark'

  const appSettings = getItem(STORAGE_KEYS.APP_SETTINGS)
  const adminDefault = appSettings?.defaultTheme
  if (adminDefault === 'dark') return true
  if (adminDefault === 'light') return false

  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

const initialDark = getInitialDark()
applyTheme(initialDark)

export const useThemeStore = create((set) => ({
  isDark: initialDark,
  toggleTheme: () =>
    set((state) => {
      const next = !state.isDark
      applyTheme(next)
      setItem(STORAGE_KEYS.THEME, next ? 'dark' : 'light')
      return { isDark: next }
    }),
}))
