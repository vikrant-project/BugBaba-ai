import React, { useMemo } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { oneDark } from '@codemirror/theme-one-dark'
import { python } from '@codemirror/lang-python'
import { javascript } from '@codemirror/lang-javascript'
import { java } from '@codemirror/lang-java'
import { cpp } from '@codemirror/lang-cpp'
import { sql } from '@codemirror/lang-sql'
import { html as htmlLang } from '@codemirror/lang-html'
import { css as cssLang } from '@codemirror/lang-css'
import { rust } from '@codemirror/lang-rust'
import { php } from '@codemirror/lang-php'
import { LANGUAGES } from '../utils/constants'
import { EXAMPLES } from '../utils/examples'

const PLACEHOLDER = `// Paste your gloriously cursed code here...
// Example:
// def divide(a, b):
//     return a / b   // edge cases? what edge cases?`

function getLangExt(language) {
  switch (language) {
    case 'Python': return [python()]
    case 'JavaScript':
    case 'TypeScript': return [javascript({ jsx: true, typescript: language === 'TypeScript' })]
    case 'Java': return [java()]
    case 'C':
    case 'C++':
    case 'C#': return [cpp()]
    case 'SQL': return [sql()]
    case 'HTML': return [htmlLang()]
    case 'CSS': return [cssLang()]
    case 'Rust': return [rust()]
    case 'PHP': return [php()]
    default: return []
  }
}

export default function CodeInputPanel({ code, setCode, language, setLanguage }) {
  const extensions = useMemo(() => getLangExt(language), [language])
  const charCount = code.length

  const loadExample = (idx) => {
    const ex = EXAMPLES[idx]
    if (!ex) return
    setLanguage(ex.language)
    setCode(ex.code)
  }

  return (
    <section className="bg-bg-secondary rounded-2xl p-5 sm:p-6 border border-white/5 relative">
      <div className="flex flex-wrap items-center gap-3 mb-4 justify-between">
        <div className="flex items-center gap-3 flex-wrap">
          <label className="text-xs uppercase tracking-widest text-slate-400">Language</label>
          <select
            data-testid="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-bg-tertiary border border-white/10 text-slate-100 rounded-full px-4 py-1.5 text-sm font-mono focus:outline-none focus:border-indigo-500 transition"
          >
            {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div className="relative group">
          <button
            data-testid="example-menu-btn"
            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/20 transition"
          >
            Try Example Code ▾
          </button>
          <div className="absolute right-0 mt-2 w-72 bg-bg-tertiary border border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
            {EXAMPLES.map((ex, i) => (
              <button
                key={ex.label}
                onClick={() => loadExample(i)}
                data-testid={`example-option-${i}`}
                className="w-full text-left px-4 py-2.5 text-sm text-slate-200 hover:bg-indigo-500/20 first:rounded-t-xl last:rounded-b-xl border-b border-white/5 last:border-b-0"
              >
                {ex.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl overflow-hidden glow-border focus-within:ring-1 focus-within:ring-indigo-500 transition">
        <CodeMirror
          value={code}
          height="320px"
          maxHeight="600px"
          theme={oneDark}
          extensions={extensions}
          placeholder={PLACEHOLDER}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            foldGutter: true,
          }}
          onChange={(v) => setCode(v)}
          data-testid="code-editor"
        />
      </div>

      <div className="flex items-center justify-end mt-2 text-xs text-slate-500 font-mono" data-testid="char-counter">
        {charCount.toLocaleString()} / 10,000 chars
      </div>
    </section>
  )
}
