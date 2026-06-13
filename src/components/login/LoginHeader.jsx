import logoQuizzy from "../../assets/logo_quizzy.png"

export default function LoginHeader() {
  return (
    <div className="mb-8">
      <img src={logoQuizzy} alt="Quizzy" className="mb-6 h-16 w-auto object-contain" />
      <p className="text-sm font-semibold uppercase text-sky-700">Welcome back</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Masuk ke Quizzy</h1>
      <p className="mt-4 text-sm leading-7 text-slate-600">
        Gunakan akun Google untuk mulai kuis, menyimpan sesi, dan mencatat skor.
      </p>
    </div>
  )
}
