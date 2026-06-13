import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useToast } from "../context/ToastContext"
import LoginCard from "../components/login/LoginCard"
import LoginVisual from "../components/login/LoginVisual"

export default function LoginPage() {
  const { user, loginWithGoogle } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (user) navigate("/", { replace: true })
  }, [user, navigate])

  const handleLogin = async () => {
    setIsSubmitting(true)
    try {
      await loginWithGoogle()
      showToast({
        type: "success",
        title: "Login berhasil",
        message: "Selamat datang kembali di Quizzy.",
      })
      navigate("/", { replace: true })
    } catch (error) {
      console.error("Login gagal - LoginPage.jsx:25", error)
      showToast({
        type: "error",
        title: "Login gagal",
        message: "Coba masuk lagi dengan akun Google.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-6 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-6xl items-center gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <LoginCard onLogin={handleLogin} isLoading={isSubmitting} />
        <LoginVisual />
      </div>
    </div>
  )
}
