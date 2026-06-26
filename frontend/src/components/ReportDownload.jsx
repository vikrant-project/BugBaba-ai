import React, { useState } from 'react'
import { generateReport } from '../utils/reportGenerator'

export default function ReportDownload({ result, language }) {
  const [busy, setBusy] = useState(false)
  const onClick = () => {
    setBusy(true)
    try { generateReport(result, language) } finally { setTimeout(() => setBusy(false), 600) }
  }
  return (
    <button
      data-testid="download-report-btn"
      onClick={onClick}
      className="text-xs font-semibold px-3 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/25 transition"
    >
      {busy ? 'Preparing PDF...' : '⬇ Download Report (PDF)'}
    </button>
  )
}
