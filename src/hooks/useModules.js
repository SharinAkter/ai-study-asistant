import { useEffect } from 'react'
import { useAdminStore } from '../store/adminStore'

export function useModules() {
  const modules = useAdminStore((s) => s.settings.modules)
  const reloadSettings = useAdminStore((s) => s.reloadSettings)

  useEffect(() => {
    reloadSettings()
  }, [reloadSettings])

  return modules
}

export function isModuleEnabled(modules, key) {
  return modules[key] === true
}
