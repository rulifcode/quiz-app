import { decodeHTML } from "../../utils/decode"

export default function QuizOptions({ options, selected, onSelect }) {
  return (
    <div className="mx-5 mt-4 bg-[#1a1a2e]/60 border border-white/10 rounded-2xl p-5">
      <p className="text-gray-400 text-xs mb-4">Answer Options</p>
      <div className="flex flex-col gap-3">
        {options.map((option, i) => {
          const isSelected = selected === option
          return (
            <button
              key={i}
              onClick={() => onSelect(option)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm text-left transition-all ${
                isSelected
                  ? "border-purple-500 bg-purple-500/10 text-white"
                  : "border-white/10 bg-[#0f0f1a] text-gray-300 hover:border-white/30"
              }`}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                isSelected ? "border-purple-500" : "border-gray-600"
              }`}>
                {isSelected && (
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />
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