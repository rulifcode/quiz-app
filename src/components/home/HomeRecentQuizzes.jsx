import { useNavigate } from "react-router-dom"
import { getHistory } from "../../utils/historyUtils"

export default function HomeRecentQuizzes() {
  const history = getHistory()
  const navigate = useNavigate()

  return (
    <div className="bg-[#1a1a2e] border border-white/10 rounded-xl p-5 mt-6">
      <h2 className="text-white font-bold text-base mb-1">Recent Quizzes</h2>
      <p className="text-gray-500 text-xs mb-5">Your recently created quizzes</p>
      <div className="grid grid-cols-3 gap-4">
        {history.map((item) => {
          const pct = Math.round((item.score / item.total) * 100)
          return (
            <div key={item.id} className="bg-[#0f0f1a] border border-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-white text-sm font-semibold">{item.category}</p>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </div>
              <div className="flex items-center gap-4 text-gray-500 text-xs mb-3">
                <span>{item.total} questions</span>
                <span>{item.score} completions</span>
              </div>
              <p className="text-gray-500 text-xs mb-1.5">Completion Rate</p>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500 rounded-full"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="text-right text-white text-xs font-semibold mt-1">{pct}%</p>
            </div>
          )
        })}

        {/* Create New Quiz card */}
        <button
          onClick={() => navigate("/quiz")}
          className="bg-[#0f0f1a] border border-dashed border-white/20 rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:border-purple-500 transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" className="group-hover:stroke-purple-400">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </div>
          <p className="text-gray-500 text-sm group-hover:text-purple-400 transition-colors">Create New Quiz</p>
          <p className="text-gray-600 text-xs text-center">Add questions, set time limits and more</p>
        </button>
      </div>
    </div>
  )
}