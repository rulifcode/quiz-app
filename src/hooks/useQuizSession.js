import { useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { useQuiz } from "../context/QuizContext"

export default function useQuizSession() {
  const { quizState, answerQuestion, tickTimer } = useQuiz()
  const { questions, currentIndex, timeLeft, status } = quizState
  const navigate = useNavigate()

  useEffect(() => {
    if (status === "idle") navigate("/", { replace: true })
    if (status === "finished") navigate("/result", { replace: true })
  }, [status, navigate])

  useEffect(() => {
    if (status !== "active") return

    const timer = setInterval(tickTimer, 1000)
    return () => clearInterval(timer)
  }, [status, tickTimer])

  const currentQuestion = useMemo(() => questions[currentIndex] ?? null, [questions, currentIndex])
  const isLastQuestion = currentIndex === questions.length - 1

  return {
    answerQuestion,
    currentIndex,
    currentQuestion,
    isLastQuestion,
    questions,
    status,
    timeLeft,
  }
}