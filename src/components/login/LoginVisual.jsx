import { LOGIN_MEDIA } from "../../config/loginMedia"

export default function LoginVisual() {
  return (
    <div className="relative hidden min-h-[560px] overflow-hidden rounded-lg border border-white/10 bg-slate-900 shadow-2xl shadow-slate-950/30 lg:block">
      <img
        src={LOGIN_MEDIA.image}
        alt="Quizzy login visual"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-slate-950/45" />
      <div className="absolute inset-x-0 bottom-0 p-8 text-white">
        <div className="max-w-md rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
          <p className="text-sm font-semibold uppercase text-sky-200">Open Trivia Database</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">Satu akun untuk mulai, lanjut, dan simpan skor.</h2>
          <p className="mt-3 text-sm leading-6 text-slate-200">
            Pilih kategori, tentukan level, lalu kerjakan sesi kuis tanpa kehilangan progres.
          </p>
        </div>
      </div>
    </div>
  )
}
