export default function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050507] text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/15 border-t-white/80" />
        <p className="text-sm text-slate-400">Memuat kuis...</p>
      </div>
    </div>
  )
}
