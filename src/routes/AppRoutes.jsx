import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import AuthLayout from '../layouts/AuthLayout'
import DashboardLayout from '../layouts/DashboardLayout'
import AdminLayout from '../layouts/AdminLayout'
import AdminRoute from '../components/AdminRoute'
import ModuleRoute from '../components/ModuleRoute'
import LandingPage from '../pages/LandingPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import MaintenancePage from '../pages/MaintenancePage'
import DashboardPage from '../pages/DashboardPage'
import NotesPage from '../pages/modules/NotesPage'
import SummaryPage from '../pages/modules/SummaryPage'
import PlannerPage from '../pages/modules/PlannerPage'
import AdminDashboardPage from '../pages/admin/AdminDashboardPage'
import AdminUsersPage from '../pages/admin/AdminUsersPage'
import AdminSettingsPage from '../pages/admin/AdminSettingsPage'
import AdminAnnouncementsPage from '../pages/admin/AdminAnnouncementsPage'
import AdminDataPage from '../pages/admin/AdminDataPage'
import AdminSessionsPage from '../pages/admin/AdminSessionsPage'
import { useAuth } from '../hooks/useAuth'
import { useAdminStore } from '../store/adminStore'

function GuestOnlyRoute({ children }) {
  const { isAuthenticated, isAdmin } = useAuth()
  if (isAuthenticated) {
    return <Navigate to={isAdmin ? '/admin' : '/dashboard'} replace />
  }
  return children
}

function UserRoute({ children }) {
  const { isAuthenticated, isAdmin } = useAuth()
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  if (isAdmin) {
    return <Navigate to="/admin" replace />
  }
  return children
}

export default function AppRoutes() {
  const { isAdmin } = useAuth()
  const maintenanceMode = useAdminStore((s) => s.settings.maintenanceMode)
  const location = useLocation()

  const allowDuringMaintenance = location.pathname === '/login'

  if (maintenanceMode && !isAdmin && !allowDuringMaintenance) {
    return <MaintenancePage />
  }

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<LandingPage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="login" element={<GuestOnlyRoute><LoginPage /></GuestOnlyRoute>} />
        <Route path="register" element={<GuestOnlyRoute><RegisterPage /></GuestOnlyRoute>} />
      </Route>

      <Route element={<UserRoute><DashboardLayout /></UserRoute>}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="notes" element={<ModuleRoute module="notes"><NotesPage /></ModuleRoute>} />
        <Route path="summary" element={<ModuleRoute module="summary"><SummaryPage /></ModuleRoute>} />
        <Route path="planner" element={<ModuleRoute module="planner"><PlannerPage /></ModuleRoute>} />
      </Route>

      <Route element={<AdminRoute><AdminLayout /></AdminRoute>}>
        <Route path="admin" element={<AdminDashboardPage />} />
        <Route path="admin/users" element={<AdminUsersPage />} />
        <Route path="admin/announcements" element={<AdminAnnouncementsPage />} />
        <Route path="admin/settings" element={<AdminSettingsPage />} />
        <Route path="admin/data" element={<AdminDataPage />} />
        <Route path="admin/sessions" element={<AdminSessionsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
