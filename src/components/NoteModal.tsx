import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

interface NoteModalProps {
  isOpen: boolean
  mode: 'create' | 'edit'
  title: string
  content: string
  onTitleChange: (value: string) => void
  onContentChange: (value: string) => void
  onSave: () => void
  onClose: () => void
  theme: 'dark' | 'light'
}

export function NoteModal({
  isOpen,
  mode,
  title,
  content,
  onTitleChange,
  onContentChange,
  onSave,
  onClose,
  theme,
}: NoteModalProps) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-md"
      >
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.98 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className={`w-full max-w-2xl rounded-[28px] border p-6 shadow-[0_24px_80px_rgba(15,23,42,0.75)] backdrop-blur-xl sm:p-7 ${theme === 'dark' ? 'border-white/10 bg-slate-950/95' : 'border-slate-200 bg-white/95'}`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-amber-200/80">{mode === 'create' ? 'New note' : 'Edit note'}</p>
              <h2 className={`mt-2 text-2xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{mode === 'create' ? 'Capture a fresh idea' : 'Refine your note'}</h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className={`rounded-full border p-2 shadow-[0_10px_25px_rgba(15,23,42,0.45)] transition ${theme === 'dark' ? 'border-white/10 bg-white/5 text-slate-100 hover:border-rose-400/40 hover:bg-rose-400/10' : 'border-slate-200 bg-white text-slate-800 hover:border-rose-300 hover:bg-rose-50'}`}
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-6 space-y-5">
            <label className="block text-sm text-slate-200">
              <span className={`mb-2 block ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>Title</span>
              <input
                type="text"
                value={title}
                onChange={(event) => onTitleChange(event.target.value)}
                placeholder="What are you working on?"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100 placeholder:text-slate-400 outline-none transition focus:border-cyan-400/50 focus:bg-slate-900"
              />
            </label>

            <label className="block text-sm text-slate-200">
              <span className={`mb-2 block ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>Content</span>
              <textarea
                rows={8}
                value={content}
                onChange={(event) => onContentChange(event.target.value)}
                placeholder="Write your brilliant insight, reminder, or next step..."
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100 placeholder:text-slate-400 outline-none transition focus:border-cyan-400/50 focus:bg-slate-900"
              />
            </label>

            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>Auto-saved in your browser</span>
              <span>{content.length} characters</span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-end gap-3 border-t border-white/10 pt-5">
            <button
              type="button"
              onClick={onClose}
              className={`rounded-full border px-4 py-2.5 text-sm transition ${theme === 'dark' ? 'border-white/10 bg-white/5 text-slate-100 hover:border-rose-400/40 hover:bg-rose-400/10' : 'border-slate-200 bg-white text-slate-800 hover:border-rose-300 hover:bg-rose-50'}`}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onSave}
              className="rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-fuchsia-500 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_16px_35px_rgba(244,63,94,0.18)] transition hover:shadow-[0_18px_40px_rgba(251,146,60,0.28)]"
            >
              {mode === 'create' ? 'Save note' : 'Update note'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
