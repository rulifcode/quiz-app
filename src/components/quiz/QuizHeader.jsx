import { ChevronLeft, TimerReset } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function QuizHeader() {
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-slate-700 transition-colors hover:bg-slate-50"
            aria-label="Kembali ke beranda"
          >
            <ChevronLeft size={18} />
          </button>
          <div>
            <h1 className="text-base font-semibold tracking-tight text-slate-950 sm:text-lg">Quiz Session</h1>
            <p className="text-xs text-slate-500">Sesi tersimpan otomatis di browser.</p>
          </div>
        </div>

        <div className="hidden items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 sm:flex">
          <TimerReset size={16} className="text-sky-600" />
          One question mode
        </div>
      </div>
    </header>
  )
}
