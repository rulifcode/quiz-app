import LoginHeader from "./LoginHeader"
import LoginForm from "./LoginForm"

export default function LoginCard({ onLogin, isLoading }) {
  return (
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0f0f1a] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-10">
      <LoginHeader />
      <LoginForm onLogin={onLogin} isLoading={isLoading} />
    </div>
  )
}