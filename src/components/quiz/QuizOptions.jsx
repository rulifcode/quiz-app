import { decodeHTML } from "../../utils/decode"

export default function QuizOptions({ disabled, options, selected, onSelect }) {
  return (
    <div className="p-5 sm:p-6">
      <p className="mb-4 text-xs font-semibold uppercase text-slate-500">Pilih jawaban</p>
      <div className="grid gap-3">
        {options.map((option, i) => {
          const isSelected = selected === option
          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelect(option)}
              disabled={disabled}
              className={`flex min-h-14 items-center gap-3 rounded-md border px-4 py-3 text-left text-sm font-medium transition-all ${
                isSelected
                  ? "border-sky-600 bg-sky-50 text-sky-950 ring-2 ring-sky-100"
                  : "border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:bg-sky-50/40"
              }`}
            >
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md border text-xs font-semibold ${
                isSelected ? "border-sky-600 bg-sky-600 text-white" : "border-slate-200 bg-slate-50 text-slate-500"
              }`}>
                {String.fromCharCode(65 + i)}
              </span>
              <span className="min-w-0 flex-1">{decodeHTML(option)}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
