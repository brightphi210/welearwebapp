import type React from "react"
// import { useNavigate } from "react-router-dom"
import logo from '@/assets/logo2.png'
import { CustomizedButtonMain, CustomizedButtonWhite } from "@/Compnents/UI/CustomizedButton"
import { Link } from "react-router-dom"
const Login: React.FC = () => {
  // const navigate = useNavigate()

  // const handleLogin = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   localStorage.setItem("accessToken", "dummy_token")
  //   navigate("/dashboard")
  // }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
      <div className="lg:w-[26%] w-full lg:px-5">
        <div className="lg:w-28 w-28 m-auto flex z-30 pb-20" >
          <img src={logo} alt="" className="w-full"/>
        </div>

        <div className="text-center lg:py-0 py-16 pb-16 space-y-2 lg:!relative fixed lg:bg-gray-100 lg:!text-black text-white bg-[#00C0EA] rounded-tr-[40px] rounded-tl-[40px] w-full bottom-0 ">
          
          <div className="space-y-2" data-aos="fade-up" data-aos-duration="500">
            <h2 className="text-3xl font-semibold">Login</h2>
            <p>Welearn is your go-to platform.</p>
          </div>

          <div className="lg:!flex flex-col gap-3 pt-5 hidden !w-[30%] justify-center m-auto" data-aos="fade-up" data-aos-duration="500">
            {/* <CustomizedButtonMain text="Tutor"/> */}
            <Link to={'/select/user/role'}>
              <CustomizedButtonMain text="Get Started"/>
            </Link>
            <Link to={'/login/user'}>
              <CustomizedButtonMain text="Login"/>
            </Link>
          </div>

          <div className="lg:!hidden flex flex-col gap-3 pt-5 w-[90%] justify-center m-auto " data-aos="fade-up" data-aos-duration="500">

            {/* <CustomizedButtonWhite text="Tutor"/> */}
            <Link to={'/select/user/role'}>
              <CustomizedButtonWhite text="Get Started"/>
            </Link>
            <Link to={'/login/user'}>
              <CustomizedButtonWhite text="Login"/>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}



export default Login

