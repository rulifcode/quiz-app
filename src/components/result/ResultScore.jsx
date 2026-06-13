export default function ResultScore({ correct, total }) {
  const percentage = total ? Math.round((correct / total) * 100) : 0

  const { label, tone } =
    percentage >= 80 ? { label: "Hasil sangat baik", tone: "text-emerald-600" } :
    percentage >= 60 ? { label: "Hasil baik", tone: "text-sky-600" } :
    percentage >= 40 ? { label: "Cukup", tone: "text-amber-600" } :
                       { label: "Perlu ditingkatkan", tone: "text-rose-600" }

  return (
    <div className="mb-6">
      <p className="text-xs font-semibold uppercase text-slate-500">Skor akhir</p>
      <div className="mt-3 flex items-end gap-3">
        <div className={`text-6xl font-semibold tracking-tight ${tone}`}>{percentage}%</div>
        <div className="pb-2">
          <p className="text-sm font-semibold text-slate-950">{label}</p>
          <p className="mt-1 text-sm text-slate-500">{correct} benar dari {total} soal</p>
        </div>
      </div>
    </div>
  )
}
