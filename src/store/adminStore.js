import { create } from 'zustand'
import { STORAGE_KEYS } from '../utils/constants'
import { ADMIN_CREDENTIALS } from '../utils/admin'
import { getItem, setItem, removeItem } from '../utils/storage'

export const defaultSettings = {
  siteName: 'AI Study Assistant',
  siteDescription: 'Smart and interactive study platform for students',
  contactEmail: 'support@aistudy.com',
  allowRegistration: true,
  maintenanceMode: false,
  defaultTheme: 'light',
  passwordMinLength: 6,
  maxUsers: 0,
  announcementBanner: '',
  modules: {
    notes: true,
    summary: true,
    planner: true,
  },
  announcements: [],
}

function loadUsers() {
  return getItem(STORAGE_KEYS.AUTH_USER) || []
}

function saveUsers(users) {
  setItem(STORAGE_KEYS.AUTH_USER, users)
}

function loadSettings() {
  const saved = getItem(STORAGE_KEYS.APP_SETTINGS) || {}

  // Only keep module keys that still exist in the current app (drops stale/removed modules)
  const modules = Object.keys(defaultSettings.modules).reduce((acc, key) => {
    acc[key] = saved.modules?.[key] ?? defaultSettings.modules[key]
    return acc
  }, {})

  return {
    ...defaultSettings,
    ...saved,
    modules,
    announcements: saved.announcements || [],
  }
}

function saveSettings(settings) {
  setItem(STORAGE_KEYS.APP_SETTINGS, settings)
}

function loadLog() {
  return getItem(STORAGE_KEYS.ADMIN_LOG) || []
}

function saveLog(log) {
  setItem(STORAGE_KEYS.ADMIN_LOG, log.slice(-100))
}

function addLog(action, details) {
  const log = loadLog()
  log.unshift({
    id: crypto.randomUUID(),
    action,
    details,
    timestamp: new Date().toISOString(),
  })
  saveLog(log)
}

