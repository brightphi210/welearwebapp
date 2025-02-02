import type React from "react"
import { useNavigate } from "react-router-dom"

const Dashboard: React.FC = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("accessToken")
    navigate("/login")
  }

  return (
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
  )
}

export default Dashboard

