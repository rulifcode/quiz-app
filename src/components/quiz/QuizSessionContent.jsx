import { useEffect, useRef, useState } from "react"
import QuizHeader from "./QuizHeader"
import QuizProgress from "./QuizProgress"
import QuizQuestion from "./QuizQuestion"
import QuizOptions from "./QuizOptions"

export default function QuizSessionContent({
  answerQuestion,
  answeredCount,
  currentIndex,
  currentQuestion,
  questions,
  timeLeft,
}) {
  const [selected, setSelected] = useState(null)
  const [isLocked, setIsLocked] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current)
  }, [])

  const handleSelect = (answer) => {
    if (isLocked) return

    setSelected(answer)
    setIsLocked(true)
    timeoutRef.current = setTimeout(() => {
      answerQuestion(answer)
    }, 240)
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <QuizHeader />
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <QuizProgress
          answered={answeredCount}
          current={currentIndex}
          timeLeft={timeLeft}
          total={questions.length}
        />

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
          <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
            <QuizQuestion
              category={currentQuestion.category}
              difficulty={currentQuestion.difficulty}
              index={currentIndex}
              question={currentQuestion.question}
              total={questions.length}
              type={currentQuestion.type}
            />
            <QuizOptions
              disabled={isLocked}
              options={currentQuestion.answers}
              selected={selected}
              onSelect={handleSelect}
            />
          </section>

          <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
            <p className="text-xs font-semibold uppercase text-slate-500">Session</p>
            <dl className="mt-4 space-y-4 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-500">Total soal</dt>
                <dd className="font-semibold text-slate-900">{questions.length}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-500">Sudah dijawab</dt>
                <dd className="font-semibold text-slate-900">{answeredCount}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-500">Belum dijawab</dt>
                <dd className="font-semibold text-slate-900">{questions.length - answeredCount}</dd>
              </div>
            </dl>
            <div className="mt-5 rounded-md bg-slate-50 p-4 text-sm leading-6 text-slate-600">
              Pilih satu jawaban. Setelah dipilih, kuis otomatis lanjut ke soal berikutnya.
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
