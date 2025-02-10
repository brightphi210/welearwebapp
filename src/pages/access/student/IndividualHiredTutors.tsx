import useGetSingleInstructor from '@/hooks/queries/useGetSingleInstructor'
import {RiVerifiedBadgeFill } from 'react-icons/ri';
import { useNavigate, useParams } from 'react-router-dom';
import StudentSideBar from './StudentSideBar';
import { useState } from 'react';
import Loading from '@/Compnents/UI/Loading';
import { FaChevronLeft } from "react-icons/fa6";
import { CustomizedButtonLoading, CustomizedButtonMain, CustomizedButtonOutline, CustomizedDisableButtonOutline } from '@/Compnents/UI/CustomizedButton';
import StudentTopNavbar from './StudentTopNavbar';
import { Modal } from '@brightcodeui/beta-ui';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/Providers/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import useGetStudentRemarks from '@/hooks/queries/useGetStudentRemarks';
import useGetSingleStudent from '@/hooks/queries/useGetSingleStudent';
import { CgNotes } from "react-icons/cg";
import { formatDate } from '@/Compnents/DateFormater';
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { IoCheckmarkSharp } from "react-icons/io5";
import { VscEmptyWindow } from "react-icons/vsc";
import usePostRemark from '@/hooks/mutations/usePostRemark';
import { RemarkProps } from '@/APIs/api/studentRemarks';
import { MdOutlinePendingActions } from "react-icons/md";
import { VscVmActive } from "react-icons/vsc";



interface ErrorResponse {
  response?: {
    data?: {
      message?: string
    }
  }
}


interface Remark {
    id: number;
    content: string;
    created_at: string;
    student: number;
    instructor: number;
    booked_clasd: number;
    admin_remark: string | null;
  }

