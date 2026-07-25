import { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useNotes } from '../../hooks/useNotes'
import AdminModal from '../../components/AdminModal'

const emptyForm = { title: '', content: '' }

export default function NotesPage() {
  const { user } = useAuth()
  const { notes, loadUserNotes, createNote, updateNote, deleteNote } = useNotes()
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [viewNote, setViewNote] = useState(null)
  const [confirmId, setConfirmId] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (user?.id) loadUserNotes(user.id)
  }, [user?.id, loadUserNotes])

  const filtered = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase())
  )

  const openCreate = () => {
    setForm(emptyForm)
    setModal('create')
  }

  const openEdit = (note) => {
    setForm({ title: note.title, content: note.content })
    setModal({ type: 'edit', id: note.id })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (modal === 'create') {
      createNote(user.id, form)
    } else if (modal?.type === 'edit') {
      updateNote(user.id, modal.id, form)
    }
    setModal(null)
  }

  const handleDelete = (id) => {
    deleteNote(user.id, id)
    setConfirmId(null)
  }

  const inputClass =
    'mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 outline-none focus:border-primary-500 dark:border-white/20 dark:bg-navy-900 dark:text-white'

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-800 dark:text-white">Notes</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Create, edit, and manage your study notes
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="rounded-lg bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600"
        >
          + Add Note
        </button>
      </div>

      <input
        type="text"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary-500 dark:border-white/20 dark:bg-navy-800 dark:text-white"
      />

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center dark:border-white/10 dark:bg-navy-800/50">
          <p className="text-gray-500 dark:text-gray-400">
            {search ? 'No notes match your search.' : 'No notes yet. Click "Add Note" to create one.'}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((note) => (
            <div
              key={note.id}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-navy-800/50"
            >
              <h3 className="font-semibold text-navy-800 dark:text-white">{note.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm text-gray-600 dark:text-gray-400">{note.content}</p>
              <p className="mt-2 text-xs text-gray-400">{new Date(note.updatedAt).toLocaleDateString()}</p>
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => { setViewNote(note); setModal('view') }}
                  className="rounded bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 dark:bg-white/10 dark:text-gray-300"
                >
                  View
                </button>
                <button
                  type="button"
                  onClick={() => openEdit(note)}
                  className="rounded bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                >
                  Edit
                </button>
                {confirmId === note.id ? (
                  <>
                    <button type="button" onClick={() => handleDelete(note.id)} className="rounded bg-red-500 px-3 py-1.5 text-xs font-medium text-white">Confirm</button>
                    <button type="button" onClick={() => setConfirmId(null)} className="rounded bg-gray-200 px-3 py-1.5 text-xs font-medium dark:bg-white/10">Cancel</button>
                  </>
                ) : (
                  <button type="button" onClick={() => setConfirmId(note.id)} className="rounded bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 dark:bg-red-900/20 dark:text-red-400">Delete</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <AdminModal open={modal === 'create' || modal?.type === 'edit'} onClose={() => setModal(null)} title={modal === 'create' ? 'Create Note' : 'Edit Note'} wide>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
            <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content</label>
            <textarea required rows={6} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className={inputClass} />
          </div>
          <button type="submit" className="w-full rounded-lg bg-primary-500 py-3 font-semibold text-white hover:bg-primary-600">
            {modal === 'create' ? 'Create Note' : 'Update Note'}
          </button>
        </form>
      </AdminModal>

      <AdminModal open={modal === 'view'} onClose={() => setModal(null)} title={viewNote?.title || 'Note'} wide>
        {viewNote && (
          <div>
            <p className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300">{viewNote.content}</p>
            <p className="mt-4 text-xs text-gray-400">Last updated: {new Date(viewNote.updatedAt).toLocaleString()}</p>
          </div>
        )}
      </AdminModal>
    </div>
  )
}
