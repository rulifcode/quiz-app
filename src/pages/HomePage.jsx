import { useNavigate } from "react-router-dom"
import { useQuiz } from "../context/QuizContext"
import HomeSidebar from "../components/home/HomeSidebar"
import HomeStatsCards from "../components/home/HomeStatsCards"
import HomeRecentEvents from "../components/home/HomeRecentEvents"
import HomeTopStudents from "../components/home/HomeTopStudents"
import HomeRecentQuizzes from "../components/home/HomeRecentQuizzes"
import { useAuth } from "../context/AuthContext"

export default function HomePage() {
  const { startQuiz } = useQuiz()
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleCreate = async () => {
    await startQuiz(null)
    navigate("/quiz")
  }

  return (
    <div className="flex min-h-screen bg-[#0f0f1a]">
      <HomeSidebar />

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between px-8 py-4 border-b border-white/10">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 w-64">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <span className="text-gray-500 text-sm">Search...</span>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 bg-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Create Quiz
          </button>
        </div>

        {/* Dashboard content */}
        <div className="px-8 py-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-white font-bold text-2xl">Dashboard</h1>
              <p className="text-gray-400 text-sm">Welcome back, {user?.displayName?.split(" ")[0]}! Here's what's happening with your quizzes</p>
            </div>
            <button
              onClick={handleCreate}
              className="flex items-center gap-2 bg-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Create New Quiz
            </button>
          </div>

          <HomeStatsCards />

          <div className="flex gap-6">
            <HomeRecentEvents />
            <HomeTopStudents />
          </div>

          <HomeRecentQuizzes />
        </div>
      </div>
    </div>
  )
}