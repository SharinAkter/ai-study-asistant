import { Navigate } from 'react-router-dom'
import { useModules, isModuleEnabled } from '../hooks/useModules'

export default function ModuleRoute({ module, children }) {
  const modules = useModules()

  if (!isModuleEnabled(modules, module)) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}
