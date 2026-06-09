import { getPoints, getHistory } from "../../utils/historyUtils"

const CARDS = [
  {
    label: "Total Quizzes",
    getValue: (history) => history.length,
    change: "+12.5%",
    positive: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
  },
  {
    label: "Active Events",
    getValue: () => 3,
    change: "+12.5%",
    positive: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    label: "Students",
    getValue: () => 2543,
    change: "+12.5%",
    positive: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    label: "Avg. Completion",
    getValue: (history) => {
      if (!history.length) return "0%"
      const avg = history.reduce((acc, h) => acc + (h.score / h.total) * 100, 0) / history.length
      return `${Math.round(avg)}%`
    },
    change: "-12.5%",
    positive: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
      </svg>
    ),
  },
]

export default function HomeStatsCards() {
  const history = getHistory()

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {CARDS.map((card) => (
        <div key={card.label} className="bg-[#1a1a2e] border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-400 text-xs">{card.label}</span>
            {card.icon}
          </div>
          <div className="flex items-end gap-2">
            <span className="text-white font-bold text-2xl">{card.getValue(history)}</span>
            <span className={`text-xs font-semibold mb-0.5 ${card.positive ? "text-green-400" : "text-red-400"}`}>
              {card.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}