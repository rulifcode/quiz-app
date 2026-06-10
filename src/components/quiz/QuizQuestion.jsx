import { decodeHTML } from "../../utils/decode"

export default function QuizQuestion({ question, index, total }) {
  return (
    <div className="mx-0 rounded-4xl border border-slate-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)] sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Question</p>
          <span className="mt-2 block text-sm font-semibold text-slate-900">
            {index + 1} / {total}
          </span>
        </div>
        <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
          Multiple choice
        </div>
      </div>

      <p className="mb-2 text-xs uppercase tracking-[0.25em] text-slate-500">Question Text</p>
      <div className="min-h-18 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-relaxed text-slate-900">
        {decodeHTML(question)}
      </div>
    </div>
  )
}