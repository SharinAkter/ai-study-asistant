import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdmin } from '../../hooks/useAdmin'
import { useAuth } from '../../hooks/useAuth'
import AdminModal from '../../components/AdminModal'

export default function AdminDataPage() {
  const {
    getAllStorageKeys,
    getStorageData,
    updateStorageData,
    deleteStorageKey,
    exportAllData,
    importAllData,
    resetAllData,
  } = useAdmin()
  const { logout } = useAuth()
  const navigate = useNavigate()

  const [selectedKey, setSelectedKey] = useState(null)
  const [editJson, setEditJson] = useState('')
  const [jsonError, setJsonError] = useState('')
  const [importText, setImportText] = useState('')
  const [modal, setModal] = useState(null)
  const [, setTick] = useState(0)

  const refresh = () => setTick((t) => t + 1)
  const keys = getAllStorageKeys()

  const openView = (key) => {
    const { data } = getStorageData(key)
    setSelectedKey(key)
    setEditJson(JSON.stringify(data, null, 2))
    setJsonError('')
    setModal('view')
  }

  const handleSaveJson = () => {
    try {
      const parsed = JSON.parse(editJson)
      updateStorageData(selectedKey, parsed)
      setJsonError('')
      setModal(null)
      refresh()
    } catch {
      setJsonError('Invalid JSON format.')
    }
  }

  const handleDeleteKey = (key) => {
    deleteStorageKey(key)
    setModal(null)
    refresh()
  }

  const handleExport = () => {
    const data = exportAllData()
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ai-study-assistant-backup-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = () => {
    try {
      const parsed = JSON.parse(importText)
      importAllData(parsed)
      setImportText('')
      setModal(null)
      refresh()
    } catch {
      setJsonError('Invalid JSON format.')
    }
  }

  const handleReset = () => {
    resetAllData()
    logout()
    navigate('/')
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-800 sm:text-3xl dark:text-white">Data Management</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">View, edit, export, and import all localStorage data</p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={handleExport} className="rounded-lg bg-green-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-600">
            Export All
          </button>
          <button type="button" onClick={() => { setImportText(''); setJsonError(''); setModal('import') }} className="rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-600">
            Import
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-navy-800/50">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-white/5">
            <tr>
              <th className="px-6 py-4 font-semibold text-navy-800 dark:text-white">Storage Key</th>
              <th className="px-6 py-4 font-semibold text-navy-800 dark:text-white">Has Data</th>
              <th className="px-6 py-4 font-semibold text-navy-800 dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {keys.map((key) => {
              const { data } = getStorageData(key)
              const hasData = data !== null && data !== undefined
              return (
                <tr key={key} className="border-b border-gray-100 dark:border-white/5">
                  <td className="px-6 py-4 font-mono text-xs text-navy-800 dark:text-white">{key}</td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${hasData ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-500'}`}>
                      {hasData ? 'Yes' : 'Empty'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      <button type="button" onClick={() => openView(key)} className="rounded bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 dark:bg-white/10 dark:text-gray-300">
                        {hasData ? 'View/Edit' : 'Create'}
                      </button>
                      {hasData && (
                        <button type="button" onClick={() => { setSelectedKey(key); setModal('delete') }} className="rounded bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 dark:bg-red-900/20 dark:text-red-400">
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-6 dark:border-red-900/50 dark:bg-red-900/10">
        <h2 className="text-lg font-semibold text-red-700 dark:text-red-400">Danger Zone</h2>
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">Reset all data including users, settings, and logs.</p>
        <button type="button" onClick={() => setModal('reset')} className="mt-4 rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100 dark:border-red-800 dark:text-red-400">
          Reset All Data
        </button>
      </div>

      <AdminModal open={modal === 'view'} onClose={() => setModal(null)} title={`Edit: ${selectedKey}`} wide>
        {jsonError && <div className="mb-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">{jsonError}</div>}
        <textarea
          rows={12}
          value={editJson}
          onChange={(e) => setEditJson(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-gray-50 p-4 font-mono text-xs outline-none focus:border-primary-500 dark:border-white/20 dark:bg-navy-900 dark:text-white"
        />
        <div className="mt-4 flex gap-3">
          <button type="button" onClick={handleSaveJson} className="rounded-lg bg-primary-500 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-600">Save</button>
          <button type="button" onClick={() => setModal(null)} className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium dark:bg-white/10">Cancel</button>
        </div>
      </AdminModal>

      <AdminModal open={modal === 'import'} onClose={() => setModal(null)} title="Import Data" wide>
        {jsonError && <div className="mb-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">{jsonError}</div>}
        <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">Paste a JSON backup file contents below.</p>
        <textarea
          rows={10}
          value={importText}
          onChange={(e) => setImportText(e.target.value)}
          placeholder='{"auth_user": [...], "app_settings": {...}}'
          className="w-full rounded-lg border border-gray-300 bg-gray-50 p-4 font-mono text-xs outline-none focus:border-primary-500 dark:border-white/20 dark:bg-navy-900 dark:text-white"
        />
        <button type="button" onClick={handleImport} className="mt-4 w-full rounded-lg bg-blue-500 py-3 font-semibold text-white hover:bg-blue-600">Import Data</button>
      </AdminModal>

      <AdminModal open={modal === 'delete'} onClose={() => setModal(null)} title="Delete Storage Key">
        <p className="text-sm text-gray-600 dark:text-gray-400">Delete all data for <code className="font-mono text-red-600">{selectedKey}</code>?</p>
        <div className="mt-4 flex gap-3">
          <button type="button" onClick={() => handleDeleteKey(selectedKey)} className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600">Delete</button>
          <button type="button" onClick={() => setModal(null)} className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium dark:bg-white/10">Cancel</button>
        </div>
      </AdminModal>

      <AdminModal open={modal === 'reset'} onClose={() => setModal(null)} title="Reset All Data">
        <p className="text-sm text-red-600 dark:text-red-400">This will permanently delete ALL data and log you out. Cannot be undone.</p>
        <div className="mt-4 flex gap-3">
          <button type="button" onClick={handleReset} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700">Yes, Reset Everything</button>
          <button type="button" onClick={() => setModal(null)} className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium dark:bg-white/10">Cancel</button>
        </div>
      </AdminModal>
    </div>
  )
}
