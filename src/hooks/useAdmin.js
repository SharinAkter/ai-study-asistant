import { useAdminStore } from '../store/adminStore'

export function useAdmin() {
  const settings = useAdminStore((s) => s.settings)
  const getStats = useAdminStore((s) => s.getStats)
  const getUsers = useAdminStore((s) => s.getUsers)
  const getUserById = useAdminStore((s) => s.getUserById)
  const createUser = useAdminStore((s) => s.createUser)
  const updateUser = useAdminStore((s) => s.updateUser)
  const deleteUser = useAdminStore((s) => s.deleteUser)
  const bulkDeleteUsers = useAdminStore((s) => s.bulkDeleteUsers)
  const searchUsers = useAdminStore((s) => s.searchUsers)
  const getSession = useAdminStore((s) => s.getSession)
  const clearSession = useAdminStore((s) => s.clearSession)
  const updateSettings = useAdminStore((s) => s.updateSettings)
  const toggleModule = useAdminStore((s) => s.toggleModule)
  const getAnnouncements = useAdminStore((s) => s.getAnnouncements)
  const createAnnouncement = useAdminStore((s) => s.createAnnouncement)
  const updateAnnouncement = useAdminStore((s) => s.updateAnnouncement)
  const deleteAnnouncement = useAdminStore((s) => s.deleteAnnouncement)
  const getActivityLog = useAdminStore((s) => s.getActivityLog)
  const clearActivityLog = useAdminStore((s) => s.clearActivityLog)
  const getAllStorageKeys = useAdminStore((s) => s.getAllStorageKeys)
  const getStorageData = useAdminStore((s) => s.getStorageData)
  const updateStorageData = useAdminStore((s) => s.updateStorageData)
  const deleteStorageKey = useAdminStore((s) => s.deleteStorageKey)
  const exportAllData = useAdminStore((s) => s.exportAllData)
  const importAllData = useAdminStore((s) => s.importAllData)
  const resetAllData = useAdminStore((s) => s.resetAllData)
  const reloadSettings = useAdminStore((s) => s.reloadSettings)

  return {
    settings,
    getStats,
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    bulkDeleteUsers,
    searchUsers,
    getSession,
    clearSession,
    updateSettings,
    toggleModule,
    getAnnouncements,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    getActivityLog,
    clearActivityLog,
    getAllStorageKeys,
    getStorageData,
    updateStorageData,
    deleteStorageKey,
    exportAllData,
    importAllData,
    resetAllData,
    reloadSettings,
  }
}
