import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { QuizProvider } from "./context/QuizContext"
import ProtectedRoute from "./routes/ProtectedRoute"
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

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <QuizProvider>
          <AppRoutes />
        </QuizProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}