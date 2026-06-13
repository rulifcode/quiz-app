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
    <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
      {stats.map(({ label, value }) => (
        <div key={label} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="text-xl font-semibold text-slate-950">{value}</div>
          <div className="mt-1 text-xs font-medium uppercase text-slate-500">{label}</div>
        </div>
      ))}
    </div>
  )
}
