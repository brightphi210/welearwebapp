import { CustomizedButtonMain } from '@/Compnents/UI/CustomizedButton'
import useLogin from '@/hooks/mutations/useLogin'
import { useState } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom'


type FormData = {
    email: string,
    password: string,
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

    const onSubmit = (data:FormData) => {
        mutate(data, {
          onSuccess: (details) => {
            console.log('This is data', details);
            // localStorage.setItem("accessToken", details?.data?.token?.access);
            console.log('Login successful')
            // navigate('/auth/dashboard', { replace: true })
          },
          onError: (error) => {
            console.error('Login failed:', error.message)
            // setError(error.message)
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

            <div className='w-full flex flex-col gap-6 pt-5'>
                <div>
                    <input 
                        {...register('email', {required: true})} 
                        type="text" placeholder="Enter Email" 
                        className=" text-sm py-6 input input-bordered w-full" 
                    />
                    <p className='text-xs pt-2 text-red-500'>{errors.email && 'Email is Required'}</p>
                </div>

                <div>
                    <input 
                        {...register('password', {required: true})}
                        type="text" placeholder="Enter Password" 
                        className=" text-sm py-6 input input-bordered w-full" 
                    />
                    <p className='text-xs pt-2 text-red-500'>{errors.password && 'Password is Required'}</p>
                    <p className='text-right text-sm pt-3 text-neutral-500 cursor-pointer'>Forgotten Password?</p>
                </div>

                <div>
                    <CustomizedButtonMain text='Login'/>
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
                    <p>Don’t have an account? <span className='text-[#00C0EA] font-semibold cursor-pointer pl-1'>Signup</span></p>
                </div>
            </div>
        </form>
    </div>
  )
}

export default LoginUser