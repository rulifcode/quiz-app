import { decodeHTML } from "../../utils/decode"

export default function QuizQuestion({ question, index, total }) {
  return (
    <div className="mx-5 bg-[#1a1a2e]/60 border border-white/10 rounded-2xl p-5">
      {/* Question header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-white font-bold text-sm">Question {index + 1}</span>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-xs">Points:</span>
            <span className="bg-[#0f0f1a] border border-white/10 text-white text-xs px-3 py-1 rounded-lg">
              10
            </span>
          </div>
          <div className="flex items-center gap-1 bg-[#0f0f1a] border border-white/10 text-white text-xs px-3 py-1 rounded-lg">
            <span>Multiple Choice</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </div>
          <button className="text-red-400 hover:text-red-300 transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Question label & text */}
      <p className="text-gray-400 text-xs mb-2">Question Text</p>
      <div className="bg-[#0f0f1a] border border-white/10 rounded-xl px-4 py-3 text-white text-sm leading-relaxed min-h-[72px]">
        {decodeHTML(question)}
      </div>
    </div>
  )
}