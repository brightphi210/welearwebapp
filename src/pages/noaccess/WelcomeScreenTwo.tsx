import { onBoardingImages } from "@/Compnents/images/imagePath"
import WelcomeGeneral from "@/Compnents/UI/WelcomeGeneral"
import type React from "react"

const WelcomeScreenTwo: React.FC = () => {

  return (
    <>
      <WelcomeGeneral 
        onboardingImage={onBoardingImages.welcomeTwo}
        mainText="Find Your Perfect Tutor" 
        secondaryText="
          Browse through a diverse pool of experienced tutors tailored 
          to your child's needs.   Welearn offers a variety 
          of subjects and expertise levels to match and elevate 
          your child's learning journey.
        "
        linkPath="/welcome-three"
      />
    </>
  )
}

export default WelcomeScreenTwo

