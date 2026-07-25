import { useState } from 'react'
import { useAdmin } from '../../hooks/useAdmin'
import AdminModal from '../../components/AdminModal'

export default function AdminSessionsPage() {
  const { getSession, clearSession, getActivityLog, clearActivityLog } = useAdmin()
  const [session, setSession] = useState(getSession())
  const [logs, setLogs] = useState(getActivityLog())
  const [confirmClear, setConfirmClear] = useState(false)

  const refresh = () => {
    setSession(getSession())
    setLogs(getActivityLog())
  }

  const handleClearSession = () => {
    clearSession()
    refresh()
  }

  const handleClearLog = () => {
    clearActivityLog()
    refresh()
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy-800 sm:text-3xl dark:text-white">Sessions &amp; Activity</h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">Monitor active sessions and admin activity log</p>
      </div>

      <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-navy-800/50">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-navy-800 dark:text-white">Active Session</h2>
          {session && (
            <button type="button" onClick={handleClearSession} className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400">
              Force Logout
            </button>
          )}
        </div>
        {!session ? (
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">No active session in localStorage.</p>
        ) : (
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between border-b border-gray-100 py-2 dark:border-white/10">
              <dt className="text-gray-500">User</dt>
              <dd className="font-medium text-navy-800 dark:text-white">{session.name}</dd>
            </div>
            <div className="flex justify-between border-b border-gray-100 py-2 dark:border-white/10">
              <dt className="text-gray-500">Email</dt>
              <dd>{session.email}</dd>
            </div>
            <div className="flex justify-between border-b border-gray-100 py-2 dark:border-white/10">
              <dt className="text-gray-500">Role</dt>
              <dd>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${session.role === 'admin' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                  {session.role || 'user'}
                </span>
              </dd>
            </div>
            <div className="flex justify-between py-2">
              <dt className="text-gray-500">Session ID</dt>
              <dd className="font-mono text-xs">{session.id}</dd>
            </div>
          </dl>
        )}
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-navy-800/50">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-navy-800 dark:text-white">Activity Log</h2>
          {logs.length > 0 && (
            <button type="button" onClick={() => setConfirmClear(true)} className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-white/10 dark:text-gray-300">
              Clear Log
            </button>
          )}
        </div>
        {logs.length === 0 ? (
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">No activity recorded yet.</p>
        ) : (
          <div className="mt-4 max-h-96 overflow-y-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-white/10">
                  <th className="pb-2 font-semibold text-navy-800 dark:text-white">Action</th>
                  <th className="pb-2 font-semibold text-navy-800 dark:text-white">Details</th>
                  <th className="pb-2 font-semibold text-navy-800 dark:text-white">Time</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} className="border-b border-gray-100 dark:border-white/5">
                    <td className="py-2 font-mono text-xs text-primary-600 dark:text-primary-400">{log.action}</td>
                    <td className="py-2 text-gray-600 dark:text-gray-400">{log.details}</td>
                    <td className="py-2 text-xs text-gray-400">{new Date(log.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AdminModal open={confirmClear} onClose={() => setConfirmClear(false)} title="Clear Activity Log">
        <p className="text-sm text-gray-600 dark:text-gray-400">This will permanently delete all activity log entries.</p>
        <div className="mt-4 flex gap-3">
          <button type="button" onClick={() => { handleClearLog(); setConfirmClear(false) }} className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600">Clear Log</button>
          <button type="button" onClick={() => setConfirmClear(false)} className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium dark:bg-white/10">Cancel</button>
        </div>
      </AdminModal>
    </div>
  )
}
