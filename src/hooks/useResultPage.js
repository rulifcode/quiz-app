import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useQuiz } from "../context/QuizContext"
import { subscribeLeaderboard } from "../services/leaderboardService"

export default function useResultPage() {
  const { quizState, resetQuiz, startQuiz } = useQuiz()
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [leaderboard, setLeaderboard] = useState([])

  const { questions, answers, timeLeft, totalTime } = quizState

  const summary = useMemo(() => {
    const correct = questions.filter((q, i) => answers[i] === q.correct_answer).length
    const wrong = questions.filter((q, i) => answers[i] !== undefined && answers[i] !== q.correct_answer).length
    const skipped = questions.filter((q, i) => answers[i] === undefined).length
    const timeUsed = Math.max(0, (totalTime || 0) - timeLeft)

    return { correct, wrong, skipped, timeUsed }
  }, [answers, questions, timeLeft, totalTime])

  useEffect(() => {
    const unsubscribe = subscribeLeaderboard((entries) => {
      setLeaderboard(entries)
    }, 5)

    return () => unsubscribe()
  }, [])

  const handleHome = () => {
    resetQuiz()
    navigate("/", { replace: true })
  }

  const handleRetry = async () => {
    const retrySettings = {
      category: quizState.categoryId
        ? { label: quizState.category, categoryId: quizState.categoryId }
        : null,
      difficulty: quizState.difficulty ?? null,
    }
    resetQuiz()
    const didStart = await startQuiz(retrySettings)
    if (didStart) navigate("/quiz", { replace: true })
  }

  const handleLogout = async () => {
    resetQuiz()
    await logout()
    navigate("/", { replace: true })
  }

  return {
    handleHome,
    handleLogout,
    handleRetry,
    leaderboard,
    summary,
    quizState,
  }
}
