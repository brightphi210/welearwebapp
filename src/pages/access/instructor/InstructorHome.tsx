import { useAuth } from '@/Providers/AuthContext'
import InstructorTopNavbar from './InstructorTopNavbar'
import InstructorSideBar from './InstructorSideBar'
import { useState } from 'react'
import useGetSingleInstructor from '@/hooks/queries/useGetSingleInstructor'
import { MdHotelClass } from "react-icons/md";
import { PiWarningOctagon } from "react-icons/pi";
import NoData from '@/Compnents/UI/NoData'
import Loading from '@/Compnents/UI/Loading'
import { RiTimerLine } from "react-icons/ri";
import { CustomizedButtonOutline } from '@/Compnents/UI/CustomizedButton'
import { Link } from 'react-router-dom'


interface Instructor {
  id: string
  student: {
    user?: {
      name: string
      email?: string
    }
    id: number
    profile_pic?: string
  }
  class_booked: {
    duration: string
    class_name: string
  }

}

const InstructorHome = () => {
  const [isOpened, setIsOpened] = useState(false)
  const toggleDrawer = () => setIsOpened(!isOpened)

  const {decodedToken} = useAuth()
  const {data, isLoading } = useGetSingleInstructor(decodedToken?.profile_id ?? 0);
  const myData = data?.data
  console.log('This is instrutor data', myData);



  return (
    <div className="flex relative">
      <div className="w-full">
        <InstructorTopNavbar isOpened={isOpened} toggleDrawer={toggleDrawer}/>
        <InstructorSideBar isOpened={isOpened}/>

        <div className='pt-24 h-full w-full lg:px-16 2xl:pl-80 xl:pl-72 lg:pl-72 px-5'>
          <h2 className="text-base font-semibold">Welcome Back, {myData?.user?.name}</h2>

          <div className='pt-3'>
            <div className='p-5 bg-[#00C0EA] text-white rounded-xl'>
              <p className='text-sm'>Your Course Details</p>
              <h2 className='text-lg font-bold flex items-center gap-1'><MdHotelClass />{myData?.classes[0]?.class_name.toUpperCase() || 'N/A'}</h2>
              <div className='flex items-center pt-1 justify-between'>
                <p className='text-sm'>Price: N <span className='text-base font-bold'>{myData?.classes[0]?.price || 'N/A'}</span></p>
                <p className='text-sm'>All Bookings: <span className='text-lg font-bold'>{myData?.allBookings?.length}</span></p>
              </div>
            </div>

            {myData?.is_verified === false &&
              <div className='flex text-xs justify-between items-center p-3 rounded-xl mt-4 bg-[#F6B712] text-white'>
                  <div>
                    <h2 className='text-base font-bold'>Acount Verification Pending</h2>
                    <p className='font-semibold pt-1'>
                      
                      Proceed to our office at <br /> No 7 Trans-woji road Mercy mall Port harcourt
                    </p>
                  </div>
                  <p className='text-3xl'><PiWarningOctagon /></p>
              </div>
            }

            <div>
              {isLoading ? (
                <div className="pt-[10rem] flex justify-center items-center">
                    <Loading />
                </div>
              ) : (
                myData?.allBookings && myData?.allBookings?.length > 0 ? (
                  <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-5 pt-5 pb-10">
                    {myData?.allBookings.map((booking: Instructor, index: number) => (
                      <div key={booking?.student?.id || index} className="shadow-sm rounded-xl border border-neutral-200 p-5 hover:bg-neutral-100">
                        <div className="flex items-center gap-4 pb-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                            <img
                              src={booking?.student?.profile_pic || "/default-profile.jpg"}
                              className="object-cover w-full h-full"
                              alt="Instructor"
                            />
                          </div>
                          <div>
                              <h2 className="text-sm font-bold">{booking?.student?.user?.name || "Unknown"}</h2>
                              <h2 className="text-xs">{booking?.student?.user?.email || "Unknown"}</h2>
                          </div>
                          <div>
                          </div>
                        </div>

                        <div className='pt-5 flex flex-col gap-2'>
                          <h2 className='text-sm flex items-center gap-2'><RiTimerLine className='text-xl text-sky-500'/>{booking.class_booked?.duration}</h2>
                          <h2 className='font-semibold text-sm flex items-center gap-2'><MdHotelClass className='text-xl text-sky-500'/>{booking?.class_booked?.class_name.toUpperCase()}</h2>
                        </div>

                        <div className="pt-5">
                          <Link to={`/dashboard/instructor/tutor/${booking?.student?.id}`}>
                            <CustomizedButtonOutline text="View Details" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ): 
                <div className="justify-center flex-col items-center flex lg:pt-[10rem] pt-[6rem]">
                  <NoData />
                  <p className='pt-1 text-neutral-400 text-sm'>There is no student yet!</p>
                </div> 
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InstructorHome