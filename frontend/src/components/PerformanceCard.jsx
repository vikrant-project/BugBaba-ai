import React from 'react'

export default function PerformanceCard({ items = [] }) {
  return (
    <div data-testid="card-performance" className="bg-bg-secondary rounded-2xl border border-white/5 border-l-4 border-l-sky-500 p-5 animate-slide-up-fade delay-3">
      <div className="flex items-center gap-3 mb-3">
        <div className="text-xl">⚡</div>
        <h3 className="font-semibold text-slate-100">Performance</h3>
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-slate-400">Performance is solid. Nothing to optimize here.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((s, i) => (
            <li key={i} className="flex gap-2 text-sm text-slate-300">
              <span className="text-sky-400 shrink-0">→</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
