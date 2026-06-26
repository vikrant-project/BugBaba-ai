import React from 'react'

function severityFor(text) {
  const t = String(text).toLowerCase()
  if (/(critical|rce|injection|overflow|hardcoded)/.test(t)) return { label: 'Critical', cls: 'bg-red-500/20 text-red-300 border-red-500/40' }
  if (/(high|xss|csrf|leak)/.test(t)) return { label: 'High', cls: 'bg-orange-500/20 text-orange-300 border-orange-500/40' }
  if (/(medium|validation|sanitize)/.test(t)) return { label: 'Medium', cls: 'bg-amber-500/20 text-amber-300 border-amber-500/40' }
  return { label: 'Low', cls: 'bg-yellow-500/15 text-yellow-300 border-yellow-500/30' }
}

export default function SecurityCard({ issues = [] }) {
  const clean = issues.length === 0
  return (
    <div data-testid="card-security" className="bg-bg-secondary rounded-2xl border border-white/5 border-l-4 border-l-amber-500 p-5 animate-slide-up-fade delay-1">
      <div className="flex items-center gap-3 mb-3">
        <div className="text-xl">🔒</div>
        <h3 className="font-semibold text-slate-100">Security Issues</h3>
        {clean ? (
          <span className="ml-auto text-xs text-emerald-300 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/30">✓ Clean</span>
        ) : (
          <span className="ml-auto text-xs text-amber-300 bg-amber-500/10 px-2 py-1 rounded-full border border-amber-500/30">⚠ {issues.length}</span>
        )}
      </div>
      {clean ? (
        <p className="text-sm text-slate-400">No security issues detected. Nice work.</p>
      ) : (
        <ul className="space-y-2">
          {issues.map((s, i) => {
            const sev = severityFor(s)
            return (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${sev.cls} shrink-0 mt-0.5`}>{sev.label}</span>
                <span>{s}</span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
