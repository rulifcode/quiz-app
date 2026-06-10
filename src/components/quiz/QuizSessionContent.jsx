import { useState } from "react"
import QuizHeader from "./QuizHeader"
import QuizProgress from "./QuizProgress"
import QuizQuestion from "./QuizQuestion"
import QuizOptions from "./QuizOptions"

export default function QuizSessionContent({
  answerQuestion,
  currentIndex,
  currentQuestion,
  isLastQuestion,
  questions,
  timeLeft,
}) {
  const [selected, setSelected] = useState(null)

  const handleNext = () => {
    if (!selected) return
    answerQuestion(selected)
  }

  return (
    <div className="min-h-screen bg-[#2f9df4] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-300 rounded-[2.5rem] bg-[#f8fbff] p-3 shadow-[0_28px_80px_rgba(16,80,150,0.16)] sm:p-4">
        <div className="rounded-4xl bg-[#f8fbff] text-slate-900">
          <QuizHeader />
          <main className="mx-auto max-w-5xl px-4 pb-10 pt-6 sm:px-6 lg:px-8 lg:pt-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
              <div>
                <QuizProgress current={currentIndex} total={questions.length} timeLeft={timeLeft} />
                <QuizQuestion question={currentQuestion.question} index={currentIndex} total={questions.length} />
                <QuizOptions
                  options={currentQuestion.answers}
                  selected={selected}
                  onSelect={setSelected}
                />
              </div>

              <aside className="rounded-4xl border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)] lg:sticky lg:top-6">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">Quiz flow</p>
                <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900">Keep your pace steady</h2>
                <p className="mt-3 text-sm leading-7 text-slate-500">
                  One question appears at a time so the focus stays on the answer, not on the interface.
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    ["Read the prompt", "Spend a few seconds on the question and type rhythm."],
                    ["Pick one answer", "Choose the option that feels most accurate."],
                    ["Move to the next", "Use the bottom button to continue or finish the quiz."],
                  ].map(([title, body], index) => (
                    <div key={title} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-sm font-bold text-slate-900">
                        {index + 1}. {title}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-500">{body}</p>
                    </div>
                  ))}
                </div>
              </aside>
            </div>

            <div className="mt-6 rounded-4xl border border-slate-200 bg-white px-5 py-4 shadow-[0_12px_30px_rgba(15,23,42,0.05)] sm:px-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-500">
                  Pilih jawaban untuk melanjutkan ke soal berikutnya.
                </p>
                <button
                  onClick={handleNext}
                  disabled={!selected}
                  className={`rounded-xl px-6 py-3 text-sm font-semibold transition-colors ${
                    selected ? "bg-[#2f9df4] text-white hover:bg-[#228fee]" : "cursor-not-allowed bg-slate-200 text-slate-400"
                  }`}
                >
                  {isLastQuestion ? "Finish Quiz" : "Next Question"}
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
