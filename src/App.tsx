import { AnimatePresence, motion } from 'framer-motion'
import { SearchX, Sparkles } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Header } from './components/Header'
import { NoteCard } from './components/NoteCard'
import { NoteModal } from './components/NoteModal'
import { SearchBar } from './components/SearchBar'
import { useLocalStorage } from './hooks/useLocalStorage'
import type { Note } from './types/note'

const starterNotes: Note[] = [
  {
    id: 'seed-1',
    title: 'Launch ideas',
    content:
      'Outline the next release notes, highlight top features, and sketch a short teaser for the landing page.',
    createdAt: '2026-06-12T09:30:00.000Z',
    updatedAt: '2026-06-12T09:30:00.000Z',
    pinned: true,
  },
  {
    id: 'seed-2',
    title: 'Design system',
    content:
      'Keep the neon palette consistent: purple highlights, cyan glows, soft shadows, and rounded glass cards.',
    createdAt: '2026-06-13T11:20:00.000Z',
    updatedAt: '2026-06-13T11:20:00.000Z',
  },
]

function App() {
  const [notes, setNotes] = useLocalStorage<Note[]>('neon-notes', starterNotes)
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'dark'
    return (window.localStorage.getItem('neon-notes-theme') as 'dark' | 'light') || 'dark'
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const filteredNotes = useMemo(() => {
    const lower = searchTerm.trim().toLowerCase()

    const result = notes
      .filter((note) => {
        if (!lower) return true
        return (
          note.title.toLowerCase().includes(lower) ||
          note.content.toLowerCase().includes(lower)
        )
      })
      .sort((a, b) => {
        const aTime = new Date(a.updatedAt || a.createdAt).getTime()
        const bTime = new Date(b.updatedAt || b.createdAt).getTime()
        return sortBy === 'newest' ? bTime - aTime : aTime - bTime
      })

    return result
  }, [notes, searchTerm, sortBy])

  const openCreateModal = () => {
    setEditingNote(null)
    setTitle('')
    setContent('')
    setIsModalOpen(true)
  }

  const openEditModal = (note: Note) => {
    setEditingNote(note)
    setTitle(note.title)
    setContent(note.content)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingNote(null)
    setTitle('')
    setContent('')
  }

  const saveNote = () => {
    const trimmedTitle = title.trim()
    const trimmedContent = content.trim()

    if (!trimmedTitle && !trimmedContent) return

    if (editingNote) {
      setNotes((current) =>
        current.map((note) =>
          note.id === editingNote.id
            ? {
                ...note,
                title: trimmedTitle || 'Untitled note',
                content: trimmedContent,
                updatedAt: new Date().toISOString(),
              }
            : note,
        ),
      )
    } else {
      setNotes((current) => [
        {
          id: crypto.randomUUID(),
          title: trimmedTitle || 'Untitled note',
          content: trimmedContent,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          pinned: false,
        },
        ...current,
      ])
    }

    closeModal()
  }

  const deleteNote = (id: string) => {
    setNotes((current) => current.filter((note) => note.id !== id))
  }

  const togglePin = (id: string) => {
    setNotes((current) =>
      current.map((note) =>
        note.id === id
          ? { ...note, pinned: !note.pinned, updatedAt: new Date().toISOString() }
          : note,
      ),
    )
  }

  const copyNote = async (note: Note) => {
    await navigator.clipboard.writeText(`${note.title}\n\n${note.content}`)
  }

  useEffect(() => {
    document.documentElement.classList.toggle('theme-light', theme === 'light')
    document.documentElement.style.colorScheme = theme
    window.localStorage.setItem('neon-notes-theme', theme)
  }, [theme])

  return (
    <main className={`min-h-screen bg-transparent ${theme === 'dark' ? 'text-slate-100' : 'text-slate-800'}`}>
      <header className="mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <div className={`rounded-[28px] border px-4 py-4 shadow-[0_16px_45px_rgba(15,23,42,0.45)] backdrop-blur-xl ${theme === 'dark' ? 'border-white/10 bg-[linear-gradient(145deg,rgba(15,23,42,0.92),rgba(30,41,59,0.88))]' : 'border-slate-200 bg-white/90'}`}>
          <div className="flex flex-col items-center text-center">
            <p className={`text-[11px] uppercase tracking-[0.45em] ${theme === 'dark' ? 'text-amber-100/80' : 'text-rose-500'}`}>Your ideas, neatly glowing.</p>
            <h1 className={`mt-2 text-4xl font-black tracking-[0.18em] text-transparent sm:text-5xl md:text-6xl ${theme === 'dark' ? 'bg-gradient-to-r from-rose-200 via-fuchsia-200 to-cyan-100 bg-clip-text' : 'bg-gradient-to-r from-rose-500 via-violet-500 to-cyan-500 bg-clip-text'}`}>NEON NOTES</h1>
            <p className={`mt-3 text-sm text-slate-300 sm:text-base ${theme === 'light' ? 'text-slate-600' : ''}`}>By Abhishek Singh</p>
          </div>
        </div>
      </header>

      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className={`rounded-[32px] border p-6 shadow-[0_20px_70px_rgba(15,23,42,0.78)] backdrop-blur-xl sm:p-8 ${theme === 'dark' ? 'border-white/10 bg-[linear-gradient(145deg,rgba(15,23,42,0.92),rgba(30,41,59,0.85),rgba(17,24,39,0.96))]' : 'border-slate-200 bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(248,250,252,0.96),rgba(238,242,255,0.98))]'}`}
        >
          <Header
            noteCount={notes.length}
            onNewNote={openCreateModal}
            sortBy={sortBy}
            onSortChange={setSortBy}
            theme={theme}
            onToggleTheme={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
          />

          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.35 }}
            className={`mt-8 rounded-[28px] border p-4 shadow-[0_18px_55px_rgba(244,63,94,0.08)] backdrop-blur-xl sm:p-5 ${theme === 'dark' ? 'border-rose-400/15 bg-[linear-gradient(145deg,rgba(17,24,39,0.88),rgba(30,41,59,0.82))]' : 'border-slate-200 bg-white/95'}`}
          >
            <SearchBar value={searchTerm} onChange={setSearchTerm} theme={theme} />
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.35 }}
            className="mt-8 flex flex-wrap items-end justify-between gap-3"
          >
            <div>
              <p className={`text-sm uppercase tracking-[0.35em] ${theme === 'dark' ? 'text-amber-200/80' : 'text-rose-500'}`}>Midnight workspace</p>
              <h2 className={`mt-2 text-2xl font-semibold sm:text-3xl ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Capture ideas with a richer glow.</h2>
              <p className={`mt-2 max-w-2xl text-sm sm:text-base ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                Create, search, pin, and organize notes in a premium dark interface with instant local storage.
              </p>
            </div>
            <div className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm shadow-[0_14px_30px_rgba(244,63,94,0.12)] ${theme === 'dark' ? 'border-rose-400/30 bg-rose-400/10 text-rose-100' : 'border-rose-200 bg-rose-50 text-rose-700'}`}>
              <Sparkles className="h-4 w-4" />
              {filteredNotes.length} note{filteredNotes.length === 1 ? '' : 's'} visible
            </div>
          </motion.section>

          <AnimatePresence mode="popLayout">
            {filteredNotes.length > 0 ? (
              <motion.section
                layout
                className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
              >
                {filteredNotes.map((note, index) => (
                  <motion.div
                    key={note.id}
                    layout
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ delay: index * 0.04, duration: 0.25 }}
                  >
                    <NoteCard
                      note={note}
                      onEdit={openEditModal}
                      onDelete={deleteNote}
                      onCopy={copyNote}
                      onTogglePin={togglePin}
                      theme={theme}
                    />
                  </motion.div>
                ))}
              </motion.section>
            ) : (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mt-8 rounded-[28px] border border-dashed p-10 text-center shadow-[0_18px_60px_rgba(15,23,42,0.45)] backdrop-blur-xl ${theme === 'dark' ? 'border-cyan-400/30 bg-white/5' : 'border-rose-200 bg-white/95'}`}
              >
                <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border shadow-[0_14px_30px_rgba(34,211,238,0.12)] ${theme === 'dark' ? 'border-white/10 bg-white/5 text-cyan-100' : 'border-rose-200 bg-rose-50 text-rose-500'}`}>
                  <SearchX className="h-8 w-8" />
                </div>
                <h3 className={`mt-5 text-2xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>No notes match your search</h3>
                <p className={`mx-auto mt-3 max-w-md text-sm sm:text-base ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                  Try another keyword or create a fresh note with the glowing Add Note button.
                </p>
              </motion.section>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      <footer className="mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className={`rounded-[24px] border px-4 py-3 text-center text-sm shadow-[0_16px_45px_rgba(15,23,42,0.35)] backdrop-blur-xl ${theme === 'dark' ? 'border-white/10 bg-[linear-gradient(145deg,rgba(15,23,42,0.92),rgba(30,41,59,0.88))] text-slate-200' : 'border-slate-200 bg-white/95 text-slate-700'}`}>
          © 2026 Neon Notes. All rights reserved.
        </div>
      </footer>

      <NoteModal
        isOpen={isModalOpen}
        mode={editingNote ? 'edit' : 'create'}
        title={title}
        content={content}
        onTitleChange={setTitle}
        onContentChange={setContent}
        onSave={saveNote}
        onClose={closeModal}
        theme={theme}
      />
    </main>
  )
}

export default App
