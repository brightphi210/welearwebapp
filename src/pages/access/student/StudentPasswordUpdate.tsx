import { useState } from 'react'
import StudentTopNavbar from './StudentTopNavbar'
import StudentSideBar from './StudentSideBar'
import { useNavigate } from 'react-router-dom'
import { FaChevronLeft } from 'react-icons/fa'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import { CustomizedButtonLoading, CustomizedButtonMain } from '@/Compnents/UI/CustomizedButton'
import useUpdatePassworld from '@/hooks/mutations/useUpdatePassworld'
import { useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'
import {StudentUpdateProps } from '@/APIs/api/studentPasswordUpdate'

interface ErrorResponse {
    response?: {
      data?: {
        old_password?: string[]
      }
    }
}

const StudentPasswordUpdate = () => {

      const [isOpened, setIsOpened] = useState(false)
      const toggleDrawer = () => setIsOpened(!isOpened)


      const [showPassword, setShowPassword] = useState(false)
      const navigate = useNavigate()

      const {mutate, isPending} = useUpdatePassworld()

      const {
        handleSubmit,
        register,
        formState: { errors }
      } = useForm<StudentUpdateProps>()

      const onSubmit = (formData: StudentUpdateProps) => {
        mutate(formData, {
          onSuccess: () => {
            toast.success("Password updated successfully")
          },
          onError: (error) => {
            const err = error as ErrorResponse
            console.log("Login failed:", err?.response?.data?.old_password)
            toast(err?.response?.data?.old_password?.[0] || "An error occurred")
            console.error(error)
          }
        })
      }

  return (
    <div>
        <div className="w-full">
            <StudentTopNavbar isOpened={isOpened} toggleDrawer={toggleDrawer}/>
            <StudentSideBar isOpened={isOpened}/>
            <ToastContainer theme="light" autoClose={4000} />

            <div className='pt-24 h-full w-full lg:px-16 2xl:pl-80 xl:pl-72 lg:pl-72 px-5 overflow-y-scroll'>
                <p onClick={() => navigate(-1)} className="cursor-pointer text-lg rounded-full p-2 bg-neutral-100 w-fit">
                    <FaChevronLeft />
                </p>
                <form action="" onSubmit={handleSubmit(onSubmit)} className='lg:!w-[50%] w-full'>
                    <h2 className='lg:text-3xl text-2xl pt-5 font-semibold pb-2'>Change Password</h2>
                    <p>Enter a new password for your Welearn account.</p>

                    <div className='flex flex-col gap-6 pt-5'>
                        <div>
                            <label className="text-sm pb-2">Current Password</label>
                            <div className='relative'>
                                <input 
                                    {...register('old_password', {required: true})}
                                    type={`${!showPassword ? 'password' : 'text'}`} 
                                    placeholder="Enter Current Password" 
                                    className="text-base py-6 input input-bordered w-full" 
                                />
            
                                <button onClick={()=>setShowPassword(!showPassword)} type='button' className='absolute right-0 text-xl top-0 p-4'>{showPassword ? 
                                    <p><IoMdEye /></p>: <p><IoMdEyeOff /></p>}
                                </button>
                                <p className='text-xs pt-2 text-red-500'>{errors.old_password && 'Old Password is Required'}</p>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm pb-2">New Password</label>
                            <div className='relative'>
                                <input 
                                    {...register('new_password', {required: true})}
                                    type={`${!showPassword ? 'password' : 'text'}`} 
                                    placeholder="Enter New Password" 
                                    className="text-base py-6 input input-bordered w-full" 
                                />
            
                                <button onClick={()=>setShowPassword(!showPassword)} type='button' className='absolute right-0 text-xl top-0 p-4'>{showPassword ? 
                                    <p><IoMdEye /></p>: <p><IoMdEyeOff /></p>}
                                </button>
                                <p className='text-xs pt-2 text-red-500'>{errors.new_password && 'New Password is Required'}</p>
                            </div>
                        </div>


                        <div>
                            <label className="text-sm pb-2">Confirm Password</label>
                            <div className='relative'>
                                <input 
                                    {...register('confirm_new_password', {required: true})}
                                    type={`${!showPassword ? 'password' : 'text'}`} 
                                    placeholder="Confirm Password" 
                                    className="text-base py-6 input input-bordered w-full" 
                                />
            
                                <button onClick={()=>setShowPassword(!showPassword)} type='button' className='absolute right-0 text-xl top-0 p-4'>{showPassword ? 
                                    <p><IoMdEye /></p>: <p><IoMdEyeOff /></p>}
                                </button>
                                <p className='text-xs pt-2 text-red-500'>{errors.confirm_new_password && 'Confirm Password is Required'}</p>
                            </div>
                        </div>

                        <div>
                            {isPending ? 
                                <CustomizedButtonLoading /> :
                                <CustomizedButtonMain text='Submit'/>
                            }
                        </div>

                    </div>

                </form>
            </div>
        </div>
    </div>
  )
}

export default StudentPasswordUpdate