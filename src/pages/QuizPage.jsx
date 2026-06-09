import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useQuiz } from "../context/QuizContext"
import QuizHeader from "../components/quiz/QuizHeader"
import QuizProgress from "../components/quiz/QuizProgress"
import QuizQuestion from "../components/quiz/QuizQuestion"
import QuizOptions from "../components/quiz/QuizOptions"
import LoadingScreen from "../components/common/LoadingScreen"

export default function QuizPage() {
  const { quizState, answerQuestion, tickTimer, resetQuiz } = useQuiz()
  const { questions, currentIndex, answers, timeLeft, status } = quizState
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (status === "idle") navigate("/home")
    if (status === "finished") navigate("/result")
  }, [status, navigate])

  useEffect(() => {
    if (status !== "active") return
    const timer = setInterval(tickTimer, 1000)
    return () => clearInterval(timer)
  }, [status, tickTimer])

  useEffect(() => {
    setSelected(null)
  }, [currentIndex])

  if (status === "loading") return <LoadingScreen />
  if (!questions.length) return null

  const currentQuestion = questions[currentIndex]

  const handleNext = () => {
    if (!selected) return
    answerQuestion(selected)
  }

  return (
    <div className="min-h-screen bg-[#0f0f1a]">
      <QuizHeader />
      <div className="pb-28">
        <QuizProgress current={currentIndex} total={questions.length} timeLeft={timeLeft} />
        <QuizQuestion question={currentQuestion.question} index={currentIndex} total={questions.length} />
        <QuizOptions
          options={currentQuestion.answers}
          selected={selected}
          onSelect={setSelected}
        />

        {/* Add Question dekoratif */}
        <div className="mx-5 mt-4 border border-dashed border-white/10 rounded-2xl py-4 flex items-center justify-center">
          <span className="text-gray-500 text-sm">+ Add Question</span>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0f0f1a] border-t border-white/10 px-5 py-4 flex items-center justify-between">
        <button className="flex items-center gap-2 border border-white/20 text-white text-sm px-5 py-2.5 rounded-lg hover:bg-white/10 transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
          Prev
        </button>
        <button
          onClick={handleNext}
          disabled={!selected}
          className={`bg-purple-600 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-all ${
            selected ? "hover:bg-purple-700" : "opacity-40 cursor-not-allowed"
          }`}
        >
          {currentIndex === questions.length - 1 ? "Finish" : "Preview & Publish"}
        </button>
      </div>
    </div>
  )
}