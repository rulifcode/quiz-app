import useQuizSession from "../hooks/useQuizSession"
import QuizSessionContent from "../components/quiz/QuizSessionContent"
import LoadingScreen from "../components/common/LoadingScreen"

export default function QuizPage() {
  const session = useQuizSession()

  if (session.status === "loading") return <LoadingScreen />
  if (!session.questions.length) return null

  return (
    <QuizSessionContent
      key={session.currentIndex}
      answerQuestion={session.answerQuestion}
      currentIndex={session.currentIndex}
      currentQuestion={session.currentQuestion}
      isLastQuestion={session.isLastQuestion}
      questions={session.questions}
      timeLeft={session.timeLeft}
    />
  )
}