export const useAdminStore = create((set, get) => ({
  settings: loadSettings(),

  getStats: () => {
    const users = loadUsers()
    const session = getItem(STORAGE_KEYS.AUTH_SESSION)
    const settings = get().settings
    const enabledModules = Object.values(settings.modules).filter(Boolean).length
    return {
      totalUsers: users.length,
      activeSession: session ? 1 : 0,
      sessionData: session,
      recentUsers: users.slice(-5).reverse(),
      totalAnnouncements: settings.announcements.length,
      activeAnnouncements: settings.announcements.filter((a) => a.active).length,
      enabledModules,
      activityCount: loadLog().length,
    }
  },

  getUsers: () => loadUsers(),

  getUserById: (id) => loadUsers().find((u) => u.id === id) || null,

  createUser: ({ name, email, password, role = 'user', status = 'active' }) => {
    const users = loadUsers()
    const normalizedEmail = email.trim().toLowerCase()

    if (normalizedEmail === ADMIN_CREDENTIALS.email) {
      return { ok: false, error: 'This email is reserved for admin.' }
    }
    if (users.some((u) => u.email === normalizedEmail)) {
      return { ok: false, error: 'Email already exists.' }
    }
    if (password.length < get().settings.passwordMinLength) {
      return { ok: false, error: `Password must be at least ${get().settings.passwordMinLength} characters.` }
    }

    const maxUsers = get().settings.maxUsers
    if (maxUsers > 0 && users.length >= maxUsers) {
      return { ok: false, error: `Maximum user limit (${maxUsers}) reached.` }
    }

    const user = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: normalizedEmail,
      password,
      role,
      status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    users.push(user)
    saveUsers(users)
    addLog('CREATE_USER', `Created user: ${user.email}`)
    return { ok: true, user }
  },

  updateUser: (id, updates) => {
    const users = loadUsers()
    const index = users.findIndex((u) => u.id === id)
    if (index === -1) return { ok: false, error: 'User not found.' }

    const normalizedEmail = updates.email?.trim().toLowerCase()
    if (normalizedEmail && normalizedEmail !== users[index].email) {
      if (normalizedEmail === ADMIN_CREDENTIALS.email) {
        return { ok: false, error: 'This email is reserved for admin.' }
      }
      if (users.some((u) => u.email === normalizedEmail && u.id !== id)) {
        return { ok: false, error: 'Email already exists.' }
      }
    }

    if (updates.password && updates.password.length < get().settings.passwordMinLength) {
      return { ok: false, error: `Password must be at least ${get().settings.passwordMinLength} characters.` }
    }

    const { password, ...restUpdates } = updates
    const updated = {
      ...users[index],
      ...restUpdates,
      email: normalizedEmail || users[index].email,
      name: updates.name?.trim() || users[index].name,
      updatedAt: new Date().toISOString(),
    }
    if (password) updated.password = password

    users[index] = updated
    saveUsers(users)
    addLog('UPDATE_USER', `Updated user: ${updated.email}`)
    return { ok: true, user: updated }
  },

  deleteUser: (userId) => {
    const users = loadUsers()
    const user = users.find((u) => u.id === userId)
    if (!user) return false
    saveUsers(users.filter((u) => u.id !== userId))
    addLog('DELETE_USER', `Deleted user: ${user.email}`)
    return true
  },

  bulkDeleteUsers: (ids) => {
    const users = loadUsers().filter((u) => !ids.includes(u.id))
    saveUsers(users)
    addLog('BULK_DELETE_USERS', `Deleted ${ids.length} users`)
    return true
  },

  searchUsers: (query) => {
    const q = query.toLowerCase().trim()
    if (!q) return loadUsers()
    return loadUsers().filter(
      (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    )
  },

  getSession: () => getItem(STORAGE_KEYS.AUTH_SESSION),

  clearSession: () => {
    removeItem(STORAGE_KEYS.AUTH_SESSION)
    addLog('CLEAR_SESSION', 'Active session cleared')
    return true
  },

  updateSettings: (updates) => {
    const settings = { ...get().settings, ...updates }
    saveSettings(settings)
    set({ settings })
    addLog('UPDATE_SETTINGS', Object.keys(updates).join(', '))
    return settings
  },

  toggleModule: (module) => {
    const settings = get().settings
    const modules = { ...settings.modules, [module]: !settings.modules[module] }
    return get().updateSettings({ modules })
  },

  getAnnouncements: () => get().settings.announcements,

  createAnnouncement: ({ title, message, type = 'info', active = true }) => {
    const settings = get().settings
    const announcement = {
      id: crypto.randomUUID(),
      title: title.trim(),
      message: message.trim(),
      type,
      active,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    const announcements = [...settings.announcements, announcement]
    get().updateSettings({ announcements })
    addLog('CREATE_ANNOUNCEMENT', announcement.title)
    return announcement
  },

  updateAnnouncement: (id, updates) => {
    const settings = get().settings
    const announcements = settings.announcements.map((a) =>
      a.id === id ? { ...a, ...updates, updatedAt: new Date().toISOString() } : a
    )
    get().updateSettings({ announcements })
    addLog('UPDATE_ANNOUNCEMENT', id)
    return true
  },

  deleteAnnouncement: (id) => {
    const settings = get().settings
    const announcements = settings.announcements.filter((a) => a.id !== id)
    get().updateSettings({ announcements })
    addLog('DELETE_ANNOUNCEMENT', id)
    return true
  },

  getActivityLog: () => loadLog(),

  clearActivityLog: () => {
    removeItem(STORAGE_KEYS.ADMIN_LOG)
    return true
  },

  getAllStorageKeys: () => Object.values(STORAGE_KEYS),

  getStorageData: (key) => ({ key, data: getItem(key) }),

  updateStorageData: (key, data) => {
    setItem(key, data)
    addLog('UPDATE_STORAGE', key)
    return true
  },

  deleteStorageKey: (key) => {
    if (key === STORAGE_KEYS.AUTH_SESSION) {
      removeItem(key)
    } else {
      removeItem(key)
    }
    addLog('DELETE_STORAGE', key)
    if (key === STORAGE_KEYS.APP_SETTINGS) {
      set({ settings: loadSettings() })
    }
    return true
  },

  exportAllData: () => {
    const data = {}
    Object.values(STORAGE_KEYS).forEach((key) => {
      data[key] = getItem(key)
    })
    addLog('EXPORT_DATA', 'Full data export')
    return data
  },

  importAllData: (data) => {
    Object.entries(data).forEach(([key, value]) => {
      if (Object.values(STORAGE_KEYS).includes(key)) {
        setItem(key, value)
      }
    })
    set({ settings: loadSettings() })
    addLog('IMPORT_DATA', 'Full data import')
    return true
  },

  resetAllData: () => {
    Object.values(STORAGE_KEYS).forEach((key) => removeItem(key))
    set({ settings: defaultSettings })
    addLog('RESET_ALL', 'All data reset')
  },

  reloadSettings: () => {
    set({ settings: loadSettings() })
  },
}))

export { ADMIN_CREDENTIALS }
