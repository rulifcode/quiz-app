import LoginHeader from "./LoginHeader"
import LoginForm from "./LoginForm"

export default function LoginCard({ onLogin, isLoading }) {
  return (
    <div className="bg-white rounded-2xl p-10 w-full max-w-md shadow-2xl">
      <LoginHeader />
      <LoginForm onLogin={onLogin} isLoading={isLoading} />
    </div>
  )
}