import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useQuiz } from "../../context/QuizContext"
import { ChevronDown, Play } from "lucide-react"
import { subscribeLeaderboard } from "../../services/leaderboardService"
import heroImage from "../../assets/hero.png"

export default function LandingHero() {
  const { user } = useAuth()
  const { startQuiz } = useQuiz()
  const navigate = useNavigate()
  const [leaderboard, setLeaderboard] = useState([])
  const [leaderboardLoading, setLeaderboardLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = subscribeLeaderboard((entries) => {
      setLeaderboard(entries)
      setLeaderboardLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const handlePlayQuiz = async () => {
    if (!user) {
      navigate("/login")
      return
    }

    await startQuiz(null)
    navigate("/quiz")
  }

  const scrollToCategories = () => {
    const element = document.getElementById("categories")
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pt-6 pb-10 sm:px-6 lg:px-8">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px] xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="rounded-[2.25rem] bg-[#3aa0ff] p-6 text-white shadow-[0_24px_60px_rgba(58,160,255,0.28)] sm:p-8 lg:p-10">
          <div className="flex items-center justify-between text-sm font-medium text-white/85">
            <span className="rounded-full bg-white/15 px-3 py-1">Quiz of the day</span>
            <button
              onClick={scrollToCategories}
              className="hidden items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 transition-colors hover:bg-white/25 sm:flex"
            >
              Categories <ChevronDown size={14} />
            </button>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(240px,0.9fr)] lg:items-center">
            <div>
              <h1 className="max-w-xl text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl xl:text-7xl">
                Quiz of the Day
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/90 sm:text-base">
                Play a daily 10-question quiz, track your progress, and keep going with a clean, focused experience.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-white/85">
                <span><strong className="text-white">Plays:</strong> 34</span>
                <span><strong className="text-white">Avg:</strong> 6.20</span>
                <span><strong className="text-white">10s:</strong> 1</span>
              </div>

              <button
                onClick={handlePlayQuiz}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#ffe15a] px-6 py-3.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-[#ffd83c]"
              >
                <Play size={16} fill="currentColor" />
                Play Now
              </button>
            </div>

            <div className="relative mx-auto flex w-full max-w-90 items-center justify-center lg:max-w-none">
              <div className="absolute inset-0 rounded-4xl bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.24),transparent_60%)] blur-2xl" />
              <div className="relative overflow-hidden rounded-4xl bg-white/10 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.10)]">
                <img
                  src={heroImage}
                  alt="Quiz illustration"
                  className="h-full w-full rounded-3xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <aside className="rounded-4xl border border-slate-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-sm font-semibold text-slate-900">User Ranking</h2>
            <span className="text-sm font-semibold text-slate-900">Quiz</span>
          </div>
          <div className="mt-4 space-y-3">
            {leaderboardLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="h-8 animate-pulse rounded-2xl bg-slate-100" />
                ))}
              </div>
            ) : leaderboard.length ? (
              leaderboard.map((entry, index) => (
                <div key={entry.id} className="flex items-center justify-between text-sm">
                  <div className="flex min-w-0 items-center gap-2 text-slate-700">
                    <span className="w-4 text-center text-xs font-semibold text-slate-500">{index + 1}</span>
                    <img
                      src={entry.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(entry.displayName || "Q")}&background=2f9df4&color=fff`}
                      alt={entry.displayName || "Player"}
                      className="h-5 w-5 rounded-full object-cover"
                    />
                    <span className="truncate">{entry.displayName || "Quiz Player"}</span>
                  </div>
                  <span className="font-semibold text-[#3aa0ff]">{entry.totalScore || 0}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">Belum ada skor. Login dan selesaikan kuis untuk muncul di ranking.</p>
            )}
          </div>
        </aside>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_300px]">
        <article className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
          <h3 className="text-2xl font-semibold text-slate-900">Today's Most Popular Quiz</h3>
          <p className="mt-2 text-sm text-slate-600">Name the 20 most spoken languages</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">Guess the world's 20 most spoken languages.</p>
          <button className="mt-6 rounded-full bg-[#ffe15a] px-5 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-[#ffd83c]">
            Play Now
          </button>
        </article>

        <article className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
          <h3 className="text-2xl font-semibold text-slate-900">New Game Trivia Sprint</h3>
          <p className="mt-2 text-sm text-slate-600">Fast challenge with a fixed answer time and no retries.</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">Answer many questions in 20 seconds, earn extra time for correct answers.</p>
          <button className="mt-6 rounded-full bg-[#ffe15a] px-5 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-[#ffd83c]">
            Play Now
          </button>
        </article>

        <article className="rounded-[1.75rem] bg-[#ffe15a] p-6 shadow-[0_18px_40px_rgba(255,225,90,0.32)]">
          <h3 className="text-2xl font-semibold text-slate-900">Never Miss the Quiz of the Day!</h3>
          <p className="mt-3 text-sm leading-6 text-slate-800">Get your daily dose of quiz fun straight to your inbox.</p>
          <button className="mt-6 rounded-full bg-[#2f9df4] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#228fee]">
            Subscribe Now!
          </button>
        </article>
      </div>

      <section id="categories" className="mt-10">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Categories</h2>
        <div className="flex flex-wrap gap-3">
          {[
            "Geography",
            "History",
            "Science",
            "Entertainment",
            "Literature & Words",
            "Sports",
            "General Knowledge",
            "Math & Logic",
            "Tech & Internet",
          ].map((item) => (
            <button key={item} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50">
              {item}
            </button>
          ))}
        </div>
      </section>
    </section>
  )
}