import { RiVerifiedBadgeFill } from "react-icons/ri"
import { useState } from "react"
import StudentSideBar from "./StudentSideBar"
import { useAuth } from "@/Providers/AuthContext"
import useGetSingleStudent from "@/hooks/queries/useGetSingleStudent"
import Loading from "@/Compnents/UI/Loading"
import { CustomizedButtonOutline } from "@/Compnents/UI/CustomizedButton"
import { Link } from "react-router-dom"
import StudentTopNavbar from "./StudentTopNavbar"
import NoData from "@/Compnents/UI/NoData"
import { GoDotFill } from "react-icons/go";



interface Instructor {
 
  instructor?: {
    id: string
    user?: {
      name: string
    }
    profile_pic?: string
    bio_data?: string
    occupation?: string
    is_verified : boolean
  }
  class_booked?: {
    class_name: string;
  }

  isPayed: string
}

const AllHiredTutors = () => {

  const [isOpened, setIsOpened] = useState(false)
  const toggleDrawer = () => setIsOpened(!isOpened)

  const {decodedToken} = useAuth()
  const {data, isLoading } = useGetSingleStudent(decodedToken?.profile_id ?? 0);
  const myHiredTutors = data?.data?.hiredInstructors

  return (
    <div className="relative w-full">
      {/* Top Navigation Bar */}
      <StudentTopNavbar isOpened={isOpened} toggleDrawer={toggleDrawer}/>
      <StudentSideBar isOpened={isOpened}/>

      {/* Content */}
      <div className="pt-24 h-full w-full lg:px-16 2xl:pl-80 xl:pl-72 lg:pl-72 px-5 overflow-y-scroll">
      {isLoading ? (
            <div className="pt-[10rem] flex justify-center items-center">
                <Loading />
            </div>
          ) : (

            <>
              {myHiredTutors.length > 0 ? (
                <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-5 pt-5">
                  {myHiredTutors.map((instructor: Instructor, index: number) => (
                    <div key={instructor?.instructor?.id || index} className="border-2 border-neutral-200 rounded-xl p-5 hover:bg-neutral-100">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <img
                            src={instructor?.instructor?.profile_pic || "/default-profile.jpg"}
                            className="object-cover w-full h-full"
                            alt="Instructor"
                          />
                        </div>
                        <div className="flex gap-3">
                          <div>
                              <h2 className="text-base font-semibold">{instructor?.instructor?.user?.name || "Unknown"}</h2>
                              <div className="flex items-center gap-2 pt-1">
                                <p className="text-xs text-neutral-700 font-semibold">{instructor?.class_booked?.class_name.toUpperCase() || "No Assigned Class"}</p>
                                <p className="text-xs text-neutral-500"><GoDotFill /></p>
                                <p className="text-xs text-[#00C0EA] font-semibold">{instructor?.isPayed === null ? <p className="text-yellow-500">Pending</p> : <p>Hired</p>}</p>
                              </div>
                          </div>

                          {instructor?.instructor?.is_verified && 
                              <p className="text-lg text-[#00C0EA]"><RiVerifiedBadgeFill /></p>
                          }
                        </div>
                      </div>
                      <div className="pt-3">
                          {instructor?.instructor?.bio_data ? 
                              <p className="text-sm pt-3 text-neutral-600">{instructor?.instructor?.bio_data.slice(0, 60)} {instructor?.instructor?.bio_data.length > 60 && '...'}</p> :
                              <p className="text-sm pt-3 text-neutral-600">No bio available</p> 
                          }
                      </div>

                      <div className="pt-8">
                        <Link to={`/dashboard/student/hired/tutor/${instructor?.instructor?.id}`}>
                          <CustomizedButtonOutline text="View Details" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div> 
              ) : (
                <div className="h-[70vh] justify-center items-center flex">
                  <NoData />
                </div>
              )}
              
            </>
          )}
      </div>
    </div>
  )
}

export default AllHiredTutors

