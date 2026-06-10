export default function QuizProgress({ current, total, timeLeft }) {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0")
  const seconds = String(timeLeft % 60).padStart(2, "0")

  return (
    <div className="mb-5 flex items-center justify-between rounded-3xl border border-slate-200 bg-white px-5 py-4 text-xs text-slate-500 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
      <span className="font-semibold uppercase tracking-[0.25em]">
        Question {current + 1} of {total}
      </span>
      <span className="rounded-full bg-[#2f9df4]/10 px-3 py-1 font-semibold text-[#228fee]">
        {minutes}:{seconds}
      </span>
    </div>
  )
}