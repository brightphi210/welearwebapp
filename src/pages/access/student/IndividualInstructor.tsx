import useGetSingleInstructor from '@/hooks/queries/useGetSingleInstructor'
import {RiVerifiedBadgeFill } from 'react-icons/ri';
import { Link, useParams } from 'react-router-dom';
import StudentSideBar from './StudentSideBar';
import { useState } from 'react';
import Loading from '@/Compnents/UI/Loading';
import { FaChevronLeft } from "react-icons/fa6";
import { CustomizedButtonMain } from '@/Compnents/UI/CustomizedButton';
import StudentTopNavbar from './StudentTopNavbar';



const IndividualInstructor = () => {
    const params = useParams();
    const id = params.id;
    const {data, isLoading} = useGetSingleInstructor(Number(id))
    const individualInstructorData = data?.data

    const [isOpened, setIsOpened] = useState(false)
    const toggleDrawer = () => setIsOpened(!isOpened)


  return (
    <div>
      <div className='w-full'>
        
        <StudentTopNavbar isOpened={isOpened} toggleDrawer={toggleDrawer}/>
        <StudentSideBar isOpened={isOpened}/>


        {/* Content */}
        <div className="lg:pt-28 pt-24 h-full w-full lg:px-16 2xl:pl-80 xl:pl-72 lg:pl-72 px-5 overflow-y-scroll">
            <div>
              {isLoading? (
                <p><Loading /></p>
              ) : (
                <div>

                  <Link to={'/dashboard/student'}>
                  <div className='flex items-center gap-4 border-b border-neutral-200 hover:bg-neutral-50 rounded-sm lg:pb-5 pb-4 cursor-pointer'>
                    <p className='text-lg'><FaChevronLeft /></p>
                    <div className='flex items-center gap-2'>
                      <div className='flex justify-center overflow-hidden w-10 h-10 rounded-full'>
                          <img src={individualInstructorData?.profile_pic} alt="" />
                      </div>

                      <div className='flex gap-2'>
                        <div>
                          <h2 className="text-sm font-semibold">{individualInstructorData?.user?.name}</h2>
                          <div className='flex items-center'>
                            <p className="text-xs text-neutral-500 pt-1">{individualInstructorData?.classes[0]?.class_name.toUpperCase() || "No Assigned Class"}</p>
                          </div>
                        </div>

                        {individualInstructorData?.is_verified && 
                          <p className="text-lg text-[#00C0EA]"><RiVerifiedBadgeFill /></p>
                        }
                      </div>
                    </div>
                  </div>
                  </Link>

                  <div className='pt-8 space-y-4 lg:w-[50%] w-full'>
                    <div className='flex justify-between'>
                      <h2 className='font-semibold text-sm'>Bio Data</h2>
                      <p className='text-sm text-green-600 font-semibold'>{individualInstructorData?.classes[0]?.price && <span> &#8358; {individualInstructorData?.classes[0]?.price} </span>}</p>
                    </div>
                    <p className='text-sm'>{individualInstructorData?.bio_data}</p>
                  </div>

                  <div className='border border-neutral-300 p-5 mt-8 rounded-lg lg:w-[50%] w-full'>
                    <div className='space-y-4 text-xs border-b border-neutral-200 pb-8'>
                      <h2 className='font-semibold text-sm'>Work Data</h2>
                      <ul className='space-y-5'>
                        <li className='text-neutral-500'>Trained: <span className='font-medium text-black'>{individualInstructorData?.number_of_trained_students || '0'} Users</span></li>
                        <li className='text-neutral-500'>Experience: <span className='font-medium text-black'>{individualInstructorData?.years_of_experience || '0'} Years</span></li>
                      </ul>
                    </div>

                    <div className='pt-8 space-y-4 text-xs '>
                      <h2 className='font-semibold text-sm'>Location Data</h2>
                      <ul className='space-y-5'>
                        <li className='text-neutral-500'>Location: <span className='font-medium text-black'>{individualInstructorData?.location || 'N/A'}</span></li>
                        <li className='text-neutral-500'>LGA: <span className='font-medium text-black'>{individualInstructorData?.LGA || 'N/A'}</span></li>
                        <li className='text-neutral-500'>State: <span className='font-medium text-black'>{individualInstructorData?.state || 'N/A'}</span></li>
                      </ul>
                    </div>
                  </div>

                  <div className='pt-10 lg:w-[20%] w-full'>
                    <CustomizedButtonMain text='Hire Me'/>
                  </div>
                </div>
              )}
            </div>
        </div>
      </div>
    </div>
  )
}

export default IndividualInstructor