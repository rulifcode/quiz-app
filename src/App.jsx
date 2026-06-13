import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { QuizProvider } from "./context/QuizContext"
import { ToastProvider } from "./context/ToastContext"
import { useAuth } from "./context/AuthContext"
import ProtectedRoute from "./routes/ProtectedRoute"
import LoadingScreen from "./components/common/LoadingScreen"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import QuizPage from "./pages/QuizPage"
import ResultPage from "./pages/ResultPage"

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/quiz" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
      <Route path="/result" element={<ProtectedRoute><ResultPage /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function AppContent() {
  const { isLoading } = useAuth()
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setShowSplash(false), 1200)
    return () => window.clearTimeout(timer)
  }, [])

  if (showSplash || isLoading) return <LoadingScreen />

  return (
    <QuizProvider>
      <AppRoutes />
    </QuizProvider>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}
