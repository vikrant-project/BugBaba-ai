import React from 'react'

export default function DemoModeBanner() {
  return (
    <div
      data-testid="demo-banner"
      className="mt-4 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-200 flex items-center gap-3"
    >
      <span className="text-lg">🟡</span>
      <span>
        <strong>Demo Mode</strong> — Add an <code className="font-mono text-amber-100">NVIDIA_API_KEY</code> to enable live AI analysis. You're seeing realistic mock results so you can explore the full experience.
      </span>
    </div>
  )
}
