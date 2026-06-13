import { decodeHTML } from "../../utils/decode"

const formatLabel = (value) => {
  if (!value) return "-"
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export default function QuizQuestion({ category, difficulty, question, index, total, type }) {
  return (
    <div className="border-b border-slate-200 p-5 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase text-slate-500">Question {index + 1} / {total}</p>
          <p className="mt-2 text-sm text-slate-500">{decodeHTML(category)}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
            {formatLabel(type)}
          </span>
          <span className="rounded-md bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-700">
            {formatLabel(difficulty)}
          </span>
        </div>
      </div>

      <div className="mt-5 text-xl font-semibold leading-relaxed text-slate-950 sm:text-2xl">
        {decodeHTML(question)}
      </div>
    </div>
  )
}
