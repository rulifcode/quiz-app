import { Trophy } from "lucide-react"

const formatRankLabel = (index) => {
  if (index === 0) return "#1"
  if (index === 1) return "#2"
  if (index === 2) return "#3"
  return `#${index + 1}`
}

const getInitials = (name) => {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return "QZ"
  return parts.slice(0, 2).map((part) => part[0]?.toUpperCase()).join("")
}

export default function ResultLeaderboard({ entries }) {
  const topEntries = entries.slice(0, 5)
  const maxScore = Math.max(...topEntries.map((entry) => Number(entry.totalScore) || 0), 1)

  return (
    <section className="rounded-4xl border border-slate-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)] sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">Leaderboard</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            Top 5 Nilai Tertinggi
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500">
            Skor diurutkan berdasarkan total nilai tertinggi dari pengguna yang sudah login.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 self-start rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-600">
          <Trophy className="h-4 w-4 text-[#2f9df4]" />
          Live ranking
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div className="space-y-3">
          {topEntries.length ? topEntries.map((entry, index) => {
            const score = Number(entry.totalScore) || 0
            const width = `${Math.max((score / maxScore) * 100, 10)}%`
            const name = entry.displayName || "Quiz Player"
            const scoreLabel = `${score} pts`

            return (
              <div key={entry.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#2f9df4] text-sm font-black text-white shadow-[0_10px_20px_rgba(47,157,244,0.25)]">
                    {getInitials(name)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                          {formatRankLabel(index)}
                        </p>
                        <h3 className="truncate text-base font-bold text-slate-900">{name}</h3>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-black tracking-tight text-slate-900">{scoreLabel}</p>
                        <p className="text-xs text-slate-500">{entry.quizzesTaken || 0} attempts</p>
                      </div>
                    </div>
                    <div className="mt-3 h-3 overflow-hidden rounded-full bg-white">
                      <div
                        className="h-full rounded-full bg-linear-to-r from-[#2f9df4] to-[#79c7ff]"
                        style={{ width }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          }) : (
            <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
              Belum ada data leaderboard yang tersimpan.
            </div>
          )}
        </div>

        <div className="rounded-[1.75rem] bg-[#2f9df4] p-5 text-white shadow-[0_16px_40px_rgba(47,157,244,0.22)]">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/75">Leaderboard Insight</p>
          <div className="mt-4 space-y-3 text-sm text-white/90">
            <div className="rounded-2xl bg-white/10 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.25em] text-white/70">Total pemain</p>
              <p className="mt-1 text-2xl font-black text-white">{entries.length}</p>
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.25em] text-white/70">Skor tertinggi</p>
              <p className="mt-1 text-2xl font-black text-white">{topEntries[0] ? Number(topEntries[0].totalScore) || 0 : 0}</p>
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.25em] text-white/70">Rata-rata attempt</p>
              <p className="mt-1 text-2xl font-black text-white">
                {entries.length
                  ? (entries.reduce((sum, entry) => sum + (Number(entry.quizzesTaken) || 0), 0) / entries.length).toFixed(1)
                  : "0.0"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}