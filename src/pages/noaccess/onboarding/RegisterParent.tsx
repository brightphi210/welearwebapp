
import { CustomizedButtonLoading, CustomizedButtonMain } from '@/Compnents/UI/CustomizedButton'
import { useState } from 'react'
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { regitserProps } from '@/APIs/api/signup'
import useRegister from '@/hooks/mutations/useRegister'

interface ErrorResponse {
    response?: {
      data?: {
        message?: string
      }
    }
}


const RegisterParent = () => {

    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const {isPending, mutate} = useRegister()

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<regitserProps>()

    const onSubmit = (data: regitserProps) => {
      data.user_type = 'Student'
        mutate(data, {
          onSuccess: (details) => {
            console.log("This is data", details?.data?.access)
            navigate("/login/user", { replace: true })
          },
          onError: (error) => {
            const err = error as ErrorResponse
            console.log("Login failed:", err?.response?.data?.message)
            toast(err?.response?.data?.message || "An error occurred")
          },
        })
      }

      const [isChecked, setIsChecked] = useState(false)


  return (
    <div className='flex justify-center items-center lg:min-h-screen lg:p-0 px-5 pt-[10rem]'>
        <form action="" onSubmit={handleSubmit(onSubmit)} className='lg:!w-[28%] w-full'>
            <div className='lg:text-center text-left space-y-3'>
                <h2 className='text-3xl font-semibold'>Join Welearn Today <span className='text-sky-400'>(Parent)</span></h2>
                <p>Unlock a world of educationa opportunities for your children.</p>
            </div>

            <ToastContainer theme='light' autoClose={4000}/>

            <div className='w-full flex flex-col gap-6 pt-5'>

              <div>
                    <input 
                        {...register('name', {required: true})} 
                        type="text" placeholder="Enter Full Name" 
                        className=" text-sm py-6 input input-bordered w-full" 
                    />
                    <p className='text-xs pt-2 text-red-500'>{errors.name && 'Full Name is Required'}</p>
                
                </div>


                <div>
                    <input 
                        {...register('email', {required: true})} 
                        type="email" placeholder="Enter Email" 
                        className=" text-sm py-6 input input-bordered w-full" 
                    />
                    <p className='text-xs pt-2 text-red-500'>{errors.email && 'Email is Required'}</p>
                
                </div>

                <div className='relative'>
                    <input 
                        {...register('password', {required: true})}
                        type={`${!showPassword ? 'password' : 'text'}`} 
                        placeholder="Enter Password" 
                        className="text-sm py-6 input input-bordered w-full" 
                    />

                    <button onClick={()=>setShowPassword(!showPassword)} type='button' className='absolute right-0 text-xl top-0 p-4'>{showPassword ? <p><IoMdEye /></p>: <p><IoMdEyeOff /></p>}</button>
                    <p className='text-xs pt-2 text-red-500'>{errors.password && 'Password is Required'}</p>
                    {/* <p className='text-right text-sm pt-3 text-neutral-500 cursor-pointer'>Forgotten Password?</p> */}
                </div>

                <div>
                    {isPending ? 
                        <CustomizedButtonLoading text='Loading'/> :
                        <CustomizedButtonMain text='Register'/>
                    }
                </div>

                <div className='flex lg:items-center gap-2 lg:m-auto'>
                    <input type="checkbox" onChange={()=>setIsChecked(!isChecked)} checked={isChecked} className="checkbox w-5 h-5 rounded-md checkbox-info border-2 " />
                    <p className='text-xs'>By signing up, you agree to our 
                        <span className='text-[#00C0EA] font-semibold cursor-pointer pl-1'>
                            Terms of Service and Privacy Policy.
                        </span>
                    </p>
                </div>

                <div className='text-xs text-center'>
                    <p>Don’t have an account?
                        <Link to={'/login/user'}>
                            <span className='text-[#00C0EA] font-semibold cursor-pointer pl-1'>Login</span>
                        </Link>
                    </p>
                </div>
            </div>
        </form>
    </div>
  )
}

export default RegisterParent
