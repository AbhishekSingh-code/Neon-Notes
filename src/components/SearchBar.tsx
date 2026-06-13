import { Search } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  theme: 'dark' | 'light'
}

export function SearchBar({ value, onChange, theme }: SearchBarProps) {
  return (
    <label className={`flex items-center gap-3 rounded-[22px] border px-4 py-3 shadow-[0_18px_35px_rgba(15,23,42,0.45)] transition sm:px-5 ${theme === 'dark' ? 'border-white/10 bg-slate-950/70 focus-within:border-cyan-400/60 focus-within:bg-slate-950/90' : 'border-slate-200 bg-white/90 text-slate-900 focus-within:border-rose-400/60 focus-within:bg-white'}`}>
      <Search className="h-5 w-5 text-amber-100" />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search notes, tags, or ideas..."
        className={`w-full border-0 bg-transparent text-sm focus:outline-none sm:text-base ${theme === 'dark' ? 'text-slate-100 placeholder:text-slate-400' : 'text-slate-900 placeholder:text-slate-500'}`}
        aria-label="Search notes"
      />
    </label>
  )
}
