import logoQuizzy from "../../assets/logo_quizzy.png"

export default function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="flex flex-col items-center gap-5">
        <img src={logoQuizzy} alt="Quizzy" className="h-20 w-auto object-contain" />
        <div className="h-1 w-28 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-slate-950" />
        </div>
      </div>
    </div>
  )
}
