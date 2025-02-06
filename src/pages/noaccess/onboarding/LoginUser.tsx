import { CustomizedButtonLoading, CustomizedButtonMain } from '@/Compnents/UI/CustomizedButton'
import useLogin from '@/hooks/mutations/useLogin'
import { useState } from 'react'
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { jwtDecode } from "jwt-decode"

type FormData = {
    email: string,
    password: string,
}

interface ErrorResponse {
    response?: {
      data?: {
        detail?: string
      }
    }
}

interface DecodedToken {
    user_type: string
    // Add other properties as needed
}

const LoginUser = () => {

    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const {isPending, mutate} = useLogin()

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<FormData>()

    const onSubmit = (data: FormData) => {
        mutate(data, {
          onSuccess: (details) => {
            console.log("This is data", details?.data?.access)
            const accessToken = details?.data?.access
            localStorage.setItem("accessToken", accessToken)
    
            // Decode the token immediately
            try {
              const decodedToken = jwtDecode<DecodedToken>(accessToken)
              console.log("Decoded token:", decodedToken)
    
              // Use the decoded token for redirection
              if (decodedToken.user_type === "Student") {
                navigate("/dashboard/student", { replace: true })
              } else if (decodedToken.user_type === "Instructor") {
                navigate("/dashboard/instructor", { replace: true })
              } else {
                // Handle unexpected user types
                console.error("Unknown user type:", decodedToken.user_type)
                toast("Login successful, but user type is unknown")
              }
            } catch (error) {
              console.error("Error decoding token:", error)
              toast("Login successful, but there was an error processing your information")
            }
          },
          onError: (error) => {
            const err = error as ErrorResponse
            console.log("Login failed:", err?.response?.data?.detail)
            toast(err?.response?.data?.detail || "An error occurred")
          },
        })
      }

  return (
    <div className='flex justify-center items-center lg:min-h-screen lg:p-0 px-5 pt-[10rem]'>
        <form action="" onSubmit={handleSubmit(onSubmit)} className='lg:w-[28%] w-full'>
            <div className='lg:text-center text-left space-y-3'>
                <h2 className='text-3xl font-semibold'>Welcome Back to Welearn</h2>
                <p>Welearn is your go-to platform.</p>
            </div>

            <ToastContainer theme='light' autoClose={4000}/>

            <div className='w-full flex flex-col gap-6 pt-5'>
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
                    <p className='text-right text-sm pt-3 text-neutral-500 cursor-pointer'>Forgotten Password?</p>
                </div>

                <div>
                    {isPending ? 
                        <CustomizedButtonLoading text='Loading'/> :
                        <CustomizedButtonMain text='Login'/>
                    }
                </div>

                <div className='flex lg:items-center gap-2 lg:m-auto'>
                    <input type="checkbox" checked={false} className="checkbox w-5 h-5 rounded-md checkbox-info border-2 " />
                    <p className='text-xs'>By signing up, you agree to our 
                        <span className='text-[#00C0EA] font-semibold cursor-pointer pl-1'>
                            Terms of Service and Privacy Policy.
                        </span>
                    </p>
                </div>

                <div className='text-xs text-center'>
                    <p>Don’t have an account?
                        <Link to={'/register'}>
                            <span className='text-[#00C0EA] font-semibold cursor-pointer pl-1'>Signup</span>
                        </Link>
                    </p>
                </div>
            </div>
        </form>
    </div>
  )
}

export default LoginUser