import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import AnnouncementBanner from '../components/AnnouncementBanner'
import { useAdminStore } from '../store/adminStore'

export default function DashboardLayout() {
  const reloadSettings = useAdminStore((s) => s.reloadSettings)

  useEffect(() => {
    reloadSettings()
  }, [reloadSettings])

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-navy-900">
      <Navbar variant="dashboard" />
      <AnnouncementBanner />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
