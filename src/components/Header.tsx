import { motion } from 'framer-motion'
import { Moon, Plus, Sparkles, SlidersHorizontal, Sun } from 'lucide-react'

interface HeaderProps {
  noteCount: number
  onNewNote: () => void
  sortBy: 'newest' | 'oldest'
  onSortChange: (value: 'newest' | 'oldest') => void
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

export function Header({ noteCount, onNewNote, sortBy, onSortChange, theme, onToggleTheme }: HeaderProps) {
  return (
    <header className="rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.55)] backdrop-blur-xl sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <motion.div
            initial={{ rotate: -8, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 180, damping: 14 }}
            className="flex h-14 w-14 items-center justify-center rounded-2xl border border-rose-400/30 bg-gradient-to-br from-amber-400/20 via-slate-900 to-rose-500/25 text-amber-100 shadow-[0_18px_40px_rgba(251,146,60,0.18)]"
          >
            <Sparkles className="h-7 w-7" />
          </motion.div>
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-rose-200/80">Midnight Notes</p>
            <h1 className="mt-1 text-3xl font-semibold text-white sm:text-4xl">A premium dark workspace for every idea.</h1>
            <p className="mt-2 max-w-xl text-sm text-slate-300 sm:text-base">
              Create, discover, and organize your thoughts with smooth neon visuals and instant local storage.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-sm text-slate-200 shadow-[0_12px_28px_rgba(15,23,42,0.5)]">
            <span className="text-cyan-100">{noteCount}</span> note{noteCount === 1 ? '' : 's'} saved
          </div>

          <label className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/80 px-3 py-2 text-sm text-slate-200 shadow-[0_12px_28px_rgba(15,23,42,0.5)]">
            <SlidersHorizontal className="h-4 w-4 text-amber-100" />
            <select
              value={sortBy}
              onChange={(event) => onSortChange(event.target.value as 'newest' | 'oldest')}
              className="bg-transparent text-sm text-slate-100 outline-none"
              aria-label="Sort notes"
            >
              <option value="newest" className="bg-slate-950">Newest</option>
              <option value="oldest" className="bg-slate-950">Oldest</option>
            </select>
          </label>

          <button
            type="button"
            onClick={onToggleTheme}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 shadow-[0_12px_28px_rgba(15,23,42,0.35)] transition hover:border-rose-400/40 hover:bg-rose-400/10"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={onNewNote}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-fuchsia-500 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_18px_35px_rgba(244,63,94,0.28)] transition hover:shadow-[0_18px_40px_rgba(251,146,60,0.25)]"
          >
            <Plus className="h-4 w-4" />
            Add Note
          </motion.button>
        </div>
      </div>
    </header>
  )
}
