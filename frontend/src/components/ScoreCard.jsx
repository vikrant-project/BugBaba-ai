import React, { useEffect, useState } from 'react'
import { DIFFICULTY_COLORS } from '../utils/constants'

function colorForScore(s) {
  if (s >= 7) return '#10b981'
  if (s >= 4) return '#f59e0b'
  return '#ef4444'
}

export default function ScoreCard({ score = 0, difficulty = 'Intermediate' }) {
  const [v, setV] = useState(0)
  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      i += 1
      if (i >= score) { setV(score); clearInterval(id) }
      else setV(i)
    }, 70)
    return () => clearInterval(id)
  }, [score])

  const color = colorForScore(score)
  const radius = 52
  const circ = 2 * Math.PI * radius
  const dash = circ * (v / 10)

  const diffColor = DIFFICULTY_COLORS[difficulty] || '#6366f1'

  return (
    <div data-testid="card-score" className="bg-bg-secondary rounded-2xl border border-white/5 p-5 animate-slide-up-fade delay-7 text-center">
      <div className="flex items-center gap-3 mb-3 justify-center">
        <div className="text-xl">📊</div>
        <h3 className="font-semibold text-slate-100">Code Quality Score</h3>
      </div>
      <div className="relative inline-block">
        <svg width="140" height="140" className="score-ring">
          <circle cx="70" cy="70" r={radius} stroke="#22222e" strokeWidth="12" fill="none" />
          <circle
            cx="70" cy="70" r={radius}
            stroke={color}
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circ}`}
            style={{ transition: 'stroke-dasharray 0.6s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <div className="text-4xl font-extrabold font-mono" style={{ color }}>{v}</div>
          <div className="text-xs text-slate-400">/ 10</div>
        </div>
      </div>
      <div className="mt-4">
        <span
          data-testid="difficulty-badge"
          className="inline-block px-3 py-1.5 text-xs font-bold uppercase tracking-widest rounded-full border"
          style={{ borderColor: diffColor, color: diffColor, background: `${diffColor}15` }}
        >
          {difficulty}
        </span>
      </div>
    </div>
  )
}
