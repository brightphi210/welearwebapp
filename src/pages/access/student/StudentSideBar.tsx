import React from 'react'

const StudentSideBar = () => {
  return (
    <div className='bg-neutral-100 p-10 h-screen fixed w-[20rem] z-30'>
        <ul className='space-y-5'>
            <li>Dashboard</li>
            <li>My Courses</li>
            <li>My Progress</li>
            <li>My Assignments</li>
            <li>My Grades</li>
            <li>My Profile</li>
            <li>Logout</li>
        </ul>
    </div>
  )
}

export default StudentSideBar