import React, { useEffect, useState } from 'react'
import { LOADING_MESSAGES } from '../utils/constants'

const BUG_ART = String.raw`
       \\       //
        \\  ^  //
         \\(o)//
    ______/_|_\\______
   /                 \
  |   d e b u g g i n g   |
   \________________/
`

export default function LoadingAnimation() {
  const [msg, setMsg] = useState(LOADING_MESSAGES[0])
  const [progress, setProgress] = useState(8)
  useEffect(() => {
    let i = 0
    const m = setInterval(() => {
      i = (i + 1) % LOADING_MESSAGES.length
      setMsg(LOADING_MESSAGES[i])
    }, 2000)
    const p = setInterval(() => {
      setProgress((v) => (v < 92 ? v + Math.random() * 6 : v))
    }, 600)
    return () => { clearInterval(m); clearInterval(p) }
  }, [])
  return (
    <div data-testid="loading-overlay" className="bg-bg-secondary border border-white/5 rounded-2xl p-8 text-center relative overflow-hidden">
      <pre className="ascii-bug mx-auto">{BUG_ART}</pre>
      <div className="text-slate-200 mt-4 font-mono text-sm">{msg}</div>
      <div className="mt-5 h-2 bg-bg-tertiary rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-700"
          style={{ width: `${Math.min(progress, 95)}%` }}
        />
      </div>
    </div>
  )
}
