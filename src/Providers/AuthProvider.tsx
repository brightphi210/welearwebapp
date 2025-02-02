import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import type React from "react"

interface AuthProps {
  children: React.ReactNode
}

const AuthProvider = ({ children }: AuthProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const isAuthenticated = localStorage.getItem("accessToken")
  const hasSeenWelcome = localStorage.getItem("hasSeenWelcome")

  useEffect(() => {
    if (location.pathname === "/") {
      if (!hasSeenWelcome) {
        navigate("/welcome", { replace: true })
      } else if (!isAuthenticated) {
        navigate("/login", { replace: true })
      } else {
        navigate("/dashboard", { replace: true })
      }
    }
  }, [isAuthenticated, hasSeenWelcome, navigate, location])

  return <>{children}</>
}

export default AuthProvider

