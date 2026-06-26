import React, { useEffect, useState } from 'react'

function useCountUp(target, duration = 900) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let start = null
    let raf
    const step = (ts) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      setVal(Math.round(p * target))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])
  return val
}

export default function BugSummaryCard({ summary, bugs = [] }) {
  const total = bugs.length
  const count = useCountUp(total)
  return (
    <div data-testid="card-bugs" className="bg-bg-secondary rounded-2xl border border-white/5 border-l-4 border-l-red-500 p-5 animate-slide-up-fade">
      <div className="flex items-center gap-3 mb-2">
        <div className="text-xl">🐛</div>
        <h3 className="font-semibold text-slate-100">Bug Summary</h3>
      </div>
      <div className="flex items-baseline gap-3 mb-3">
        <div className="text-4xl font-extrabold text-red-400 font-mono">{count}</div>
        <div className="text-xs uppercase tracking-widest text-slate-500">bugs found</div>
      </div>
      <p className="text-sm text-slate-300 leading-relaxed">{summary}</p>
      {bugs.length > 0 && (
        <ul className="mt-4 space-y-2">
          {bugs.map((b, i) => (
            <li key={i} className="flex gap-2 items-start text-sm text-slate-300">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-red-500 shrink-0" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
