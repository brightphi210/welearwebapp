import useGetSingleInstructor from '@/hooks/queries/useGetSingleInstructor'
import {RiVerifiedBadgeFill } from 'react-icons/ri';
import { Link, useParams } from 'react-router-dom';
import StudentSideBar from './StudentSideBar';
import { useState } from 'react';
import Loading from '@/Compnents/UI/Loading';
import { FaChevronLeft } from "react-icons/fa6";
import { CustomizedButtonLoading, CustomizedButtonMain, CustomizedButtonOutline, CustomizedDisableButtonMain, CustomizedDisableButtonOutline } from '@/Compnents/UI/CustomizedButton';
import StudentTopNavbar from './StudentTopNavbar';
import { Modal } from '@brightcodeui/beta-ui';
import useHiringInstructor from '@/hooks/mutations/useHiringInstructor';
import { useForm } from 'react-hook-form';
import { HireProps } from '@/APIs/api/hireInstructor';
import { useAuth } from '@/Providers/AuthContext';
import { AiFillBank } from "react-icons/ai";
import { IoIosPerson } from 'react-icons/io';
import { PiPiggyBank } from "react-icons/pi";
import success from '../../../assets/success.png'
import { toast, ToastContainer } from 'react-toastify';


interface ErrorResponse {
  response?: {
    data?: {
      message?: string
    }
  }
}


