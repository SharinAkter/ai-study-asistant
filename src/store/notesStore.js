import { create } from 'zustand'
import { STORAGE_KEYS } from '../utils/constants'
import { getItem, setItem } from '../utils/storage'

function loadNotes(userId) {
  const all = getItem(STORAGE_KEYS.NOTES) || {}
  return all[userId] || []
}

function saveNotes(userId, notes) {
  const all = getItem(STORAGE_KEYS.NOTES) || {}
  all[userId] = notes
  setItem(STORAGE_KEYS.NOTES, all)
}

export const useNotesStore = create((set, get) => ({
  notes: [],

  loadUserNotes: (userId) => {
    const notes = loadNotes(userId)
    set({ notes })
    return notes
  },

  createNote: (userId, { title, content }) => {
    const notes = loadNotes(userId)
    const note = {
      id: crypto.randomUUID(),
      title: title.trim(),
      content: content.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    notes.unshift(note)
    saveNotes(userId, notes)
    set({ notes })
    return note
  },

  updateNote: (userId, id, updates) => {
    const notes = loadNotes(userId)
    const index = notes.findIndex((n) => n.id === id)
    if (index === -1) return null

    notes[index] = {
      ...notes[index],
      ...updates,
      title: updates.title?.trim() ?? notes[index].title,
      content: updates.content?.trim() ?? notes[index].content,
      updatedAt: new Date().toISOString(),
    }
    saveNotes(userId, notes)
    set({ notes })
    return notes[index]
  },

  deleteNote: (userId, id) => {
    const notes = loadNotes(userId).filter((n) => n.id !== id)
    saveNotes(userId, notes)
    set({ notes })
    return true
  },

  getNoteById: (userId, id) => {
    return loadNotes(userId).find((n) => n.id === id) || null
  },
}))
