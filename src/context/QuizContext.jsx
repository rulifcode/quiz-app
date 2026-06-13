import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"
import { fetchQuestions } from "../services/quizApi"
import { saveHistory } from "../utils/historyUtils"
import { auth } from "../firebase"
import { recordLeaderboardScore } from "../services/leaderboardService"
import { QUIZ_AMOUNT, QUIZ_DURATION_SECONDS } from "../config/quizConfig"
import { useToast } from "./ToastContext"

const QuizContext = createContext()
const QUIZ_STORAGE_KEY = "quiz_state"

const defaultState = {
  sessionId: null,
  questions: [],
  currentIndex: 0,
  answers: [],
  timeLeft: 0,
  totalTime: 0,
  endsAt: null,
  finishedAt: null,
  status: "idle",
  category: null,
  categoryId: null,
  difficulty: null,
  resultSaved: false,
  error: null,
}

const getRemainingTime = (quizState) => {
  if (!quizState.endsAt) return Math.max(0, Number(quizState.timeLeft) || 0)
  return Math.max(0, Math.ceil((quizState.endsAt - Date.now()) / 1000))
}

const countCorrectAnswers = (quizState) =>
  quizState.answers.filter((answer, index) => answer === quizState.questions[index]?.correct_answer).length

const finishQuizState = (quizState, timeLeft = quizState.timeLeft) => ({
  ...quizState,
  timeLeft: Math.max(0, timeLeft),
  currentIndex: Math.min(quizState.currentIndex, Math.max(quizState.questions.length - 1, 0)),
  status: "finished",
  finishedAt: quizState.finishedAt ?? Date.now(),
})

const normalizeSavedState = (savedState) => {
  const state = { ...defaultState, ...savedState }

  if (state.status !== "active") return state

  const endsAt = state.endsAt ?? Date.now() + (Number(state.timeLeft) || 0) * 1000
  const activeState = { ...state, endsAt }
  const timeLeft = getRemainingTime(activeState)

  return timeLeft > 0 ? { ...activeState, timeLeft } : finishQuizState(activeState, 0)
}

const loadSavedQuiz = () => {
  try {
    const saved = localStorage.getItem(QUIZ_STORAGE_KEY)
    return saved ? normalizeSavedState(JSON.parse(saved)) : defaultState
  } catch (error) {
    console.error("Gagal memuat sesi kuis tersimpan:", error)
    localStorage.removeItem(QUIZ_STORAGE_KEY)
    return defaultState
  }
}

const persistQuizResult = (quizState, correct) => {
  const difficultyLabel = quizState.difficulty ? ` - ${quizState.difficulty}` : ""
  saveHistory(`${quizState.category ?? "Random"}${difficultyLabel}`, correct, quizState.questions.length)

  const currentUser = auth.currentUser
  void recordLeaderboardScore({
    user: currentUser,
    score: correct,
    total: quizState.questions.length,
    category: `${quizState.category ?? "Random"}${difficultyLabel}`,
  }).catch((error) => {
    console.error("Gagal simpan leaderboard: QuizContext.jsx", error)
  })
}

const normalizeStartSettings = (settings = null) => {
  if (!settings) return { category: null, difficulty: null }
  if ("category" in settings || "difficulty" in settings) {
    return {
      category: settings.category ?? null,
      difficulty: settings.difficulty ?? null,
    }
  }

  return { category: settings, difficulty: null }
}

export const QuizProvider = ({ children }) => {
  const savedResultSessions = useRef(new Set())
  const [quizState, setQuizState] = useState(loadSavedQuiz)
  const { showToast } = useToast()

  useEffect(() => {
    if (quizState.status === "idle") {
      localStorage.removeItem(QUIZ_STORAGE_KEY)
      return
    }

    localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(quizState))
  }, [quizState])

  useEffect(() => {
    if (quizState.status !== "finished" || quizState.resultSaved || !quizState.questions.length) return

    const sessionKey = quizState.sessionId ?? "legacy-session"
    if (savedResultSessions.current.has(sessionKey)) return
    savedResultSessions.current.add(sessionKey)

    const correct = countCorrectAnswers(quizState)
    setQuizState((prev) =>
      prev.status === "finished" && !prev.resultSaved ? { ...prev, resultSaved: true } : prev
    )
    showToast({
      type: "success",
      title: "Quiz selesai",
      message: `Kamu sudah mengerjakan quiz. Skor: ${correct}/${quizState.questions.length}.`,
    })
    persistQuizResult({ ...quizState, resultSaved: true }, correct)
  }, [quizState, showToast])

  const startQuiz = useCallback(async (settings = null) => {
    const { category, difficulty } = normalizeStartSettings(settings)
    const categoryLabel = category?.label ?? "Random"
    const sessionId = crypto.randomUUID?.() ?? String(Date.now())
    setQuizState({
      ...defaultState,
      status: "loading",
      category: categoryLabel,
      categoryId: category?.categoryId ?? null,
      difficulty,
      sessionId,
    })

    try {
      const questions = await fetchQuestions({
        amount: QUIZ_AMOUNT,
        categoryId: category?.categoryId ?? null,
        difficulty,
      })
      const totalTime = QUIZ_DURATION_SECONDS
      setQuizState({
        ...defaultState,
        sessionId,
        questions,
        currentIndex: 0,
        answers: [],
        timeLeft: totalTime,
        totalTime,
        endsAt: Date.now() + totalTime * 1000,
        status: "active",
        category: categoryLabel,
        categoryId: category?.categoryId ?? null,
        difficulty,
      })
      showToast({
        type: "success",
        title: "Quiz dimulai",
        message: `${categoryLabel} siap dikerjakan.`,
      })
      return true
    } catch (err) {
      console.error("Gagal fetch soal:", err)
      setQuizState({ ...defaultState, status: "idle", error: err.message })
      showToast({
        type: "error",
        title: "Quiz gagal dimulai",
        message: err.message,
      })
      return false
    }
  }, [showToast])

  const answerQuestion = useCallback((answer) => {
    setQuizState((prev) => {
      if (prev.status !== "active") return prev

      const answers = [...prev.answers]
      answers[prev.currentIndex] = answer
      const isLast = prev.currentIndex >= prev.questions.length - 1
      const nextState = {
        ...prev,
        answers,
        currentIndex: isLast ? prev.currentIndex : prev.currentIndex + 1,
      }

      return isLast ? finishQuizState(nextState) : nextState
    })
  }, [])

  const tickTimer = useCallback(() => {
    setQuizState((prev) => {
      if (prev.status !== "active") return prev

      const timeLeft = getRemainingTime(prev)
      return timeLeft <= 0 ? finishQuizState(prev, 0) : { ...prev, timeLeft }
    })
  }, [])

  const resetQuiz = useCallback(() => {
    localStorage.removeItem(QUIZ_STORAGE_KEY)
    setQuizState(defaultState)
  }, [])

  return (
    <QuizContext.Provider value={{ quizState, startQuiz, answerQuestion, tickTimer, resetQuiz }}>
      {children}
    </QuizContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useQuiz = () => useContext(QuizContext)
