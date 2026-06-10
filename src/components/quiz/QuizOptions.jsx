import { decodeHTML } from "../../utils/decode"

export default function QuizOptions({ options, selected, onSelect }) {
  return (
    <div className="mt-4 rounded-4xl border border-slate-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)] sm:p-6">
      <p className="mb-4 text-xs uppercase tracking-[0.25em] text-slate-500">Answer options</p>
      <div className="flex flex-col gap-3">
        {options.map((option, i) => {
          const isSelected = selected === option
          return (
            <button
              key={i}
              onClick={() => onSelect(option)}
              className={`flex items-center gap-3 rounded-2xl border px-4 py-4 text-left text-sm transition-all ${
                isSelected
                  ? "border-[#2f9df4] bg-[#2f9df4]/8 text-slate-900 shadow-[0_10px_24px_rgba(47,157,244,0.10)]"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-white"
              }`}
            >
              <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                isSelected ? "border-[#2f9df4]" : "border-slate-300"
              }`}>
                {isSelected && (
                  <div className="h-2.5 w-2.5 rounded-full bg-[#2f9df4]" />
                )}
              </div>
              {decodeHTML(option)}
            </button>
          )
        })}
      </div>
    </div>
  )
}