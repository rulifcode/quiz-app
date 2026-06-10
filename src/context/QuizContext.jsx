import { createContext, useContext, useState, useEffect } from "react"
import { fetchQuestions } from "../services/quizApi"
import { saveHistory } from "../utils/historyUtils"
import { auth } from "../firebase"
import { recordLeaderboardScore } from "../services/leaderboardService"

const QuizContext = createContext()
const QUIZ_STORAGE_KEY = "quiz_state"

const defaultState = {
  questions: [],
  currentIndex: 0,
  answers: [],
  timeLeft: 0,
  totalTime: 0,
  status: "idle",
  category: null,
}

const persistQuizResult = (quizState, correct) => {
  saveHistory(quizState.category ?? "Random", correct, quizState.questions.length)

  const currentUser = auth.currentUser
  void recordLeaderboardScore({
    user: currentUser,
    score: correct,
    total: quizState.questions.length,
    category: quizState.category ?? "Random",
  }).catch((error) => {
    console.error("Gagal simpan leaderboard: QuizContext.jsx", error)
  })
}

export const QuizProvider = ({ children }) => {
  const [quizState, setQuizState] = useState(() => {
    const saved = localStorage.getItem(QUIZ_STORAGE_KEY)
    return saved ? JSON.parse(saved) : defaultState
  })

  useEffect(() => {
    if (quizState.status !== "idle") {
      localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(quizState))
    }
  }, [quizState])

  const startQuiz = async (category = null) => {
    setQuizState((prev) => ({ ...prev, status: "loading" }))
    try {
      const questions = await fetchQuestions(10, "medium", "multiple", category?.categoryId)
      const totalTime = 10 * 60
      setQuizState({
        questions,
        currentIndex: 0,
        answers: [],
        timeLeft: totalTime,
        totalTime,
        status: "active",
        category: category?.label ?? "Random",
      })
    } catch (err) {
      console.error("Gagal fetch soal: - QuizContext.jsx:45", err)
      setQuizState((prev) => ({ ...prev, status: "idle" }))
    }
  }

  const answerQuestion = (answer) => {
    const newAnswers = [...quizState.answers, answer]
    const isLast = quizState.currentIndex >= quizState.questions.length - 1

    if (isLast) {
      const correct = newAnswers.filter(
        (a, i) => a === quizState.questions[i]?.correct_answer
      ).length
      persistQuizResult(quizState, correct)
    }

    setQuizState((prev) => ({
      ...prev,
      answers: newAnswers,
      currentIndex: isLast ? prev.currentIndex : prev.currentIndex + 1,
      status: isLast ? "finished" : "active",
    }))
  }

  const tickTimer = () => {
    setQuizState((prev) => {
      if (prev.timeLeft <= 1) {
        const correct = prev.answers.filter(
          (a, i) => a === prev.questions[i]?.correct_answer
        ).length
        persistQuizResult(prev, correct)
        return { ...prev, timeLeft: 0, status: "finished" }
      }
      return { ...prev, timeLeft: prev.timeLeft - 1 }
    })
  }

  const resetQuiz = () => {
    localStorage.removeItem(QUIZ_STORAGE_KEY)
    setQuizState(defaultState)
  }

  return (
    <QuizContext.Provider value={{ quizState, startQuiz, answerQuestion, tickTimer, resetQuiz }}>
      {children}
    </QuizContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useQuiz = () => useContext(QuizContext)