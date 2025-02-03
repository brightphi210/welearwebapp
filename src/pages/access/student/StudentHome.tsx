import { CustomizedButtonOutline } from '@/Compnents/UI/CustomizedButton';
import StudentSideBar from './StudentSideBar'
import { profileImage } from '@/Compnents/images/imagePath'
import Loading from '@/Compnents/UI/Loading';
import useInstructorGet from '@/hooks/queries/useInstructorGet';
import { IoFilterSharp } from "react-icons/io5";

const StudentHome = () => {

    const {data, isLoading} = useInstructorGet()

    const myData = data?.data as [] | any

    console.log('This is are instructors data', data)
  return (
    <div className='flex relative'>
        <div>
            <StudentSideBar />
        </div>

        <div className='w-full  '>
            <div className='flex fixed pt-4 pb-4 w-full bg-white items-center justify-between border-b border-neutral-200 px-[5rem] pl-[23rem]'>
                <h2 className='text-[#00C0EA] text-lg font-semibold'>Welearn</h2>
                <div className='w-10 h-10'>
                    <img src={profileImage.porfileImg} alt="" />
                </div>
            </div>

            <div className='pt-28 h-full w-full px-[5rem] pl-[23rem] overflow-y-scroll'>
                <h2>Welcome Back, Kingsley</h2>

                <div className='flex items-center pt-3 justify-between w-full'>
                    <div className='w-full'>
                        <input 
                            type="email" placeholder="Search for tutor" 
                            className=" text-xs input input-bordered w-[40%]" 
                        />
                    </div>
                    <p className='text-lg cursor-pointer bg-neutral-100 p-3 rounded-full'><IoFilterSharp /></p>
                </div>


                {isLoading ?  
                    <Loading /> : 
                    <>   
                        {myData &&       
                        <div className='grid lg:grid-cols-4 grid-cols-1 gap-5 pt-5'>
                            {myData.map((instructorData)=>(
                                <div className='border border-neutral-200 rounded-lg p-5'>
                                    <div className='flex items-center gap-4'>
                                        <div className='w-10 h-10 rounded-full overflow-hidden'>
                                            <img src={instructorData?.profile_pic} className='object-cover w-full h-full' alt="" />
                                        </div>

                                        <div>
                                            <h2 className='text-sm'>{instructorData?.user?.name}</h2>
                                            <p className='text-xs'>{instructorData?.bio_data?.slice(1, 20)}...</p>
                                        </div>
                                    </div>

                                    <div className='pt-8'>
                                        <CustomizedButtonOutline text='View Details'/>
                                    </div>
                                </div>
                            ))}
                        </div>
                        }
                    </>

                }

            </div>
        </div>
    </div>
  )
}

export default StudentHome