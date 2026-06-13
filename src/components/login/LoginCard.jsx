import LoginHeader from "./LoginHeader"
import LoginForm from "./LoginForm"

export default function LoginCard({ onLogin, isLoading }) {
  return (
    <div className="w-full rounded-lg border border-white/10 bg-white p-6 shadow-2xl shadow-slate-950/30 sm:p-8 lg:p-10">
      <LoginHeader />
      <LoginForm onLogin={onLogin} isLoading={isLoading} />
      <p className="mt-5 text-xs leading-5 text-slate-500">
        Sesi aktif disimpan di localStorage browser agar kuis bisa dilanjutkan setelah tab ditutup.
      </p>
    </div>
  )
}
