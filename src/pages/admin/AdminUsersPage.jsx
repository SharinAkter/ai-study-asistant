import { useState } from 'react'
import { useAdmin } from '../../hooks/useAdmin'
import AdminModal from '../../components/AdminModal'
import LoadingSpinner from '../../components/LoadingSpinner'

const emptyForm = { name: '', email: '', password: '', role: 'user', status: 'active' }

export default function AdminUsersPage() {
  const { getUsers, searchUsers, createUser, updateUser, deleteUser, bulkDeleteUsers } = useAdmin()
  const [users, setUsers] = useState(getUsers())
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState([])
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [viewUser, setViewUser] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [confirmId, setConfirmId] = useState(null)

  const refresh = (q = search) => setUsers(q ? searchUsers(q) : getUsers())

  const handleSearch = (q) => {
    setSearch(q)
    setUsers(q ? searchUsers(q) : getUsers())
    setSelected([])
  }

  const openCreate = () => {
    setForm(emptyForm)
    setError('')
    setModal('create')
  }

  const openEdit = (user) => {
    setForm({ name: user.name, email: user.email, password: '', role: user.role || 'user', status: user.status || 'active' })
    setError('')
    setModal({ type: 'edit', id: user.id })
  }

  const openView = (user) => {
    setViewUser(user)
    setModal('view')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    let result
    if (modal === 'create') {
      result = createUser(form)
    } else if (modal?.type === 'edit') {
      const updates = { ...form }
      if (!updates.password) delete updates.password
      result = updateUser(modal.id, updates)
    }

    setLoading(false)
    if (result?.ok === false) {
      setError(result.error)
      return
    }
    setModal(null)
    refresh()
  }

  const handleDelete = (id) => {
    deleteUser(id)
    setConfirmId(null)
    refresh()
  }

  const handleBulkDelete = () => {
    bulkDeleteUsers(selected)
    setSelected([])
    refresh()
  }

  const toggleSelect = (id) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const toggleSelectAll = () => {
    setSelected(selected.length === users.length ? [] : users.map((u) => u.id))
  }

  const inputClass =
    'mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-white/20 dark:bg-navy-900 dark:text-white'

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-800 sm:text-3xl dark:text-white">User Management</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">Full CRUD — Create, Read, Update, Delete users</p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="rounded-lg bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600"
        >
          + Add User
        </button>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary-500 dark:border-white/20 dark:bg-navy-800 dark:text-white"
        />
        {selected.length > 0 && (
          <button
            type="button"
            onClick={handleBulkDelete}
            className="rounded-lg bg-red-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-600"
          >
            Delete Selected ({selected.length})
          </button>
        )}
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-navy-800/50">
        {users.length === 0 ? (
          <div className="p-12 text-center text-gray-500 dark:text-gray-400">
            {search ? 'No users match your search.' : 'No users registered yet. Click "Add User" to create one.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-white/5">
                <tr>
                  <th className="px-4 py-3">
                    <input type="checkbox" checked={selected.length === users.length && users.length > 0} onChange={toggleSelectAll} />
                  </th>
                  <th className="px-4 py-3 font-semibold text-navy-800 dark:text-white">Name</th>
                  <th className="px-4 py-3 font-semibold text-navy-800 dark:text-white">Email</th>
                  <th className="px-4 py-3 font-semibold text-navy-800 dark:text-white">Role</th>
                  <th className="px-4 py-3 font-semibold text-navy-800 dark:text-white">Status</th>
                  <th className="px-4 py-3 font-semibold text-navy-800 dark:text-white">Joined</th>
                  <th className="px-4 py-3 font-semibold text-navy-800 dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-gray-100 dark:border-white/5">
                    <td className="px-4 py-3">
                      <input type="checkbox" checked={selected.includes(u.id)} onChange={() => toggleSelect(u.id)} />
                    </td>
                    <td className="px-4 py-3 font-medium text-navy-800 dark:text-white">{u.name}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{u.email}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                        {u.role || 'user'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        u.status === 'active'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-gray-100 text-gray-500 dark:bg-white/10 dark:text-gray-400'
                      }`}>
                        {u.status || 'active'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        <button type="button" onClick={() => openView(u)} className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200 dark:bg-white/10 dark:text-gray-300">View</button>
                        <button type="button" onClick={() => openEdit(u)} className="rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400">Edit</button>
                        {confirmId === u.id ? (
                          <>
                            <button type="button" onClick={() => handleDelete(u.id)} className="rounded bg-red-500 px-2 py-1 text-xs font-medium text-white">Confirm</button>
                            <button type="button" onClick={() => setConfirmId(null)} className="rounded bg-gray-200 px-2 py-1 text-xs font-medium dark:bg-white/10">Cancel</button>
                          </>
                        ) : (
                          <button type="button" onClick={() => setConfirmId(u.id)} className="rounded bg-red-50 px-2 py-1 text-xs font-medium text-red-600 dark:bg-red-900/20 dark:text-red-400">Delete</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AdminModal
        open={modal === 'create' || modal?.type === 'edit'}
        onClose={() => setModal(null)}
        title={modal === 'create' ? 'Create User' : 'Edit User'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">{error}</div>}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password {modal?.type === 'edit' && <span className="text-gray-400">(leave blank to keep current)</span>}
            </label>
            <input type="password" required={modal === 'create'} minLength={6} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
              <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className={inputClass}>
                <option value="user">User</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className={inputClass}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>
          <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-500 py-3 font-semibold text-white hover:bg-primary-600 disabled:opacity-70">
            {loading ? <><LoadingSpinner size="sm" />Saving...</> : modal === 'create' ? 'Create User' : 'Update User'}
          </button>
        </form>
      </AdminModal>

      <AdminModal open={modal === 'view'} onClose={() => setModal(null)} title="User Details">
        {viewUser && (
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-gray-100 py-2 dark:border-white/10"><dt className="text-gray-500">ID</dt><dd className="font-mono text-xs text-navy-800 dark:text-white">{viewUser.id}</dd></div>
            <div className="flex justify-between border-b border-gray-100 py-2 dark:border-white/10"><dt className="text-gray-500">Name</dt><dd className="font-medium text-navy-800 dark:text-white">{viewUser.name}</dd></div>
            <div className="flex justify-between border-b border-gray-100 py-2 dark:border-white/10"><dt className="text-gray-500">Email</dt><dd className="text-navy-800 dark:text-white">{viewUser.email}</dd></div>
            <div className="flex justify-between border-b border-gray-100 py-2 dark:border-white/10"><dt className="text-gray-500">Role</dt><dd>{viewUser.role || 'user'}</dd></div>
            <div className="flex justify-between border-b border-gray-100 py-2 dark:border-white/10"><dt className="text-gray-500">Status</dt><dd>{viewUser.status || 'active'}</dd></div>
            <div className="flex justify-between border-b border-gray-100 py-2 dark:border-white/10"><dt className="text-gray-500">Created</dt><dd>{new Date(viewUser.createdAt).toLocaleString()}</dd></div>
            <div className="flex justify-between py-2"><dt className="text-gray-500">Updated</dt><dd>{viewUser.updatedAt ? new Date(viewUser.updatedAt).toLocaleString() : '—'}</dd></div>
          </dl>
        )}
      </AdminModal>
    </div>
  )
}
