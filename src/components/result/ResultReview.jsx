import { decodeHTML } from "../../utils/decode"

export default function ResultReview({ questions, answers }) {
  return (
    <div>
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
        Review Jawaban
      </h2>
      <div className="flex flex-col gap-3">
        {questions.map((q, i) => {
          const userAnswer = answers[i]
          const isCorrect = userAnswer === q.correct_answer
          const isSkipped = userAnswer === undefined

          return (
            <div
              key={q.id}
              className={`rounded-2xl border p-4 ${
                isSkipped ? "border-slate-200 bg-slate-50" :
                isCorrect  ? "border-emerald-200 bg-emerald-50" :
                             "border-rose-200 bg-rose-50"
              }`}
            >
              <p className="mb-2 text-sm font-semibold text-slate-900">
                {i + 1}. {decodeHTML(q.question)}
              </p>
              {!isSkipped && !isCorrect && (
                <p className="mb-1 text-xs font-medium text-rose-600">
                  Jawabanmu: {decodeHTML(userAnswer)}
                </p>
              )}
              {isSkipped ? (
                <p className="text-xs text-slate-500">Dilewati</p>
              ) : (
                <p className="text-xs font-medium text-emerald-700">
                  Benar: {decodeHTML(q.correct_answer)}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}