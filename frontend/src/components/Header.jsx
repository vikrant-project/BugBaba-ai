import React from 'react'

export default function Header({ aiMode }) {
  const live = aiMode === 'live'
  return (
    <header className="relative bg-animated border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-3xl animate-pulse-glow">🐛</div>
          <div className="text-2xl">🔥</div>
          <div className="ml-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold gradient-text font-mono tracking-tight">
              BugBaba AI
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              We roast your code so your users don't have to
            </p>
          </div>
        </div>
        <div
          data-testid="ai-mode-badge"
          className={
            'text-xs font-semibold px-3 py-1.5 rounded-full border ' +
            (live
              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
              : 'bg-amber-500/10 border-amber-500/40 text-amber-300')
          }
        >
          {live ? 'AI Live 🟢' : 'Demo Mode 🟡'}
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
    </header>
  )
}
