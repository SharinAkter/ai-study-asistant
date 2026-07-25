import { BrowserRouter } from 'react-router-dom'
import { useEffect } from 'react'
import AppRoutes from './routes/AppRoutes'
import { useAuthStore } from './store/authStore'
import { useAdminStore } from './store/adminStore'

export default function App() {
  const hydrate = useAuthStore((s) => s.hydrate)
  const reloadSettings = useAdminStore((s) => s.reloadSettings)
  const siteName = useAdminStore((s) => s.settings.siteName)
  const siteDescription = useAdminStore((s) => s.settings.siteDescription)

  useEffect(() => {
    hydrate()
    reloadSettings()
  }, [hydrate, reloadSettings])

  useEffect(() => {
    document.title = siteName
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', siteDescription)
    } else {
      const tag = document.createElement('meta')
      tag.name = 'description'
      tag.content = siteDescription
      document.head.appendChild(tag)
    }
  }, [siteName, siteDescription])

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
