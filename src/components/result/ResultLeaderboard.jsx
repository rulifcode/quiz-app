import { Trophy } from "lucide-react"

export default function ResultLeaderboard({ entries }) {
  const topEntries = entries.slice(0, 5)

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase text-slate-500">Leaderboard</p>
          <h2 className="mt-2 text-lg font-semibold text-slate-950">Top 5 pengguna</h2>
        </div>
        <Trophy className="h-5 w-5 text-sky-600" />
      </div>

      <div className="mt-4 divide-y divide-slate-100">
        {topEntries.length ? topEntries.map((entry, index) => (
          <div key={entry.id} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 text-sm font-semibold text-slate-700">
                {index + 1}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-950">{entry.displayName || "Quiz Player"}</p>
                <p className="text-xs text-slate-500">{entry.quizzesTaken || 0} attempt</p>
              </div>
            </div>
            <p className="text-sm font-semibold text-sky-700">{entry.totalScore || 0} pts</p>
          </div>
        )) : (
          <p className="text-sm text-slate-500">Belum ada data leaderboard.</p>
        )}
      </div>
    </section>
  )
}
