import { onBoardingImages } from "@/Compnents/images/imagePath"
import WelcomeGeneral from "@/Compnents/UI/WelcomeGeneral"
import type React from "react"

const WelcomeScreen: React.FC = () => {

  return (
    <>
      <WelcomeGeneral 
        onboardingImage={onBoardingImages.welcomeOne}
        mainText="Welcome to Welearn!" 
        secondaryText="
          Connect with ease. Whether you're a parent seeking academic 
          support for your child or a tutor ready to empower students, 
          Welearn is your go-to platform. Let's get started!
        "
        linkPath="/welcome-two"
      />
    </>
  )
}

export default WelcomeScreen

