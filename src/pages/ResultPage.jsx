import { useNavigate } from "react-router-dom"
import { useQuiz } from "../context/QuizContext"
import ResultHeader from "../components/result/ResultHeader"
import ResultScore from "../components/result/ResultScore"
import ResultStats from "../components/result/ResultStats"
import ResultReview from "../components/result/ResultReview"

export default function ResultPage() {
  const { quizState, resetQuiz } = useQuiz()
  const { questions, answers, timeLeft } = quizState
  const navigate = useNavigate()

  const correct = questions.filter((q, i) => answers[i] === q.correct_answer).length
  const wrong = questions.filter((q, i) => answers[i] !== undefined && answers[i] !== q.correct_answer).length
  const skipped = questions.filter((q, i) => answers[i] === undefined).length
  const timeUsed = 600 - timeLeft  // asumsi timer mulai dari 600 detik

  const handleHome = () => {
    resetQuiz()
    navigate("/home")
  }

  const handleRetry = () => {
    resetQuiz()
    navigate("/home")
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <ResultHeader onHome={handleHome} />
      <ResultScore />
      <div className="px-5">
        <ResultStats
          correct={correct}
          wrong={wrong}
          skipped={skipped}
          timeUsed={timeUsed}
        />
        <ResultReview
          questions={questions}
          answers={answers}
        />
      </div>
      <div className="px-5 mt-6 flex flex-col gap-3">
        <button
          onClick={handleRetry}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors"
        >
          Ulangi Quiz
        </button>
        <button
          onClick={handleHome}
          className="w-full border border-gray-200 text-gray-600 font-semibold py-3 rounded-xl hover:bg-gray-100 transition-colors"
        >
          Kembali ke Home
        </button>
      </div>
    </div>
  )
}