import type React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import StudentHome from "../student/StudentHome"

interface DecodedToken {
  exp: number
  iat: number
  name: string
  user_id: string
  email: string
  user_type: string
  profile_id: number
}

const Dashboard: React.FC = () => {
  const handleLogout = () => {
    localStorage.removeItem("accessToken")
    navigate("/login")
  }

  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken")
    console.log("This is token", accessToken)

    if (accessToken) {
      try {
        const decoded = jwtDecode<DecodedToken>(accessToken)
        setDecodedToken(decoded)
        console.log("Decoded token:", decoded)
  
      } catch (error) {
        console.error("Error decoding token:", error)
        localStorage.removeItem("accessToken")
        navigate("/login")
      }
    } else {
      console.log("No token found")
      navigate("/login")
    }
  }, [navigate])

  if (!decodedToken) {
    return <div>Loading...</div>
  }
  return (
  <>
    {decodedToken?.user_type === 'Student' ? 
      <StudentHome /> : 
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard</h1>
        <p className="mb-4">You are now logged in.</p>
        <button
          onClick={handleLogout}
          className="py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Logout
        </button>
      </div>
    }
  </>
  )
}

export default Dashboard

