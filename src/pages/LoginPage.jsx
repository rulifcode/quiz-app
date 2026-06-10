import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import LoginHeader from "../components/login/LoginHeader"
import LoginCard from "../components/login/LoginCard"

export default function LoginPage() {
  const { user, loginWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (user) navigate("/", { replace: true })
  }, [user, navigate])

  const handleLogin = async () => {
    setIsSubmitting(true)
    try {
      await loginWithGoogle()
      navigate("/", { replace: true })
    } catch (error) {
      console.error("Login gagal - LoginPage.jsx:25", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#050507] px-4 text-white">
      <LoginHeader />
      <LoginCard onLogin={handleLogin} isLoading={isSubmitting} />
    </div>
  )
}