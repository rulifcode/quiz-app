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

  const { questions, answers, timeLeft } = quizState

  const summary = useMemo(() => {
    const correct = questions.filter((q, i) => answers[i] === q.correct_answer).length
    const wrong = questions.filter((q, i) => answers[i] !== undefined && answers[i] !== q.correct_answer).length
    const skipped = questions.filter((q, i) => answers[i] === undefined).length
    const timeUsed = 600 - timeLeft

    return { correct, wrong, skipped, timeUsed }
  }, [answers, questions, timeLeft])

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
    resetQuiz()
    await startQuiz(null)
    navigate("/quiz", { replace: true })
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