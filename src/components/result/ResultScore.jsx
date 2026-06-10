export default function ResultScore({ correct, total }) {
  const percentage = total ? Math.round((correct / total) * 100) : 0

  const { label, tone } =
    percentage >= 80 ? { label: "Hasil sangat baik", tone: "text-emerald-300" } :
    percentage >= 60 ? { label: "Hasil baik", tone: "text-sky-300" } :
    percentage >= 40 ? { label: "Cukup", tone: "text-amber-300" } :
                       { label: "Perlu ditingkatkan", tone: "text-rose-300" }

  return (
    <div className="mb-6 rounded-4xl border border-slate-200 bg-slate-50 px-6 py-8 text-center">
      <div className={`text-5xl font-black tracking-tight ${tone}`}>{percentage}%</div>
      <p className="mt-3 text-sm font-semibold text-slate-900">{label}</p>
      <p className="mt-2 text-sm text-slate-500">
        {correct} benar dari {total} soal
      </p>
    </div>
  )
}