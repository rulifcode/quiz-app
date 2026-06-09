import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import LoadingScreen from "../components/common/LoadingScreen"

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth()
  if (isLoading) return <LoadingScreen />
  return user ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute