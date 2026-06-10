export default function QuizHeader() {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 sm:px-8">
      <div className="flex items-center gap-4">
        <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-50">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <div>
          <h1 className="text-lg font-black leading-tight tracking-tight text-slate-900">Quiz Session</h1>
          <p className="text-xs text-slate-500">Answer each question before the timer runs out</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Question mode</p>
        <p className="mt-1 text-sm font-medium text-slate-700">One question per screen</p>
      </div>
    </div>
  )
}