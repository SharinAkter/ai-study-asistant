import { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { getItem, setItem } from '../../utils/storage'
import { STORAGE_KEYS } from '../../utils/constants'
import AdminModal from '../../components/AdminModal'

function loadTasks(userId) {
  const all = getItem(STORAGE_KEYS.PLANNER) || {}
  return all[userId] || []
}

function saveTasks(userId, tasks) {
  const all = getItem(STORAGE_KEYS.PLANNER) || {}
  all[userId] = tasks
  setItem(STORAGE_KEYS.PLANNER, all)
}

export default function PlannerPage() {
  const { user } = useAuth()
  const [tasks, setTasks] = useState([])
  const [modal, setModal] = useState(false)
  const [title, setTitle] = useState('')

  useEffect(() => {
    if (user?.id) setTasks(loadTasks(user.id))
  }, [user?.id])

  const refresh = (data) => {
    saveTasks(user.id, data)
    setTasks(data)
  }

  const addTask = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    const task = { id: crypto.randomUUID(), title: title.trim(), done: false, createdAt: new Date().toISOString() }
    refresh([task, ...tasks])
    setTitle('')
    setModal(false)
  }

  const toggleTask = (id) => {
    refresh(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  const deleteTask = (id) => {
    refresh(tasks.filter((t) => t.id !== id))
  }

  const doneCount = tasks.filter((t) => t.done).length
  const progress = tasks.length ? Math.round((doneCount / tasks.length) * 100) : 0

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-800 dark:text-white">Study Planner</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Plan and track your daily study tasks</p>
        </div>
        <button type="button" onClick={() => setModal(true)} className="rounded-lg bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600">
          + Add Task
        </button>
      </div>

      <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-navy-800/50">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-navy-800 dark:text-white">Today&apos;s Progress</span>
          <span className="text-sm text-primary-600 dark:text-primary-400">{progress}% ({doneCount}/{tasks.length})</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-white/10">
          <div className="h-full rounded-full bg-primary-500 transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center text-gray-500 dark:border-white/10 dark:bg-navy-800/50 dark:text-gray-400">
          No tasks yet. Add your first study task.
        </div>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-navy-800/50">
              <input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} className="h-4 w-4 rounded accent-primary-500" />
              <span className={`flex-1 text-sm ${task.done ? 'text-gray-400 line-through' : 'text-navy-800 dark:text-white'}`}>{task.title}</span>
              <button type="button" onClick={() => deleteTask(task.id)} className="text-xs text-red-500 hover:text-red-700">Delete</button>
            </li>
          ))}
        </ul>
      )}

      <AdminModal open={modal} onClose={() => setModal(false)} title="Add Study Task">
        <form onSubmit={addTask} className="space-y-4">
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Read Chapter 5 - Physics"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-primary-500 dark:border-white/20 dark:bg-navy-900 dark:text-white"
          />
          <button type="submit" className="w-full rounded-lg bg-primary-500 py-3 font-semibold text-white hover:bg-primary-600">Add Task</button>
        </form>
      </AdminModal>
    </div>
  )
}
