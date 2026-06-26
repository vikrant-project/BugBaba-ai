import React, { useEffect, useState } from 'react'

export default function RoastCard({ roast = '', mode = '' }) {
  const [shown, setShown] = useState('')
  useEffect(() => {
    setShown('')
    const words = String(roast).split(/(\s+)/)
    let i = 0
    const id = setInterval(() => {
      if (i >= words.length) { clearInterval(id); return }
      const w = words[i]
      setShown((s) => s + w)
      i++
    }, 35)
    return () => clearInterval(id)
  }, [roast])

  const isDesi = mode === 'Desi Funny Mode'

  return (
    <div data-testid="card-roast" className="relative overflow-hidden bg-bg-secondary rounded-2xl border border-white/5 border-l-4 border-l-orange-500 p-6 animate-slide-up-fade delay-6">
      <div className="spotlight" />
      <div className="relative">
        <div className="flex items-center gap-3 mb-3">
          <div className="text-4xl">🎤</div>
          <h3 className="font-bold text-xl text-slate-100">The Roast Stage</h3>
          <span className="ml-auto text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full bg-orange-500/15 border border-orange-500/40 text-orange-300">
            {mode}
          </span>
        </div>
        <div className="relative bg-gradient-to-br from-orange-500/5 to-transparent rounded-xl border border-orange-500/20 p-5 my-2">
          <p className="text-lg sm:text-xl leading-relaxed text-slate-100 font-mono typewriter-cursor">
            {shown}{isDesi ? ' ✨' : ''}
          </p>
        </div>
        <div className="flex gap-2 mt-4 text-2xl select-none">
          <span className="opacity-80">😂</span>
          <span className="opacity-80">🔥</span>
          <span className="opacity-80">💀</span>
          <span className="opacity-80">😭</span>
        </div>
      </div>
    </div>
  )
}