const IndividualHiredTutors = () => {

const navigate = useNavigate()

// =========== ID ===========
  const params = useParams();
  const id = params.id;

//   ========= INSTRUCTOR DATA ==========
  const {data, isLoading} = useGetSingleInstructor(Number(id))
  const individualInstructorData = data?.data

//   ============ MODAL ============
  const [isOpened, setIsOpened] = useState(false)
  const toggleDrawer = () => setIsOpened(!isOpened)
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  
  const { decodedToken } = useAuth()
  //   ============ REMARK ===========
  const {data: remarkData, isLoading: isLoadingRemarks} = useGetStudentRemarks()
  const remarks: Remark[] = remarkData?.data || []
  const filteredRemarks = remarks.filter(
    (remark) =>
      remark.student === decodedToken?.profile_id &&
      individualInstructorData?.id === remark?.instructor
  );
  

//   ============= STUDENT DATA =========
  const { data: studentData, } = useGetSingleStudent(decodedToken?.profile_id ?? 0)
  const myData = studentData?.data

  console.log('THis my Instructor Data', individualInstructorData)
//   console.log('THis my my Data', myData)
//   console.log('THis is remark data', remarks)


  const {mutate, isPending} = usePostRemark()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RemarkProps>()

    const onSubmit = (formData: RemarkProps) => {
        formData.student = decodedToken?.profile_id;
        formData.instructor = individualInstructorData?.id;
        formData.booked_clasd = Number(individualInstructorData?.allBookings[0]?.classes_booked?.id);
    
        mutate(formData, {
            onSuccess: () => {
            setIsModalOpen(false)
            toast.success("Remark added successfully");
    
            },
            onError: (error) => {
            const err = error as ErrorResponse
            console.log("Login failed:", err?.response?.data?.message)
            toast(err?.response?.data?.message || "An error occurred")
            setIsModalOpen(false);
    
            },
        })
    }



  return (
    <div>
      <div className='w-full'>
        <StudentTopNavbar isOpened={isOpened} toggleDrawer={toggleDrawer}/>
        <StudentSideBar isOpened={isOpened}/>
        <ToastContainer theme='light' autoClose={7000}/>

        <div className="lg:pt-28 pt-24 h-full w-full lg:px-16 2xl:pl-80 xl:pl-72 lg:pl-72 px-5 overflow-y-scroll">
            <div>
              {isLoading? (
                <p><Loading /></p>
              ) : (
                <div>

                  <div onClick={()=>navigate(-1)} className='flex items-center gap-4 border-b border-neutral-200 hover:bg-neutral-50 rounded-sm lg:pb-5 pb-4 cursor-pointer'>
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

                  <div className='pt-8 space-y-2 w-full'>
                    <div className='flex justify-between'>
                      <h2 className='font-semibold text-sm'>Bio Data</h2>
                      {
                        individualInstructorData?.allBookings[0]?.isPayed === null ?
                        <p className='text-sm text-yellow-500 font-semibold flex items-center gap-1'><MdOutlinePendingActions className='text-base'/>Pending. .</p> :
                        <p className='text-sm text-green-600 font-semibold flex items-center gap-2'><VscVmActive className='text-base'/>Ongoing. .</p> 
                      }
                    </div>
                    <p className='text-sm'>{individualInstructorData?.bio_data}</p>
                    <p className='text-neutral-500'>Trained: <span className='font-medium text-black'>{individualInstructorData?.number_of_trained_students || '0'} Users</span></p>
                  </div>

                  <div className='py-3 mt-3 border-y border-neutral-300'>

                    <div className=''>
                      <h2 className='font-semibold text-base'>Class Data</h2>
                      <ul className='space-y-3 text-sm pt-3'>
                        <li className='text-neutral-600  text-base'>Course: <span className='font-semibold text-green-700'>
                            {individualInstructorData?.allBookings[0]?.class_booked?.class_name.toUpperCase() || 'N/A'}</span>
                        </li>

                        <li className='text-neutral-600  text-base'>Duration: <span className='font-semibold text-green-700'>
                            {individualInstructorData?.allBookings[0]?.class_booked?.duration.toUpperCase() || 'N/A'}</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className='pt-5 lg:!w-[50%] w-full'>
                    {individualInstructorData?.allBookings[0]?.isPayed !== null ?
                        <div className='flex items-center gap-3'>
                            <CustomizedButtonMain text='Check/Review' onClick={()=>setIsModalOpen(true)}/> 
                            <CustomizedButtonOutline text='View Schedule' onClick={()=>setIsModalOpen(true)}/> 
                        </div>:
                      <p className='bg-sky-300 text-sky-50 p-3 text-base text-center rounded-full px-6 cursor-not-allowed'>Payment not verified</p>
                    }
                  </div>

                    {individualInstructorData?.allBookings[0]?.isPayed !== null &&<>
                    <div className='pt-10'>
                        <h2 className='text-base font-semibold flex items-center gap-2'><CgNotes className='text-lg text-sky-500'/>Remarks</h2>

                        {isLoadingRemarks ?
                            <p><Loading /></p>: 
                            <div className='pt-5'>
                                {!isLoadingRemarks && filteredRemarks.length > 0  ? (
                                    filteredRemarks.map(remark => (
                                    <div key={remark.id} className="flex items-baseline text-sm pt-3 border-t border-neutral-200 mt-2 ">
                                        <div className='flex items-center gap-2'>
                                            <div className='w-10 h-10 overflow-hidden rounded-full'>
                                                <img src={myData?.profile_pic} alt="" className='w-full h-full object-cover '/>
                                            </div>
                                            <div>
                                                <p className='text-base font-semibold'>{myData?.user?.name}</p>
                                                <p className='flex items-center gap-2'>{remark.content} <MdOutlineTipsAndUpdates className='text-sky-500 text-base'/></p>
                                            </div>
                                        </div>
                                        <p className='ml-auto flex items-center gap-2 '>{formatDate(remark?.created_at)}<IoCheckmarkSharp className='text-sky-500'/></p>
                                        
                                    </div>
                                    ))
                                ) : (
                                    <div className='flex justify-center items-center pt-5 text-center'>
                                        <div>
                                            <p className='text-4xl text-sky-300 text-center flex justify-center m-auto'><VscEmptyWindow /></p>
                                            <p className='text-sm pt-2 text-neutral-500'>No remarks made!</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        }
                    </div>
                    </>}

                  <div>
                      <Modal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        title={`Daily Remark`}
                        className={`2xl:!w-[40%] xl:!w-[50%] lg:!w-[60%]  h-fit w-full text-sm lg:p-5 p-3 !rounded-3xl`}
                      >
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label className="text-xs pb-2 block">Enter Remark</label>
                                <input
                                    {...register("content", { required: "Remark is required" })}
                                    type="text"
                                    placeholder="Enter Remark"
                                    className="text-sm py-2 input input-bordered border border-neutral-300 w-full"
                                />
                                {errors.content && <p className="text-red-500 text-xs pt-2">{errors.content.message}</p>}
                            </div>

                            <div className='flex justify-center gap-2 mt-8'>
                                <CustomizedDisableButtonOutline onClick={() => setIsModalOpen(false)} text="Close" />
                                
                                {isPending ? 
                                    <CustomizedButtonLoading text='Loading' /> :
                                    <CustomizedButtonMain text="Submit" />
                                }
                            </div>
                              

                        </form>
                      </Modal>
                  </div>
                </div>
              )}
            </div>
        </div>
      </div>
    </div>
  )
}

export default IndividualHiredTutors