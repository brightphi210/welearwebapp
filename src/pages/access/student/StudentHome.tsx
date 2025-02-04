import { CustomizedButtonOutline } from "@/Compnents/UI/CustomizedButton"
import { profileImage } from "@/Compnents/images/imagePath"
import Loading from "@/Compnents/UI/Loading"
import useInstructorGet from "@/hooks/queries/useInstructorGet"
import { IoFilterSharp } from "react-icons/io5"
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { RiMenu2Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom"
import StudentSideBar from "./StudentSideBar"
import { useState } from "react"
import useGetSingleStudent from "@/hooks/queries/useGetSingleStudent"
import { useAuth } from "@/Providers/AuthContext"


interface Instructor {
  id: string
  user?: {
    name: string
  }
  profile_pic?: string
  bio_data?: string
  occupation?: string
  is_verified : boolean
}


const StudentHome = () => {

  const {decodedToken} = useAuth()
  const { data, isLoading } = useInstructorGet()
  const instructors: Instructor[] = data?.data || []
  const {data: myData } = useGetSingleStudent(decodedToken?.profile_id ?? 0);

  console.log('This is user details', myData);

  const [isOpened, setIsOpened] = useState(false)
  const toggleDrawer = () => setIsOpened(!isOpened)

  return (
    <div className="flex relative">
      <div className="w-full">
        {/* Top Navigation Bar */}
        <div className="flex fixed pt-3 pb-3 w-full z-50 bg-white items-center justify-between border-b border-neutral-200 lg:px-10  px-5">
            <div className="flex gap-5 items-center">

                <div className="lg:hidden block " onClick={toggleDrawer}>
                    {!isOpened ? 
                        <p className="text-xl bg-neutral-100 p-2.5 rounded-full" ><RiMenu2Fill /></p> : 
                        <p className="text-xl bg-neutral-100 p-2.5 rounded-full"><IoMdClose /></p>
                    }
                </div>

                <h2 className="text-[#00C0EA] text-lg font-semibold">Welearn</h2>
            </div>
          <div className="w-10 h-10">
            <img src={profileImage?.porfileImg || "/placeholder.svg"} alt="Profile" />
          </div>
        </div>

        <StudentSideBar isOpened={isOpened}/>


        {/* Main Content */}
        <div className="pt-24 h-full w-full lg:px-20 lg:pl-96 px-5 overflow-y-scroll">
          <h2 className="text-xl font-semibold">Welcome Back, {myData?.data?.user?.name}</h2>

          {/* Search Bar & Filter */}
          <div className="flex items-center pt-3 justify-between w-full">
            <input type="text" placeholder="Search for tutor" className="text-xs input input-bordered lg:w-2/5 w-[80%]" />
            <p className="text-lg cursor-pointer bg-neutral-100 p-3 rounded-full">
              <IoFilterSharp />
            </p>
          </div>

          {/* Instructor List */}
          {isLoading ? (
            <div className="pt-[10rem] flex justify-center items-center">
                <Loading />
            </div>
          ) : (
            instructors.length > 0 && (
              <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-5 pt-5">
                {instructors.map((instructor: Instructor, index: number) => (
                  <div key={instructor.id || index} className="border border-neutral-200 rounded-lg p-5 hover:bg-neutral-100">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img
                          src={instructor?.profile_pic || "/default-profile.jpg"}
                          className="object-cover w-full h-full"
                          alt="Instructor"
                        />
                      </div>
                      <div className="flex gap-3">
                        <div>
                            <h2 className="text-sm font-semibold">{instructor?.user?.name || "Unknown"}</h2>
                            <p className="text-xs text-neutral-400">{instructor?.occupation || "Empty"}</p>
                        </div>

                        {instructor?.is_verified && 
                            <p className="text-lg text-[#00C0EA]"><RiVerifiedBadgeFill /></p>
                        }
                      </div>
                    </div>
                    <div>
                        {instructor?.bio_data ? 
                            <p className="text-xs pt-3 text-neutral-600">{instructor?.bio_data.slice(0, 60)} {instructor?.bio_data.length > 60 && '...'}</p> :
                            <p className="text-xs pt-3 text-neutral-600">No bio available</p> 
                        }
                    </div>

                    <div className="pt-8">
                      <Link to={`/dashboard/student/tutor/${instructor?.id}`}>
                        <CustomizedButtonOutline text="View Details" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default StudentHome

