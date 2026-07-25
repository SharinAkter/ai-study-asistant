import { useNotesStore } from '../store/notesStore'

export function useNotes() {
  const notes = useNotesStore((s) => s.notes)
  const loadUserNotes = useNotesStore((s) => s.loadUserNotes)
  const createNote = useNotesStore((s) => s.createNote)
  const updateNote = useNotesStore((s) => s.updateNote)
  const deleteNote = useNotesStore((s) => s.deleteNote)
  const getNoteById = useNotesStore((s) => s.getNoteById)

  return { notes, loadUserNotes, createNote, updateNote, deleteNote, getNoteById }
}
