import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import CodeInputPanel from './components/CodeInputPanel'
import RoastModeSelector from './components/RoastModeSelector'
import AnalyzeButton from './components/AnalyzeButton'
import LoadingAnimation from './components/LoadingAnimation'
import ResultsDashboard from './components/ResultsDashboard'
import DemoModeBanner from './components/DemoModeBanner'
import { useAnalyze, fetchHealth } from './hooks/useAnalyze'

export default function App() {
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('Python')
  const [mode, setMode] = useState('Soft Roast')
  const [aiMode, setAiMode] = useState('demo')
  const { analyze, loading, error, result, reset } = useAnalyze()

  useEffect(() => {
    fetchHealth().then((h) => setAiMode(h.ai_mode || 'demo'))
  }, [])

  const onAnalyze = async () => {
    if (!code.trim()) return
    try {
      await analyze({ code, language, roast_mode: mode })
      requestAnimationFrame(() => {
        document.getElementById('results-anchor')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    } catch (_) { /* error already in hook */ }
  }

  const onClear = () => {
    setCode('')
    setMode('Soft Roast')
    reset()
  }

  return (
    <div className="min-h-screen bg-bg-primary text-slate-100">
      <Header aiMode={aiMode} />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {aiMode !== 'live' && <DemoModeBanner />}
        <CodeInputPanel code={code} setCode={setCode} language={language} setLanguage={setLanguage} />
        <RoastModeSelector value={mode} onChange={setMode} />
        <AnalyzeButton onClick={onAnalyze} disabled={!code.trim()} loading={loading} />

        {error && (
          <div data-testid="error-banner" className="mt-4 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            <strong>Oops:</strong> {error}
          </div>
        )}

        <div id="results-anchor" />
        {loading && <div className="mt-6"><LoadingAnimation /></div>}
        {!loading && result && (
          <ResultsDashboard result={result} language={language} onClear={onClear} />
        )}
      </main>

      <footer className="border-t border-white/5 mt-16">
        <div className="max-w-6xl mx-auto px-6 py-6 text-xs text-slate-500 flex items-center justify-between">
          <div>© BugBaba AI · Built with 🔥 and too much chai</div>
          <div className="font-mono">v1.0.0</div>
        </div>
      </footer>
    </div>
  )
}
