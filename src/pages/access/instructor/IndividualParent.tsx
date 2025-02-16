import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import Loading from '@/Compnents/UI/Loading';
import { FaChevronLeft } from "react-icons/fa6";
import { CustomizedButtonLoading, CustomizedButtonMain, CustomizedDisableButtonOutline } from '@/Compnents/UI/CustomizedButton';
import InstructorTopNavbar from './InstructorTopNavbar';
import { Modal } from '@brightcodeui/beta-ui';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/Providers/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import useGetSingleStudent from '@/hooks/queries/useGetSingleStudent';
import { CgNotes } from "react-icons/cg";
import { formatDate } from '@/Compnents/DateFormater';
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { IoCheckmarkSharp } from "react-icons/io5";
import { VscEmptyWindow } from "react-icons/vsc";
import { RemarkProps } from '@/APIs/api/studentRemarks';
import InstructorSideBar from './InstructorSideBar';
import useGetSingleInstructor from '@/hooks/queries/useGetSingleInstructor';
import useGetInstructorRemarks from '@/hooks/queries/useGetInstructorRemarks';
import useInstructorRemarkPost from '@/hooks/mutations/useInstructorRemarkPost';



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

const IndividualParent = () => {

const navigate = useNavigate()

// =========== ID ===========
  const params = useParams();
  const id = params.id;

//   ========= PARENT DATA ==========
  const {data, isLoading} = useGetSingleStudent(Number(id))
  const individualStudentData = data?.data

//   console.log('This is instrutor data', individualStudentData);


//   ============ MODAL ============
  const [isOpened, setIsOpened] = useState(false)
  const toggleDrawer = () => setIsOpened(!isOpened)
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  //   ============= STUDENT DATA =========
  const { decodedToken } = useAuth();
  const { data: studentData } = useGetSingleInstructor(decodedToken?.profile_id ?? 0);
  const myData = studentData?.data;

  const classData = individualStudentData?.hiredInstructors?.find(
    (tutor: { instructor: { id: number } }) =>
      tutor.instructor.id === myData?.id
  );


  const {data: remarkData, isLoading: isLoadingRemarks} = useGetInstructorRemarks()
  const remarks: Remark[] = remarkData?.data || []
  const filteredRemarks = remarks.filter(
    (remark) =>
      remark.instructor === decodedToken?.profile_id &&
    individualStudentData?.id === remark?.student
  );
  

  const {mutate, isPending} = useInstructorRemarkPost()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RemarkProps>()

    const onSubmit = (formData: RemarkProps) => {
        formData.instructor = decodedToken?.profile_id;
        formData.student = individualStudentData?.id;
        formData.booked_clasd = Number(classData?.classes_booked?.id);
    
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


    console.log('This is the data', classData)

  return (
    <div>
      <div className='w-full'>
        <InstructorTopNavbar isOpened={isOpened} toggleDrawer={toggleDrawer}/>
        <InstructorSideBar isOpened={isOpened}/>
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
                          <img className='object-cover w-full h-full' src={individualStudentData?.profile_pic} alt="" />
                      </div>

                      <div className='flex gap-2'>
                        <div>
                          <h2 className="text-sm font-semibold">{individualStudentData?.user?.name}</h2>
                          <div className='flex items-center'>
                            <p className="text-xs text-neutral-500 pt-1">{individualStudentData?.user?.email}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className='ml-auto'>{classData?.isPayed === null ? <p className='text-yellow-400 text-sm'>Pending</p> : <p className='text-green-500 text-sm'>Active</p>}</p>
                  </div>

         
                  <div className='py-3 mt-3 border-b border-neutral-300'>

                    <div className=''>
                      <ul className='space-y-2 text-sm pt-3'>
                        <li className='text-neutral-600  text-sm'>Course: <span className='font-semibold text-green-700'>
                            {classData?.class_booked?.class_name.toUpperCase() || 'N/A'}</span>
                        </li>

                        <li className='text-neutral-600  text-sm'>Duration: <span className='font-semibold text-green-700'>
                            {classData?.class_booked?.duration.toUpperCase() || 'N/A'}</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className='py-3 mt-3 border-b border-neutral-300'>
                    <div className=''>
                      <h2 className='font-semibold text-base'>Days - Times</h2>
                      <ul className='space-y-3 text-sm pt-3'>
                        <li className='text-neutral-600 '>{classData?.dayone} <span className='text-base text-black font-semibold'>{classData?.timeone}</span></li>
                        <li className='text-neutral-600 '>{classData?.daytwo} <span className='text-base text-black font-semibold'>{classData?.timetwo}</span></li>
                        <li className='text-neutral-600 '>{classData?.daythree} <span className='text-base text-black font-semibold'>{classData?.timethree}</span></li>
                      </ul>
                    </div>
                  </div>

                  <div className='pt-5'>
                    {classData?.isPayed !== null ? 
                    <CustomizedButtonMain text='Check/Review' onClick={()=>setIsModalOpen(true)}/> :
                      <p className='bg-blue-100 text-blue-300 p-3 text-base font-semibold text-center rounded-full px-6 cursor-not-allowed'>Class not Approved</p>
                    }
                  </div>

                    {classData?.isPayed !== null &&<>
                    <div className='pt-10 pb-10'>
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
                                                <p className='text-sm font-semibold'>{myData?.user?.name}</p>
                                                <p className='flex items-center gap-2'>{remark.content} <MdOutlineTipsAndUpdates className='text-sky-500 text-base'/></p>
                                            </div>
                                        </div>
                                        <p className='ml-auto flex items-center gap-2 text-xs'>{formatDate(remark?.created_at)}<IoCheckmarkSharp className='text-sky-500'/></p>
                                        
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

export default IndividualParent