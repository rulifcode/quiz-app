export default function ResultStats({ correct, wrong, skipped, timeUsed }) {
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return m > 0 ? `${m}m ${s}s` : `${s}s`
  }

  const stats = [
    { label: "Dijawab", value: correct + wrong, color: "text-indigo-500", bg: "bg-indigo-50" },
    { label: "Benar", value: correct, color: "text-green-500", bg: "bg-green-50" },
    { label: "Salah", value: wrong, color: "text-red-500", bg: "bg-red-50" },
    { label: "Dilewati", value: skipped, color: "text-gray-400", bg: "bg-gray-50" },
    { label: "Waktu", value: formatTime(timeUsed), color: "text-purple-500", bg: "bg-purple-50" },
  ]

  return (
    <div className="grid grid-cols-5 gap-3 mb-6">
      {stats.map(({ label, value, color, bg }) => (
        <div key={label} className={`${bg} rounded-xl p-3 text-center`}>
          <div className={`text-xl font-bold ${color}`}>{value}</div>
          <div className="text-xs text-gray-400 mt-0.5">{label}</div>
        </div>
      ))}
    </div>
  )
}