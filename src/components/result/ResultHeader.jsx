import { LogOut, RotateCcw } from "lucide-react"

export default function ResultHeader({ onRetry, onLogout }) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase text-sky-700">Quiz complete</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Hasil Kuis</h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            <RotateCcw size={16} />
            Ulangi
          </button>
          <button
            onClick={onLogout}
            className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            <LogOut size={16} />
            Keluar
          </button>
        </div>
      </div>
    </header>
  )
}
