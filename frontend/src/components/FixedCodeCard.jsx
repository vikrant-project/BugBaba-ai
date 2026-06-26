import React, { useMemo } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { oneDark } from '@codemirror/theme-one-dark'
import { python } from '@codemirror/lang-python'
import { javascript } from '@codemirror/lang-javascript'
import { java } from '@codemirror/lang-java'
import { cpp } from '@codemirror/lang-cpp'
import { sql } from '@codemirror/lang-sql'
import { useClipboard } from '../hooks/useClipboard'

function getExt(language) {
  switch (language) {
    case 'Python': return [python()]
    case 'JavaScript':
    case 'TypeScript': return [javascript({ jsx: true, typescript: language === 'TypeScript' })]
    case 'Java': return [java()]
    case 'C':
    case 'C++':
    case 'C#': return [cpp()]
    case 'SQL': return [sql()]
    default: return []
  }
}

export default function FixedCodeCard({ code = '', language }) {
  const ext = useMemo(() => getExt(language), [language])
  const { copy, copied } = useClipboard()
  return (
    <div data-testid="card-fixed-code" className="bg-bg-secondary rounded-2xl border border-white/5 border-l-4 border-l-emerald-500 p-5 animate-slide-up-fade delay-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="text-xl">✅</div>
        <h3 className="font-semibold text-slate-100">Fixed Code</h3>
        <button
          data-testid="copy-fixed-btn"
          onClick={() => copy(code)}
          className="ml-auto text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 transition"
        >
          {copied ? 'Copied! 🎉' : 'Copy Fixed Code'}
        </button>
      </div>
      <div className="rounded-xl overflow-hidden border border-white/5">
        <CodeMirror
          value={code}
          theme={oneDark}
          extensions={ext}
          height="auto"
          maxHeight="420px"
          editable={false}
          basicSetup={{ lineNumbers: true, foldGutter: true }}
          data-testid="fixed-code-editor"
        />
      </div>
    </div>
  )
}
