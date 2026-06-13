import { LogIn, LogOut, Play, RotateCcw } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useQuiz } from "../../context/QuizContext"
import logoQuizzy from "../../assets/logo_quizzy.png"

export default function LandingNavbar() {
  const { user, logout } = useAuth()
  const { quizState, resetQuiz, startQuiz } = useQuiz()
  const navigate = useNavigate()
  const canResume = user && quizState.status === "active" && quizState.questions.length > 0

  const handleStart = async () => {
    if (!user) {
      navigate("/login")
      return
    }

    const didStart = await startQuiz(null)
    if (didStart) navigate("/quiz")
  }

  const handleLogout = async () => {
    resetQuiz()
    await logout()
    navigate("/", { replace: true })
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <button onClick={() => navigate("/")} className="flex h-12 min-w-0 items-center" aria-label="Kembali ke beranda Quizzy">
          <img src={logoQuizzy} alt="Quizzy" className="h-12 w-auto object-contain sm:h-14" />
        </button>

        <nav className="hidden items-center rounded-md border border-slate-200 bg-slate-50/80 p-1 text-sm font-semibold text-slate-600 md:flex">
          <a className="rounded-md px-3 py-2 transition-colors hover:bg-white hover:text-slate-950" href="#categories">Kategori</a>
          <a className="rounded-md px-3 py-2 transition-colors hover:bg-white hover:text-slate-950" href="#leaderboard">Leaderboard</a>
          <a className="rounded-md px-3 py-2 transition-colors hover:bg-white hover:text-slate-950" href="#features">Fitur</a>
        </nav>

        <div className="flex items-center gap-2">
          {canResume ? (
            <button
              onClick={() => navigate("/quiz")}
              className="inline-flex items-center gap-2 rounded-md border border-sky-200 bg-sky-50 px-3 py-2 text-sm font-semibold text-sky-700 transition-colors hover:bg-sky-100"
            >
              <RotateCcw size={16} />
              <span className="hidden sm:inline">Resume</span>
            </button>
          ) : null}

          {user ? (
            <>
              <button
                onClick={handleStart}
                className="inline-flex h-10 items-center gap-2 rounded-md bg-slate-950 px-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800"
              >
                <Play size={16} />
                Mulai
              </button>
              <button
                onClick={handleLogout}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 shadow-sm transition-colors hover:bg-slate-50"
                aria-label="Logout"
              >
                <LogOut size={17} />
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="inline-flex h-10 items-center gap-2 rounded-md bg-slate-950 px-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800"
            >
              <LogIn size={16} />
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
