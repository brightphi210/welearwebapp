"use client"

import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import type React from "react"
import { DecodedToken, useAuth } from "./AuthContext"
import { jwtDecode } from "jwt-decode"

interface AuthProps {
  children: React.ReactNode
}


const AuthProvider = ({ children }: AuthProps) => {
  const { decodedToken, setDecodedToken } = useAuth() 
  const navigate = useNavigate()
  const location = useLocation()
  const isAuthenticated = localStorage.getItem("accessToken")
  const hasSeenWelcome = localStorage.getItem("hasSeenWelcome")

  useEffect(() => {
    const checkAndUpdateToken = () => {
      const accessToken = localStorage.getItem("accessToken")
      if (accessToken) {
        try {
          const decoded: DecodedToken = jwtDecode(accessToken)
          setDecodedToken(decoded)
        } catch (error) {
          console.error("Error decoding token:", error)
          localStorage.removeItem("accessToken")
          navigate("/login", { replace: true })
        }
      } else {
        setDecodedToken(null)
      }
    }

    checkAndUpdateToken()
  }, [setDecodedToken, navigate])

  useEffect(() => {
    if (location.pathname === "/") {
      if (!hasSeenWelcome) {
        navigate("/welcome", { replace: true })
      } else if (!isAuthenticated) {
        navigate("/login", { replace: true })
      } else if (hasSeenWelcome && isAuthenticated) {
        if (decodedToken?.user_type === "Student") {
          navigate("/dashboard/student", { replace: true })
        } else if (decodedToken?.user_type === "Instructor") {
          navigate("/dashboard/instructor", { replace: true })
        }
      }
    }
  }, [isAuthenticated, hasSeenWelcome, decodedToken, navigate, location])

  return <>{children}</>
}

export default AuthProvider

