import React from 'react'

export default function BeginnerCard({ text }) {
  return (
    <div data-testid="card-beginner" className="bg-bg-secondary rounded-2xl border border-white/5 border-l-4 border-l-indigo-500 p-5 animate-slide-up-fade delay-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="text-xl">👶</div>
        <h3 className="font-semibold text-slate-100">Explain Like I'm 5</h3>
      </div>
      <p className="text-base sm:text-lg leading-relaxed text-slate-200">{text}</p>
    </div>
  )
}
