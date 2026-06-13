export default function QuizProgress({ answered, current, total, timeLeft }) {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0")
  const seconds = String(timeLeft % 60).padStart(2, "0")
  const progress = total ? ((current + 1) / total) * 100 : 0

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase text-slate-500">Progress</p>
          <p className="mt-1 text-sm font-medium text-slate-900">
            Soal {current + 1} dari {total} | Dijawab {answered}/{total}
          </p>
        </div>
        <div className="rounded-md bg-slate-950 px-3 py-2 font-mono text-sm font-semibold text-white">
          {minutes}:{seconds}
        </div>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-sky-600 transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
