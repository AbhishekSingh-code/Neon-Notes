import { motion } from 'framer-motion'
import { Copy, Edit3, Pin, PinOff, Trash2 } from 'lucide-react'
import type { Note } from '../types/note'

interface NoteCardProps {
  note: Note
  onEdit: (note: Note) => void
  onDelete: (id: string) => void
  onCopy: (note: Note) => Promise<void>
  onTogglePin: (id: string) => void
  theme: 'dark' | 'light'
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

export function NoteCard({ note, onEdit, onDelete, onCopy, onTogglePin, theme }: NoteCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
      className={`group rounded-[26px] border p-5 shadow-[0_18px_45px_rgba(15,23,42,0.55)] backdrop-blur-xl transition ${
        theme === 'dark'
          ? note.pinned
            ? 'border-rose-400/60 bg-gradient-to-br from-slate-900 via-slate-900 to-amber-500/12'
            : 'border-white/10 bg-white/6 hover:border-rose-400/30 hover:bg-white/8'
          : note.pinned
            ? 'border-rose-300 bg-gradient-to-br from-white via-white to-rose-50'
            : 'border-slate-200 bg-white/95 hover:border-rose-300 hover:bg-white'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.35em] text-cyan-200/70">Note</p>
          <h3 className={`mt-2 text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{note.title}</h3>
        </div>
        <button
          type="button"
          onClick={() => onTogglePin(note.id)}
          className="rounded-full border border-white/10 bg-white/5 p-2 text-amber-100 shadow-[0_12px_30px_rgba(15,23,42,0.45)] transition hover:border-rose-400/40 hover:bg-rose-400/10"
          aria-label={note.pinned ? 'Unpin note' : 'Pin note'}
        >
          {note.pinned ? <Pin className="h-4 w-4" /> : <PinOff className="h-4 w-4" />}
        </button>
      </div>

      <p className={`mt-4 min-h-[72px] text-sm leading-6 ${theme === 'dark' ? 'text-slate-200/95' : 'text-slate-700'}`}>{note.content}</p>

      <div className={`mt-5 flex items-center justify-between gap-3 text-xs ${theme === 'dark' ? 'text-slate-300' : 'text-slate-500'}`}>
        <span>Created {formatDate(note.createdAt)}</span>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-cyan-100/90">
          {note.pinned ? 'Pinned' : 'Fresh'}
        </span>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-white/10 pt-4">
        <button
          type="button"
          onClick={() => onEdit(note)}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 shadow-[0_10px_25px_rgba(15,23,42,0.45)] transition hover:border-cyan-400/40 hover:bg-cyan-400/10"
        >
          <Edit3 className="h-4 w-4" />
          Edit
        </button>
        <button
          type="button"
          onClick={() => onCopy(note)}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 shadow-[0_10px_25px_rgba(15,23,42,0.45)] transition hover:border-cyan-400/40 hover:bg-cyan-400/10"
        >
          <Copy className="h-4 w-4" />
          Copy
        </button>
        <button
          type="button"
          onClick={() => onDelete(note.id)}
          className={`ml-auto inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm shadow-[0_10px_25px_rgba(244,63,94,0.08)] transition ${theme === 'dark' ? 'border-rose-400/20 bg-rose-500/8 text-rose-100 hover:border-rose-400/40 hover:bg-rose-500/12' : 'border-rose-200 bg-rose-50 text-rose-700 hover:border-rose-300 hover:bg-rose-100'}`}
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </button>
      </div>
    </motion.article>
  )
}
