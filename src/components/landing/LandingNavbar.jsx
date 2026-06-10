import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useQuiz } from "../../context/QuizContext"
import { ChevronDown, LogOut, Play, Search, UserCircle2 } from "lucide-react"

export default function LandingNavbar() {
  const { user, logout } = useAuth()
  const { startQuiz, resetQuiz } = useQuiz()
  const navigate = useNavigate()
  const dropdownRef = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handlePlayQuiz = async () => {
    if (!user) {
      navigate("/login")
      return
    }

    await startQuiz(null)
    navigate("/quiz")
  }

  const handleLogout = async () => {
    setIsMenuOpen(false)
    resetQuiz()
    await logout()
    navigate("/", { replace: true })
  }

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div
        className="mx-auto border border-[#cfe3ff] bg-[#2f9df4] px-4 py-3 shadow-[0_18px_50px_rgba(26,112,192,0.18)] sm:px-6"
        style={{ borderRadius: "2rem" }}
      >
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => navigate("/")}
          className="text-left text-xl font-black tracking-tight text-white"
        >
          Quizzy
        </button>

        <div className="hidden flex-1 items-center justify-center gap-8 px-6 text-sm font-medium text-white/90 md:flex">
          <button className="flex items-center gap-1 transition-colors hover:text-white">
            Quiz of the day <ChevronDown size={14} />
          </button>
          <button className="flex items-center gap-1 transition-colors hover:text-white">
            Quizzes <ChevronDown size={14} />
          </button>
          <button className="flex items-center gap-1 transition-colors hover:text-white">
            Games <ChevronDown size={14} />
          </button>
        </div>

        <div className="flex flex-1 items-center justify-end gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-white/25 bg-white px-4 py-2 text-sm text-slate-500 shadow-sm lg:flex" style={{ minWidth: "220px" }}>
            <Search size={16} className="text-slate-400" />
            <span className="truncate">Search the Quiz</span>
          </div>

          {user ? (
            <div ref={dropdownRef} className="relative flex items-center gap-3">
              <button
                onClick={handlePlayQuiz}
                className="hidden items-center gap-2 rounded-full bg-[#ffe15a] px-5 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-[#ffd83c] md:flex"
              >
                <Play size={16} fill="currentColor" />
                Play Quiz
              </button>

              <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="flex items-center gap-3 rounded-full bg-white/12 px-2 py-2 text-left text-white transition-colors hover:bg-white/18"
                aria-haspopup="menu"
                aria-expanded={isMenuOpen}
              >
                <img
                  src={user.photoURL || "https://ui-avatars.com/api/?name=Q&background=ffffff&color=1e1e1e"}
                  alt={user.displayName || "Profile"}
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-white/20"
                />
                <div className="hidden min-w-0 pr-1 text-left sm:block">
                  <p className="truncate text-xs font-semibold leading-tight text-white">
                    {user.displayName || "Quiz Player"}
                  </p>
                  <p className="text-[11px] text-white/75">Profile</p>
                </div>
                <ChevronDown size={16} className={`mr-1 transition-transform duration-200 ${isMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {isMenuOpen ? (
                <div className="absolute right-0 top-16 w-72 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-3 text-slate-900 shadow-[0_24px_60px_rgba(15,23,42,0.18)]">
                  <div className="rounded-[1.3rem] bg-slate-50 p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.photoURL || "https://ui-avatars.com/api/?name=Q&background=ffffff&color=1e1e1e"}
                        alt={user.displayName || "Profile"}
                        className="h-12 w-12 rounded-full object-cover ring-1 ring-slate-200"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {user.displayName || "Quiz Player"}
                        </p>
                        <p className="truncate text-xs text-slate-500">
                          {user.email || "Signed in with Google"}
                        </p>
                      </div>
                      <UserCircle2 size={18} className="text-slate-400" />
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="mt-3 flex w-full items-center gap-3 rounded-[1.2rem] px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                      <LogOut size={16} />
                    </span>
                    <span className="flex-1 text-left">Logout</span>
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/login")}
                className="text-sm font-semibold text-white/90 transition-colors hover:text-white"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/login")}
                className="rounded-full bg-[#ffe15a] px-5 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-[#ffd83c]"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
      </div>
    </header>
  )
}