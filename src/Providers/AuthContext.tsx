import React, { createContext, useContext, useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom"

export interface DecodedToken {
  exp: number
  iat: number
  name: string
  user_id: number
  email: string
  user_type: string
  profile_id: number
}

interface AuthContextType {
  decodedToken: DecodedToken | null
  setDecodedToken: (token: DecodedToken | null) => void
  handleLogout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null)
  const navigate = useNavigate()
  

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken")
    console.log("This is token", accessToken)

    if (accessToken) {
      try {
        const decoded = jwtDecode<DecodedToken>(accessToken)
        setDecodedToken(decoded)
        console.log("Decoded token:", decoded.profile_id)

      } catch (error) {
        console.error("Error decoding token:", error)
        localStorage.removeItem("accessToken")
        // navigate("/login")
      }
    } else {
      console.log("No token found")
      // navigate("/login/user")
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem("accessToken")
    setDecodedToken(null)
    navigate("/login")
  }

  return (
    <AuthContext.Provider value={{ decodedToken, handleLogout, setDecodedToken }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook for using AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
