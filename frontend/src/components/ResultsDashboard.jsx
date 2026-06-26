import React from 'react'
import BugSummaryCard from './BugSummaryCard'
import SecurityCard from './SecurityCard'
import LogicCard from './LogicCard'
import PerformanceCard from './PerformanceCard'
import FixedCodeCard from './FixedCodeCard'
import BeginnerCard from './BeginnerCard'
import RoastCard from './RoastCard'
import ScoreCard from './ScoreCard'
import InterviewCard from './InterviewCard'
import ReportDownload from './ReportDownload'

export default function ResultsDashboard({ result, language, onClear }) {
  return (
    <section data-testid="results-dashboard" className="mt-8 animate-slide-up-fade">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-xl font-bold text-slate-100 font-mono">
          <span className="text-indigo-400">›</span> Diagnosis Complete
        </h2>
        <div className="flex items-center gap-2">
          <ReportDownload result={result} language={language} />
          <button
            data-testid="clear-results-btn"
            onClick={onClear}
            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 transition"
          >
            Clear Results
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1"><BugSummaryCard summary={result.bug_summary} bugs={result.bugs} /></div>
        <div className="lg:col-span-1"><SecurityCard issues={result.security_issues} /></div>
        <div className="lg:col-span-1"><ScoreCard score={result.quality_score} difficulty={result.difficulty_level} /></div>

        <div className="lg:col-span-1"><LogicCard items={result.logic_mistakes} /></div>
        <div className="lg:col-span-1"><PerformanceCard items={result.performance_problems} /></div>
        <div className="lg:col-span-1"><BeginnerCard text={result.beginner_explanation} /></div>

        <div className="lg:col-span-2"><FixedCodeCard code={result.fixed_code} language={language} /></div>
        <div className="lg:col-span-1"><InterviewCard feedback={result.interview_feedback} score={result.quality_score} /></div>

        <div className="lg:col-span-3"><RoastCard roast={result.roast} mode={result.mode_used} /></div>
      </div>
    </section>
  )
}
