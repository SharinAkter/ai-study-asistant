import { create } from 'zustand'
import { STORAGE_KEYS } from '../utils/constants'
import { getItem, setItem } from '../utils/storage'

function applyTheme(isDark) {
  document.documentElement.classList.toggle('dark', isDark)
}

const savedTheme = getItem(STORAGE_KEYS.THEME)
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
const initialDark = savedTheme !== null ? savedTheme === 'dark' : prefersDark

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
