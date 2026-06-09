import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import LoginHeader from "../components/login/LoginHeader"
import LoginCard from "../components/login/LoginCard"

export default function LoginPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate("/home")
  }, [user, navigate])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <LoginHeader />
      <LoginCard />
    </div>
  )
}