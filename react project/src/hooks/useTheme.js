import { useThemeStore } from '../store/themeStore'

export function useTheme() {
  const isDark = useThemeStore((s) => s.isDark)
  const toggleTheme = useThemeStore((s) => s.toggleTheme)

  return { isDark, toggleTheme }
}
