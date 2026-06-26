import { useState, useCallback } from 'react'

const API_BASE = '/api'

export function useAnalyze() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)

  const analyze = useCallback(async ({ code, language, roast_mode }) => {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await fetch(`${API_BASE}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language, roast_mode })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.detail || 'Analysis failed')
      setResult(data)
      return data
    } catch (e) {
      setError(e.message || 'Something went wrong')
      throw e
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setResult(null); setError(null); setLoading(false)
  }, [])

  return { analyze, loading, error, result, reset }
}

export async function fetchHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`)
    return await res.json()
  } catch {
    return { status: 'error', ai_mode: 'demo' }
  }
}
