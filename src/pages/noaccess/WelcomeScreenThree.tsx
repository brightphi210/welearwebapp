import { onBoardingImages } from "@/Compnents/images/imagePath"
import WelcomeGeneral from "@/Compnents/UI/WelcomeGeneral"
import type React from "react"

const WelcomeScreenThree: React.FC = () => {

  return (
    <>
      <WelcomeGeneral 
        onboardingImage={onBoardingImages.welcomeThree}
        mainText="Empower Your Child's Future" 
        secondaryText="
          With Welearn, you're not just hiring a tutor – 
          you're investing in your child's future. Empower 
          them with the tools and resources they need to succeed academically. 
        "
      />
    </>
  )
}

export default WelcomeScreenThree

