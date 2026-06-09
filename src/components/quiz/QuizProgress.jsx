export default function QuizProgress({ current, total, timeLeft }) {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0")
  const seconds = String(timeLeft % 60).padStart(2, "0")

  return (
    <div className="flex items-center justify-between px-5 mb-5">
      <span className="text-gray-400 text-xs">{current + 1} of {total} questions</span>
      <span className="text-purple-400 text-xs font-semibold">{minutes}:{seconds}</span>
    </div>
  )
}