const IndividualInstructor = () => {
  const params = useParams();
  const id = params.id;
  const {data, isLoading} = useGetSingleInstructor(Number(id))
  const individualInstructorData = data?.data
  const { decodedToken } = useAuth()

  const [isOpened, setIsOpened] = useState(false)
  const toggleDrawer = () => setIsOpened(!isOpened)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isReadyToPay, setIsReadyToPay] = useState(false);

  const {mutate, isPending} = useHiringInstructor()

  console.log('THis is class ID', individualInstructorData)

  const {
    register,
    handleSubmit,
    formState: { errors,isValid },
  } = useForm<HireProps>()

  const onSubmit = (formData: HireProps) => {
    formData.instructor = Number(id);
    formData.student = decodedToken?.profile_id;
    formData.class_booked = individualInstructorData?.classes[0]?.id;

    mutate(formData, {
      onSuccess: () => {
        setIsModalOpen(false)
        setIsModalOpen2(true)
      },
      onError: (error) => {
        const err = error as ErrorResponse
        console.log("Login failed:", err?.response?.data?.message)
        toast(err?.response?.data?.message || "An error occurred")
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

                  <div className='pt-8 space-y-4 w-full'>
                    <div className='flex justify-between'>
                      <h2 className='font-semibold text-sm'>Bio Data</h2>
                      <p className='text-lg text-green-600 font-semibold'>{individualInstructorData?.classes[0]?.price && <span> &#8358; {individualInstructorData?.classes[0]?.price} </span>}</p>
                    </div>
                    <p className='text-sm'>{individualInstructorData?.bio_data}</p>
                  </div>

                  <div className='pt-3 mt-3 border-t border-neutral-300'>
                    <div className='space-y-3 text-sm '>
                      <h2 className='font-semibold text-base'>Work Data</h2>
                      <ul className='space-y-3'>
                        <li className='text-neutral-500'>Trained: <span className='font-medium text-black'>{individualInstructorData?.number_of_trained_students || '0'} Users</span></li>
                        <li className='text-neutral-500'>Experience: <span className='font-medium text-black'>{individualInstructorData?.years_of_experience || '0'} Years</span></li>
                      </ul>
                    </div>

                    <div className='py-3 mt-3 border-y border-neutral-300'>
                      <h2 className='font-semibold text-base'>Location Data</h2>
                      <ul className='space-y-3 text-sm pt-3'>
                        <li className='text-neutral-500'>Location: <span className='font-medium text-black'>{individualInstructorData?.location || 'N/A'}</span></li>
                        <li className='text-neutral-500'>LGA: <span className='font-medium text-black'>{individualInstructorData?.LGA || 'N/A'}</span></li>
                        <li className='text-neutral-500'>State: <span className='font-medium text-black'>{individualInstructorData?.state || 'N/A'}</span></li>
                      </ul>
                    </div>
                  </div>

                  <div className='pt-10 lg:!w-[20%] w-full'>
                    {individualInstructorData?.classes.length > 0 ?
                      <CustomizedButtonMain text='Hire Me' onClick={()=>setIsModalOpen(true)}/> :
                      <p className='bg-blue-100 text-blue-300 p-3 text-sm text-center rounded-full px-6 cursor-not-allowed'>No assigned class yet</p>
                    }
                  </div>

                  <div>
                      <Modal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        title={`${!isReadyToPay ? 'Choose Class Days and Time' : 'Payment Details'}`}
                        className={`2xl:w-[40%] xl:w-[50%] lg:w-[60%] ${!isReadyToPay ? '2xl:h-[75%] xl:h-[90%] lg:h-[90%]' : 'h-fit'} 
                          h-fit overflow-y-scroll w-full text-sm lg:p-5 p-3 !rounded-3xl `
                        }
                      > 
                        <form action='' onSubmit={handleSubmit(onSubmit)} className="w-full">
                          {!isReadyToPay ?
                          <div className="space-y-4 pt-3">
                            <div>
                              <p className='pb-2'>Enter your location</p>
                              <input 
                                  type="text" placeholder="Enter your Location" 
                                  className=" text-sm py-5 input input-bordered !w-full" 
                                  {...register('location', {required: true})}
                              />
                              <p className='text-xs pt-2 text-red-400'>{errors.location && 'Location Required'}</p>

                            </div>

                            <p className='pt-4'>Chooses Days and Time</p>

                            <div className='grid grid-cols-2 gap-4'>
                              <div className="flex flex-col gap-2 relative">
                                  <div className="relative">
                                      <select 
                                          className="appearance-none bg-white outline-none focus:border focus:border-neutral-200 border border-neutral-300 w-full text-black p-3 rounded-md cursor-pointer"
                                          defaultValue=""
                                           {...register('dayone', {required: true})}
                                      >
                                      <option disabled value="">Day One</option>
                                      <option value="MONDAY">Monday</option>
                                      <option value="TUESDAY">Tuesday</option>
                                      <option value="WEDNESDAY">Wednesday</option>
                                      <option value="THURSDAY">Thursday</option>
                                      <option value="FRIDAY">Friday</option>
                                      </select>
                                      <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                      <svg
                                          className="w-4 h-4 text-black"
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                      >
                                          <path
                                          fillRule="evenodd"
                                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                          clipRule="evenodd"
                                          />
                                      </svg>
                                      </span>
                                  </div>
                                  <p className='text-xs pt-1 text-red-400'>{errors.dayone && 'Day One Required'}</p>

                              </div>

                              <div className="flex flex-col gap-2 relative">
                                  <div className="relative">
                                      <select 
                                          className="appearance-none bg-white outline-none focus:border focus:border-neutral-200 border border-neutral-300 w-full text-black p-3 rounded-md cursor-pointer"
                                          defaultValue=""
                                           {...register('timeone', {required: true})}
                                      >
                                      <option disabled value="">Time One</option>
                                      <option value="10am-12pm">10am-12pm</option>
                                      <option value="12pm-2pm">12pm-2pm</option>
                                      <option value="2pm-4pm">2pm-4pm</option>
                                      <option value="4pm-6pm">4pm-6pm</option>
                                      </select>
                                      <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                      <svg
                                          className="w-4 h-4 text-black"
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                      >
                                          <path
                                          fillRule="evenodd"
                                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                          clipRule="evenodd"
                                          />
                                      </svg>
                                      </span>
                                  </div>
                                  <p className='text-xs pt-1 text-red-400'>{errors.timeone && 'Time One Required'}</p>

                              </div>


                              <div className="flex flex-col gap-2 relative">
                                  <div className="relative">
                                      <select 
                                          className="appearance-none bg-white outline-none focus:border focus:border-neutral-200 border border-neutral-300 w-full text-black p-3 rounded-md cursor-pointer"
                                          defaultValue=""
                                           {...register('daytwo', {required: true})}
                                      >
                                      <option disabled value="">Day Two</option>
                                      <option value="MONDAY">Monday</option>
                                      <option value="TUESDAY">Tuesday</option>
                                      <option value="WEDNESDAY">Wednesday</option>
                                      <option value="THURSDAY">Thursday</option>
                                      <option value="FRIDAY">Friday</option>
                                      </select>
                                      <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                      <svg
                                          className="w-4 h-4 text-black"
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                      >
                                          <path
                                          fillRule="evenodd"
                                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                          clipRule="evenodd"
                                          />
                                      </svg>
                                      </span>
                                  </div>
                                  <p className='text-xs pt-1 text-red-400'>{errors.daytwo && 'Day Two Required'}</p>

                              </div>

                              <div className="flex flex-col gap-2 relative">
                                  <div className="relative">
                                      <select 
                                          className="appearance-none bg-white outline-none focus:border focus:border-neutral-200 border border-neutral-300 w-full text-black p-3 rounded-md cursor-pointer"
                                          defaultValue=""
                                           {...register('timetwo', {required: true})}
                                      >
                                      <option disabled value="">Time Two</option>
                                    <option value="10am-12pm">10am-12pm</option>
                                      <option value="12pm-2pm">12pm-2pm</option>
                                      <option value="2pm-4pm">2pm-4pm</option>
                                      <option value="4pm-6pm">4pm-6pm</option>
                                      </select>
                                      <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                      <svg
                                          className="w-4 h-4 text-black"
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                      >
                                          <path
                                          fillRule="evenodd"
                                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                          clipRule="evenodd"
                                          />
                                      </svg>
                                      </span>
                                  </div>
                                  <p className='text-xs pt-1 text-red-400'>{errors.timetwo && 'Time Two Required'}</p>

                              </div>

                              <div className="flex flex-col gap-2 relative">
                                  <div className="relative">
                                      <select 
                                          className="appearance-none bg-white outline-none focus:border focus:border-neutral-200 border border-neutral-300 w-full text-black p-3 rounded-md cursor-pointer"
                                          defaultValue=""
                                           {...register('daythree', {required: true})}
                                      >
                                      <option disabled value="">Day Three</option>
                                      <option value="MONDAY">Monday</option>
                                      <option value="TUESDAY">Tuesday</option>
                                      <option value="WEDNESDAY">Wednesday</option>
                                      <option value="THURSDAY">Thursday</option>
                                      <option value="FRIDAY">Friday</option>
                                      </select>
                                      <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                      <svg
                                          className="w-4 h-4 text-black"
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                      >
                                          <path
                                          fillRule="evenodd"
                                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                          clipRule="evenodd"
                                          />
                                      </svg>
                                      </span>
                                  </div>
                                  <p className='text-xs pt-1 text-red-400'>{errors.daythree && 'Day three Required'}</p>

                              </div>


                              <div className="flex flex-col gap-2 relative">
                                  <div className="relative">
                                      <select 
                                          className="appearance-none bg-white outline-none focus:border focus:border-neutral-200 border border-neutral-300 w-full text-black p-3 rounded-md cursor-pointer"
                                          defaultValue=""
                                           {...register('timethree', {required: true})}
                                           id='timethree'
                                      >
                                      <option disabled value="">Time Three</option>
                                      <option value="10am-12pm">10am-12pm</option>
                                      <option value="12pm-2pm">12pm-2pm</option>
                                      <option value="2pm-4pm">2pm-4pm</option>
                                      <option value="4pm-6pm">4pm-6pm</option>
                                      </select>
                                      <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                      <svg
                                          className="w-4 h-4 text-black"
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                      >
                                          <path
                                          fillRule="evenodd"
                                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                          clipRule="evenodd"
                                          />
                                      </svg>
                                      </span>
                                  </div>
                                  <p className='text-xs pt-1 text-red-400'>{errors.timethree && 'Time three Required'}</p>
                              </div>
                            </div>

                          </div> : 
                          <div>
                            <h2 className='text-base font-semibold'>Kindly Make your payment</h2>
                            <p className='text-sm text-gray-500'>Make payment to the account number below</p>
                            <div className='text-lg font-semibold py-8 space-y-3'>
                              <h2 className='flex items-center gap-3'><AiFillBank className='text-[#00C0EA] text-xl'/>First Bank</h2>
                              <h2 className='flex items-center gap-3'><PiPiggyBank  className='text-[#00C0EA] text-xl'/>2045372607</h2>
                              <h2 className='flex items-center gap-3'><IoIosPerson className='text-[#00C0EA] text-xl'/>Alex & Alex Educational <br className='block lg:hidden'/> Services ltd.</h2>
                            </div>
                            <div className='space-y-2'>
                              <p className='text-[#00C0EA] text-sm'>Note:</p>
                              <p className='text-base'>After you have made your payment, please send a screenshot to the whatsapp number</p>
                              <p className='text-base font-bold'>Whatsapp Number: <span className='myFont text-[#00C0EA]'>0813 1133 113</span></p>
                            </div>
                          </div>

                          }
                          <div className="flex lg:flex-row flex-col justify-center gap-2 pt-5">

                              {!isReadyToPay ? 
                              <>
                                <CustomizedDisableButtonOutline onClick={() => setIsModalOpen(false)} text="Cancel" />
                                  {isValid ?
                                    <CustomizedDisableButtonMain onClick={()=>setIsReadyToPay(true)} text="Proceed"/> :
                                    <CustomizedButtonMain text="Proceed" />
                                  }
                              </>
                              
                              :
                              <>
                                <CustomizedDisableButtonOutline onClick={() => setIsReadyToPay(false)} text="Back" />
                                {isPending ? <CustomizedButtonLoading text='Loading'/> :
                                  <CustomizedButtonMain text="I have Paid" />
                                }
                              </>
                              }
                          </div>
                        </form>
                      </Modal>

                      <Modal
                        isOpen={isModalOpen2}
                        onClose={() => setIsModalOpen2(false)}
                        title={`Class Booked 🚀🎉`}
                        className={`2xl:!w-[40%] xl:!w-[50%] lg:!w-[60%]  h-fit w-full text-sm lg:p-5 p-3 !rounded-3xl`}
                      >
                        <div>
                          <div className='w-40 flex m-auto justify-center'>
                            <img src={success} alt="" />
                          </div>

                          <div className='text-center'>
                            <h2 className='text-2xl font-semibold'>Class Booked!</h2>
                            <p className='text-base pt-3 text-gray-600'>Thank you for booking your class with us. We are excited to have you onboard.</p>
                            <div className='text-sm  text-center mt-5 bg-neutral-100 border-neutral-200 border p-4 rounded-lg'>
                              <p>Note: </p>
                              <p className='text-green-800 myFont text-xs'>We are verifying your payment,  class will be <br /> pending untill payment is verified</p>
                            </div>
                            <div className='flex justify-center gap-2 mt-8'>
                              <CustomizedButtonOutline onClick={() => setIsModalOpen2(false)} text="Close" />
                              <div className='w-full'>
                                <Link to={'/dashboard/student/all-hire-tutors'}>
                                  <CustomizedButtonMain onClick={() => setIsModalOpen2(false)} text="View Bookings" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
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

export default IndividualInstructor