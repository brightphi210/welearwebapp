import { profileImage } from '@/Compnents/images/imagePath';
import useGetSingleInstructor from '@/hooks/queries/useGetSingleInstructor'
import { IoMdClose } from 'react-icons/io';
import { RiMenu2Fill, RiVerifiedBadgeFill } from 'react-icons/ri';
import { Link, useParams } from 'react-router-dom';
import StudentSideBar from './StudentSideBar';
import { useState } from 'react';
import Loading from '@/Compnents/UI/Loading';
import { FaChevronLeft } from "react-icons/fa6";
import { CustomizedButtonMain } from '@/Compnents/UI/CustomizedButton';


const IndividualInstructor = () => {
    const params = useParams();
    const id = params.id;
    const {data, isLoading} = useGetSingleInstructor(id)
    const individualInstructorData = data?.data

    const [isOpened, setIsOpened] = useState(false)
    const toggleDrawer = () => setIsOpened(!isOpened)


  console.log('This is Individual data', individualInstructorData, id)


  return (
    <div>
      <div className='w-full'>
        
        {/* Top Navigation Bar */}
        <div className="lg:flex hidden fixed pt-3 pb-3 w-full z-50 bg-white items-center justify-between border-b border-neutral-200 lg:px-10 px-5">
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
        <div className="lg:pt-24 pt-8 h-full w-full lg:px-20 lg:pl-96 px-5 overflow-y-scroll">
            <div>
              {isLoading? (
                <p><Loading /></p>
              ) : (
                <div>

                  <Link to={'/dashboard/student'}>
                  <div className='flex items-center gap-4 border-b border-neutral-200 lg:pb-5 pb-4 cursor-pointer'>
                    <p className='text-xl'><FaChevronLeft /></p>
                    <div className='flex items-center gap-2'>
                      <div className='flex justify-center overflow-hidden w-10 h-10 rounded-full'>
                          <img src={individualInstructorData?.profile_pic} alt="" />
                      </div>

                      <div className='flex gap-2'>
                        <div>
                          <h2 className="text-sm font-semibold">{individualInstructorData?.user?.name}</h2>
                          <p className='text-xs text-neutral-400'>{individualInstructorData?.occupation || 'Empty'}</p>
                        </div>

                        {individualInstructorData?.is_verified && 
                          <p className="text-lg text-[#00C0EA]"><RiVerifiedBadgeFill /></p>
                        }
                      </div>
                    </div>
                  </div>
                  </Link>

                  <div className='pt-8 space-y-4'>
                    <h2 className='font-semibold text-base'>Bio Data</h2>
                    <p className='text-sm'>{individualInstructorData?.bio_data}</p>
                  </div>

                  <div className='pt-8 space-y-4 text-sm '>
                    <h2 className='font-semibold text-base'>Work Data</h2>
                    <ul className='space-y-3'>
                      <li className='text-neutral-500'>Trained: <span className='font-semibold text-black'>{individualInstructorData?.number_of_trained_students || '0'} Users</span></li>
                      <li className='text-neutral-500'>Experience: <span className='font-semibold text-black'>{individualInstructorData?.years_of_experience || '0'} Years</span></li>
                    </ul>
                  </div>

                  <div className='pt-8 space-y-4 text-sm '>
                    <h2 className='font-semibold text-base'>Location Data</h2>
                    <ul className='space-y-3'>
                      <li className='text-neutral-500'>Location: <span className='font-medium text-black'>{individualInstructorData?.location || 'N/A'}</span></li>
                      <li className='text-neutral-500'>LGA: <span className='font-medium text-black'>{individualInstructorData?.LGA || 'N/A'}</span></li>
                      <li className='text-neutral-500'>State: <span className='font-medium text-black'>{individualInstructorData?.state || 'N/A'}</span></li>
                    </ul>
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