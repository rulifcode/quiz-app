import { decodeHTML } from "../../utils/decode"

export default function ResultReview({ questions, answers }) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
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
              className={`p-4 rounded-xl border-2 ${
                isSkipped ? "border-gray-200 bg-gray-50" :
                isCorrect  ? "border-green-200 bg-green-50" :
                             "border-red-200 bg-red-50"
              }`}
            >
              <p className="text-sm font-medium text-gray-700 mb-2">
                {i + 1}. {decodeHTML(q.question)}
              </p>
              {!isSkipped && !isCorrect && (
                <p className="text-xs text-red-500 mb-1">
                  Jawabanmu: {decodeHTML(userAnswer)}
                </p>
              )}
              {isSkipped ? (
                <p className="text-xs text-gray-400">Dilewati</p>
              ) : (
                <p className="text-xs text-green-600 font-medium">
                  ✓ {decodeHTML(q.correct_answer)}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}