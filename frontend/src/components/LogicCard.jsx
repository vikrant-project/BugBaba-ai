import React from 'react'

export default function LogicCard({ items = [] }) {
  return (
    <div data-testid="card-logic" className="bg-bg-secondary rounded-2xl border border-white/5 border-l-4 border-l-violet-500 p-5 animate-slide-up-fade delay-2">
      <div className="flex items-center gap-3 mb-3">
        <div className="text-xl">🧠</div>
        <h3 className="font-semibold text-slate-100">Logic Mistakes</h3>
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-slate-400">No logic errors found. Your brain was on today.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((s, i) => (
            <li key={i} className="text-sm text-slate-300 bg-violet-500/5 border border-violet-500/20 rounded-lg px-3 py-2">
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
