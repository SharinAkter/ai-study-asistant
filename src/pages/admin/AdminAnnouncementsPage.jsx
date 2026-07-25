import { useState } from 'react'
import { useAdmin } from '../../hooks/useAdmin'
import AdminModal from '../../components/AdminModal'
import ToggleSwitch from '../../components/ToggleSwitch'

const emptyForm = { title: '', message: '', type: 'info', active: true }

const typeColors = {
  info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  error: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
}

export default function AdminAnnouncementsPage() {
  const { getAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement } = useAdmin()
  const [announcements, setAnnouncements] = useState(getAnnouncements())
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [confirmId, setConfirmId] = useState(null)

  const refresh = () => setAnnouncements(getAnnouncements())

  const openCreate = () => {
    setForm(emptyForm)
    setModal('create')
  }

  const openEdit = (item) => {
    setForm({ title: item.title, message: item.message, type: item.type, active: item.active })
    setModal({ type: 'edit', id: item.id })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (modal === 'create') createAnnouncement(form)
    else if (modal?.type === 'edit') updateAnnouncement(modal.id, form)
    setModal(null)
    refresh()
  }

  const handleDelete = (id) => {
    deleteAnnouncement(id)
    setConfirmId(null)
    refresh()
  }

  const inputClass =
    'mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 outline-none focus:border-primary-500 dark:border-white/20 dark:bg-navy-900 dark:text-white'

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-800 sm:text-3xl dark:text-white">Announcements</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">Create and manage site-wide announcements</p>
        </div>
        <button type="button" onClick={openCreate} className="rounded-lg bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600">
          + Add Announcement
        </button>
      </div>

      {announcements.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center text-gray-500 dark:border-white/10 dark:bg-navy-800/50 dark:text-gray-400">
          No announcements yet.
        </div>
      ) : (
        <div className="space-y-4">
          {announcements.map((a) => (
            <div key={a.id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-navy-800/50">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-navy-800 dark:text-white">{a.title}</h3>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${typeColors[a.type]}`}>{a.type}</span>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${a.active ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-500'}`}>
                      {a.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{a.message}</p>
                  <p className="mt-2 text-xs text-gray-400">{new Date(a.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <button type="button" onClick={() => openEdit(a)} className="rounded bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">Edit</button>
                  {confirmId === a.id ? (
                    <>
                      <button type="button" onClick={() => handleDelete(a.id)} className="rounded bg-red-500 px-3 py-1.5 text-xs font-medium text-white">Confirm</button>
                      <button type="button" onClick={() => setConfirmId(null)} className="rounded bg-gray-200 px-3 py-1.5 text-xs font-medium dark:bg-white/10">Cancel</button>
                    </>
                  ) : (
                    <button type="button" onClick={() => setConfirmId(a.id)} className="rounded bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 dark:bg-red-900/20 dark:text-red-400">Delete</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AdminModal open={modal === 'create' || modal?.type === 'edit'} onClose={() => setModal(null)} title={modal === 'create' ? 'Create Announcement' : 'Edit Announcement'} wide>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
            <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
            <textarea required rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className={inputClass}>
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="success">Success</option>
                <option value="error">Error</option>
              </select>
            </div>
            <div className="flex items-end gap-3 pb-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Active</span>
              <ToggleSwitch enabled={form.active} onToggle={() => setForm({ ...form, active: !form.active })} color="green" />
            </div>
          </div>
          <button type="submit" className="w-full rounded-lg bg-primary-500 py-3 font-semibold text-white hover:bg-primary-600">
            {modal === 'create' ? 'Create' : 'Update'}
          </button>
        </form>
      </AdminModal>
    </div>
  )
}
