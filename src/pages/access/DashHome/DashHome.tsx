import type React from "react"
import { useState } from "react"
import { useLocation } from "react-router-dom"
import { useAuth } from "@/Providers/AuthContext"
import StudentHome from "../student/StudentHome"
import AllHiredTutors from "../student/AllHiredTutors"
import StudentSideBar from "../student/StudentSideBar"

const Dashboard: React.FC = () => {
  const { decodedToken, handleLogout } = useAuth()
  const location = useLocation()
  

  if (!decodedToken) {
    return <div>Loading...</div>
  }

  if (decodedToken?.user_type !== "Student") {
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

  return (
    <div className="flex">
      <StudentSideBar isOpened={isOpened} />
      <div className="flex-1">
        {location.pathname === "/dashboard/user" && <StudentHome toggleDrawer={toggleDrawer} isOpened={isOpened} />}
        {location.pathname === "/all-hire-tutors" && <AllHiredTutors toggleDrawer={toggleDrawer} isOpened={isOpened} />}
      </div>
    </div>
  )
}

export default Dashboard

