import type React from "react"
import { profileImage } from "@/Compnents/images/imagePath"
import { IoMdClose } from "react-icons/io"
import { RiMenu2Fill } from "react-icons/ri"
import { useState } from "react"
import StudentSideBar from "./StudentSideBar"


const AllHiredTutors = () => {

   const [isOpened, setIsOpened] = useState(false)
  
    const toggleDrawer = () => setIsOpened(!isOpened)

  return (
    <div className="relative w-full">
      {/* Top Navigation Bar */}
      <div className="flex fixed pt-3 pb-3 w-full z-50 bg-white items-center justify-between border-b border-neutral-200 lg:px-10 px-5">
        <div className="flex gap-5 items-center">
          <div className="lg:hidden block" onClick={toggleDrawer}>
            {!isOpened ? (
              <p className="text-xl bg-neutral-100 p-2.5 rounded-full">
                <RiMenu2Fill />
              </p>
            ) : (
              <p className="text-xl bg-neutral-100 p-2.5 rounded-full">
                <IoMdClose />
              </p>
            )}
          </div>
          <h2 className="text-[#00C0EA] text-lg font-semibold">Welearn</h2>
        </div>
        <div className="w-10 h-10">
          <img src={profileImage?.porfileImg || "/placeholder.svg"} alt="Profile" />
        </div>
      </div>

      <StudentSideBar isOpened={isOpened}/>

      {/* Content */}
      <div className="pt-24 h-full w-full lg:px-20 lg:pl-96 px-5 overflow-y-scroll">
        <h1 className="text-2xl font-bold">All Hired Tutors</h1>
        {/* Add your AllHiredTutors content here */}
      </div>
    </div>
  )
}

export default AllHiredTutors

