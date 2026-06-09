export default function ResultScore({ correct, total }) {
  const percentage = Math.round((correct / total) * 100)

  const { emoji, label, color } =
    percentage >= 80 ? { emoji: "🏆", label: "Luar Biasa!", color: "text-green-500" } :
    percentage >= 60 ? { emoji: "👍", label: "Bagus!", color: "text-blue-500" } :
    percentage >= 40 ? { emoji: "😅", label: "Lumayan", color: "text-yellow-500" } :
                       { emoji: "💪", label: "Ayo semangat!", color: "text-red-500" }

  return (
    <div className="text-center py-8 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl mb-6">
      <div className="text-5xl mb-2">{emoji}</div>
      <div className={`text-5xl font-bold mb-1 ${color}`}>{percentage}%</div>
      <p className="text-gray-500 font-medium">{label}</p>
      <p className="text-sm text-gray-400 mt-1">
        {correct} benar dari {total} soal
      </p>
    </div>
  )
}