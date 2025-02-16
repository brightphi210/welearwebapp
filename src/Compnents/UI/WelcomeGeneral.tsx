import { CustomizedButtonMain } from "@/Compnents/UI/CustomizedButton"
import ProgressDots from "@/Compnents/UI/ProgressDots"
import type React from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"


interface WelcomeProps {
    mainText: string;
    secondaryText: string;
    onboardingImage: string;
    linkPath?: string;
}
const WelcomeGeneral: React.FC<WelcomeProps> = ({mainText, secondaryText, onboardingImage, linkPath}) => {

    const location = useLocation()

    const navigate = useNavigate()

    const handleContinue = () => {
      localStorage.setItem("hasSeenWelcome", "true")
      navigate("/login")
    }

  return (
    <div className="flex lg:justify-center lg:items-center lg:h-screen lg:px-[20rem] px-5 lg:pt-0 pt-[4rem] pb-5">
      <div className="grid lg:grid-cols-2 grid-cols-1 items-center lg:gap-20 gap-10">

        <div className="w-full" data-aos="fade-up" data-aos-duration="500">
          <img src={`${onboardingImage}`} className="w-full" alt="" />
          <div className="lg:hidden block pt-5">
            <ProgressDots />
          </div>
        </div>

        <div className="space-y-5" data-aos="fade-up" data-aos-duration="600">
          <h1 className="text-3xl font-bold leading-[60px] 2xl:w-[60%] w-full" >{mainText}</h1>

          <p className="lg:text-base text-sm lg:pb-7 pb-5 text-justify">
            {secondaryText}
          </p>
          
            {location.pathname === '/welcome' &&
                <div >
                    <Link to={`${linkPath}`} className="" >
                    <CustomizedButtonMain text="Continue"/>
                    </Link>
                    <div className="lg:block hidden">
                    <ProgressDots />
                    </div>
                </div> 
            }

            {location.pathname === '/welcome-two' &&
                <div >
                    <Link to={`${linkPath}`} className="" >
                    <CustomizedButtonMain text="Continue"/>
                    </Link>
                    <div className="lg:block hidden">
                    <ProgressDots />
                    </div>
                </div> 
            }

            {
                location.pathname === '/welcome-three' && 
                <div >
                    <CustomizedButtonMain text="Continue" onClick={handleContinue}/>
                    <div className="lg:block hidden">
                        <ProgressDots />
                    </div>
                </div>
            }

        </div>
      </div>
    </div>
  )
}

export default WelcomeGeneral

