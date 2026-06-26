import React from 'react'

export default function AnalyzeButton({ disabled, loading, onClick }) {
  return (
    <button
      type="button"
      data-testid="analyze-btn"
      disabled={disabled || loading}
      onClick={onClick}
      className={
        'mt-6 w-full font-mono font-bold text-lg sm:text-xl rounded-2xl py-4 sm:py-5 transition-all duration-200 ' +
        (disabled || loading
          ? 'bg-slate-700/60 text-slate-400 cursor-not-allowed'
          : 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:brightness-110 hover:scale-[1.01] active:scale-[0.99] shadow-[0_0_40px_-12px_rgba(99,102,241,0.8)] animate-float')
      }
    >
      {loading ? (
        <span className="flex items-center justify-center gap-3">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
            <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" className="opacity-75" />
          </svg>
          Roasting in progress...
        </span>
      ) : (
        <span>🔍 Analyze & Roast My Code</span>
      )}
    </button>
  )
}
