import { useEffect, useState } from "react"
import {
  ArrowRight,
  BookOpenCheck,
  Brain,
  ChevronDown,
  ChevronUp,
  Clapperboard,
  Clock3,
  Dumbbell,
  Globe,
  Landmark,
  Leaf,
  ListChecks,
  Monitor,
  Play,
  RotateCcw,
  Shuffle,
  Trophy,
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { QUIZ_AMOUNT, QUIZ_CATEGORIES, QUIZ_DIFFICULTIES, QUIZ_DURATION_SECONDS } from "../../config/quizConfig"
import { useAuth } from "../../context/AuthContext"
import { useQuiz } from "../../context/QuizContext"
import { fetchCategories } from "../../services/quizApi"
import { subscribeLeaderboard } from "../../services/leaderboardService"
import heroImage from "../../assets/hero1.jpg"

const formatDuration = (seconds) => `${Math.floor(seconds / 60)} menit`

const CATEGORY_ICONS = {
  Random: Shuffle,
  "General Knowledge": Brain,
  "Science & Nature": Leaf,
  "Science: Computers": Monitor,
  Geography: Globe,
  History: Landmark,
  Sports: Dumbbell,
  Entertainment: Clapperboard,
}

const getCategoryIcon = (label) => {
  if (CATEGORY_ICONS[label]) return CATEGORY_ICONS[label]
  if (label.includes("Science: Computers") || label.includes("Gadgets")) return Monitor
  if (label.includes("Science")) return Leaf
  if (label.includes("Entertainment")) return Clapperboard
  if (label.includes("Geography")) return Globe
  if (label.includes("History") || label.includes("Politics")) return Landmark
  if (label.includes("Sports")) return Dumbbell
  if (label.includes("General")) return Brain
  return BookOpenCheck
}

const difficultyText = (value) => QUIZ_DIFFICULTIES.find((item) => item.value === value)?.label ?? "Any Difficulty"

export default function LandingHero() {
  const { user } = useAuth()
  const { quizState, startQuiz } = useQuiz()
  const navigate = useNavigate()
  const [leaderboard, setLeaderboard] = useState([])
  const [categoryOptions, setCategoryOptions] = useState(QUIZ_CATEGORIES)
  const [categoryLoadError, setCategoryLoadError] = useState(null)
  const [selectedCategoryId, setSelectedCategoryId] = useState("random")
  const [selectedDifficulty, setSelectedDifficulty] = useState(null)
  const [startingCategory, setStartingCategory] = useState(null)
  const [showAllCategories, setShowAllCategories] = useState(false)
  const canResume = user && quizState.status === "active" && quizState.questions.length > 0
  const selectedCategory =
    categoryOptions.find((category) =>
      selectedCategoryId === "random" ? category.categoryId === null : String(category.categoryId) === selectedCategoryId
    ) ?? categoryOptions[0]
  const hasMoreCategories = categoryOptions.length > 8
  const displayedCategories = showAllCategories ? categoryOptions : categoryOptions.slice(0, 8)

  useEffect(() => {
    const unsubscribe = subscribeLeaderboard((entries) => setLeaderboard(entries), 5)
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    let isMounted = true

    fetchCategories()
      .then((categories) => {
        if (!isMounted) return
        setCategoryOptions(categories)
        setCategoryLoadError(null)
      })
      .catch((error) => {
        if (!isMounted) return
        console.error("Gagal mengambil kategori OpenTDB: - LandingHero.jsx:91", error)
        setCategoryOptions(QUIZ_CATEGORIES)
        setCategoryLoadError("Kategori API belum bisa dimuat, sementara memakai kategori bawaan.")
      })

    return () => {
      isMounted = false
    }
  }, [])

  const handleStart = async (category = selectedCategory, difficulty = selectedDifficulty) => {
    if (!user) {
      navigate("/login")
      return
    }

    const categoryLabel = category?.label ?? "Random"
    setStartingCategory(categoryLabel)
    try {
      const didStart = await startQuiz({ category, difficulty })
      if (didStart) navigate("/quiz")
    } finally {
      setStartingCategory(null)
    }
  }

  return (
    <main>
      <section className="relative isolate overflow-hidden bg-slate-950 text-white">
        <img
          src={heroImage}
          alt="Quizzy hero"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-slate-950/65" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-slate-100 via-slate-100/60 to-transparent" />

        <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl flex-col justify-center px-4 py-14 sm:min-h-[680px] sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase text-sky-200">React quiz app</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Kuis cepat, bersih, dan bisa dilanjutkan kapan saja.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-100">
            Login dengan Google, ambil soal langsung dari Open Trivia Database, jawab satu soal per layar, lalu lihat hasil pengerjaan secara ringkas.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            {canResume ? (
              <button
                onClick={() => navigate("/quiz")}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-950/20 transition-colors hover:bg-sky-400"
              >
                <RotateCcw size={17} />
                Resume Kuis
              </button>
            ) : null}
            <button
              onClick={() => handleStart()}
              disabled={Boolean(startingCategory)}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-950/20 transition-colors hover:bg-slate-100 disabled:cursor-wait disabled:opacity-70"
            >
              <Play size={17} />
              {startingCategory ? "Memuat soal..." : "Mulai Quiz"}
            </button>
            <button
              onClick={() => document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/15"
            >
              Pilih Kategori
              <ArrowRight size={17} />
            </button>
          </div>

          {quizState.error ? (
            <p className="mt-4 rounded-md border border-rose-200/50 bg-rose-950/50 px-4 py-3 text-sm text-rose-50 backdrop-blur">
              {quizState.error}
            </p>
          ) : null}

          <div className="mt-6 grid max-w-3xl gap-3 rounded-lg border border-white/15 bg-white/15 p-3 shadow-xl shadow-slate-950/20 backdrop-blur-xl sm:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)_auto] sm:items-end">
            <label className="min-w-0">
              <span className="mb-2 block text-xs font-semibold uppercase text-slate-200">Kategori</span>
              <select
                value={selectedCategoryId}
                onChange={(event) => setSelectedCategoryId(event.target.value)}
                className="h-11 w-full rounded-md border border-white/20 bg-white px-3 text-sm font-semibold text-slate-900 outline-none transition-colors focus:border-sky-300"
              >
                {categoryOptions.map((category) => (
                  <option key={category.categoryId ?? "random"} value={category.categoryId ?? "random"}>
                    {category.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="min-w-0">
              <span className="mb-2 block text-xs font-semibold uppercase text-slate-200">Level</span>
              <select
                value={selectedDifficulty ?? "any"}
                onChange={(event) => setSelectedDifficulty(event.target.value === "any" ? null : event.target.value)}
                className="h-11 w-full rounded-md border border-white/20 bg-white px-3 text-sm font-semibold text-slate-900 outline-none transition-colors focus:border-sky-300"
              >
                {QUIZ_DIFFICULTIES.map((difficulty) => (
                  <option key={difficulty.value ?? "any"} value={difficulty.value ?? "any"}>
                    {difficulty.label}
                  </option>
                ))}
              </select>
            </label>

            <button
              onClick={() => handleStart()}
              disabled={Boolean(startingCategory)}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-sky-500 px-5 text-sm font-semibold text-white shadow-lg shadow-sky-950/20 transition-colors hover:bg-sky-400 disabled:cursor-wait disabled:opacity-70"
            >
              <Play size={16} />
              Start
            </button>
          </div>

          {categoryLoadError ? (
            <p className="mt-3 max-w-3xl text-xs leading-5 text-slate-200">{categoryLoadError}</p>
          ) : null}

          <div id="features" className="mt-9 grid gap-3 sm:grid-cols-3 lg:max-w-3xl">
            {[
              { icon: ListChecks, value: QUIZ_AMOUNT, label: "Total soal" },
              { icon: Clock3, value: formatDuration(QUIZ_DURATION_SECONDS), label: "Timer" },
              { icon: RotateCcw, value: "Auto", label: "Resume session" },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border border-white/15 bg-white/15 p-4 shadow-lg shadow-slate-950/10 backdrop-blur-xl">
                <item.icon className="h-5 w-5 text-sky-200" />
                <p className="mt-3 text-xl font-semibold">{item.value}</p>
                <p className="mt-1 text-sm text-slate-200">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="categories" className="border-y border-slate-200 bg-slate-100">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase text-sky-700">Kategori</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Pilih topik kuis</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-500">
              Kategori dimuat dari OpenTDB, level mengikuti pilihan API: Easy, Medium, atau Hard.
            </p>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {displayedCategories.map((category) => {
              const Icon = getCategoryIcon(category.label)
              const isStarting = startingCategory === category.label
              const selectedLevelLabel = difficultyText(selectedDifficulty)

              return (
                <article key={category.categoryId ?? "random"} className="group flex min-h-56 flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg hover:shadow-slate-200/70">
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-sky-50 text-sky-700 ring-1 ring-sky-100 transition-colors group-hover:bg-sky-600 group-hover:text-white">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-5 font-semibold text-slate-950">{category.label}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{category.description}</p>
                  <p className="mt-3 text-xs font-semibold uppercase text-slate-400">{selectedLevelLabel}</p>
                  <button
                    onClick={() => handleStart(category, selectedDifficulty)}
                    disabled={Boolean(startingCategory)}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-slate-950 px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-wait disabled:opacity-70"
                  >
                    {isStarting ? "Memuat..." : "Mulai"}
                    <ArrowRight size={16} />
                  </button>
                </article>
              )
            })}
          </div>

          {hasMoreCategories ? (
            <div className="mt-7 flex justify-center">
              <button
                onClick={() => setShowAllCategories((value) => !value)}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-sky-200 hover:text-sky-700 hover:shadow-md"
              >
                {showAllCategories ? (
                  <>
                    Show Less
                    <ChevronUp size={17} />
                  </>
                ) : (
                  <>
                    See All
                    <ChevronDown size={17} />
                  </>
                )}
              </button>
            </div>
          ) : null}
        </div>
      </section>

      <section id="leaderboard" className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase text-sky-700">Leaderboard</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Ranking pengguna</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Skor pengguna login akan masuk ke Firestore setelah kuis selesai. Riwayat pribadi tetap tersimpan di browser.
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          {leaderboard.length ? (
            <div className="divide-y divide-slate-100">
              {leaderboard.map((entry, index) => (
                <div key={entry.id} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 text-sm font-semibold text-slate-700">
                      {index + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-950">{entry.displayName || "Quiz Player"}</p>
                      <p className="text-xs text-slate-500">{entry.quizzesTaken || 0} attempt</p>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700">
                    <Trophy size={16} />
                    {entry.totalScore || 0}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">Belum ada skor leaderboard.</p>
          )}
        </div>
      </section>
    </main>
  )
}
