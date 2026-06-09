export default function QuizHeader() {
  return (
    <div className="flex items-center justify-between px-6 py-5">
      <div className="flex items-center gap-4">
        <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <div>
          <h1 className="text-white font-bold text-lg leading-tight">Create New Quiz</h1>
          <p className="text-gray-400 text-xs">Add questions, set answers and configure quiz settings</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="border border-white/20 text-white text-sm px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
          Save Draft
        </button>
        <button className="bg-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
          Preview
        </button>
      </div>
    </div>
  )
}