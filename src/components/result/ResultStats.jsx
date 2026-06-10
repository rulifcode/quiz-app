export default function ResultStats({ correct, wrong, skipped, timeUsed }) {
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return m > 0 ? `${m}m ${s}s` : `${s}s`
  }

  const stats = [
    { label: "Dijawab", value: correct + wrong },
    { label: "Benar", value: correct },
    { label: "Salah", value: wrong },
    { label: "Dilewati", value: skipped },
    { label: "Waktu", value: formatTime(timeUsed) },
  ]

  return (
    <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-5">
      {stats.map(({ label, value }) => (
        <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4 text-center">
          <div className="text-xl font-black text-slate-900">{value}</div>
          <div className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">{label}</div>
        </div>
      ))}
    </div>
  )
}