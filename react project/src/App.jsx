import { BrowserRouter } from 'react-router-dom'
import { useEffect } from 'react'
import AppRoutes from './routes/AppRoutes'
import { useAuthStore } from './store/authStore'

export default function App() {
  const hydrate = useAuthStore((s) => s.hydrate)

  useEffect(() => {
    hydrate()
  }, [hydrate])

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
