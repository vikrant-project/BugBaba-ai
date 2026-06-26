import React from 'react'

function verdict(score) {
  if (score >= 7) return { text: 'Hire', cls: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300' }
  if (score >= 4) return { text: 'Hire with caution', cls: 'bg-amber-500/15 border-amber-500/40 text-amber-300' }
  return { text: 'Reject', cls: 'bg-red-500/15 border-red-500/40 text-red-300' }
}

export default function InterviewCard({ feedback, score = 5 }) {
  const v = verdict(score)
  return (
    <div data-testid="card-interview" className="bg-bg-secondary rounded-2xl border border-white/5 border-l-4 border-l-slate-400 p-5 animate-slide-up-fade delay-7">
      <div className="flex items-center gap-3 mb-3">
        <div className="text-xl">💼</div>
        <h3 className="font-semibold text-slate-100">Interviewer Says...</h3>
      </div>
      <div className="bg-[#f5f1e8]/[0.04] border border-white/5 rounded-xl p-5 relative">
        <div className="absolute top-3 right-3 text-[10px] uppercase tracking-widest text-slate-500 font-mono">memo</div>
        <p className="text-sm sm:text-base text-slate-200 leading-relaxed whitespace-pre-line">{feedback}</p>
      </div>
      <div className="mt-3 flex items-center justify-end">
        <span data-testid="verdict-badge" className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border ${v.cls}`}>
          {v.text}
        </span>
      </div>
    </div>
  )
}
