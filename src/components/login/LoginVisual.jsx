import { LOGIN_MEDIA } from "../../config/loginMedia"

export default function LoginVisual() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b1220] p-5 shadow-[0_24px_60px_rgba(15,23,42,0.28)] sm:p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(47,157,244,0.30),transparent_55%)]" />
      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/55">Visual preview</p>
        <h2 className="mt-3 text-2xl font-black tracking-tight text-white">Quiz flow dibuat lebih fokus dan rapi.</h2>
        <p className="mt-3 max-w-md text-sm leading-7 text-white/70">
          Area ini sengaja disiapkan sebagai slot gambar. Kamu cukup ganti file di assets, lalu update import di satu tempat.
        </p>

        <div className="mt-6 overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/5">
          <img
            src={LOGIN_MEDIA.image}
            alt="Quiz illustration"
            className="h-72 w-full object-cover sm:h-80"
          />
        </div>
      </div>
    </div>
  )
}
