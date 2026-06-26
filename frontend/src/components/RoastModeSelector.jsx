import React from 'react'
import { ROAST_MODES } from '../utils/constants'

export default function RoastModeSelector({ value, onChange }) {
  return (
    <section className="mt-6">
      <h2 className="text-base md:text-lg font-semibold text-slate-200 mb-3 font-mono">
        <span className="text-indigo-400">$</span> Select roast mode
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {ROAST_MODES.map((mode) => {
          const selected = value === mode.id
          return (
            <button
              key={mode.id}
              type="button"
              data-testid={`roast-mode-${mode.id.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => onChange(mode.id)}
              className={
                'group text-left rounded-2xl p-4 border transition-all duration-200 ' +
                (selected
                  ? 'bg-indigo-500/15 border-indigo-500 shadow-[0_0_24px_-4px_rgba(99,102,241,0.6)] scale-[1.02]'
                  : 'bg-bg-secondary border-white/5 hover:border-indigo-500/40 hover:scale-[1.015]')
              }
            >
              <div className="flex items-center gap-3 mb-1">
                <div className="text-2xl">{mode.emoji}</div>
                <div className="font-semibold text-slate-100">{mode.id}</div>
              </div>
              <div className="text-xs text-slate-400 leading-relaxed">{mode.desc}</div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
