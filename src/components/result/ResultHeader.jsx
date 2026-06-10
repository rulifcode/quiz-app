export default function ResultHeader({ onRetry, onLogout }) {
  return (
    <div className="mb-6 flex flex-col gap-4 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Quiz complete</p>
        <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-900">Hasil Kuis</h1>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onRetry}
          className="rounded-xl bg-[#2f9df4] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#228fee]"
        >
          Ulangi
        </button>
        <button
          onClick={onLogout}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
        >
          Keluar
        </button>
      </div>
    </div>
  )
}