
import logo from '../assets/logo.png'
import { motion } from "framer-motion"

const SplashScreen = () => {
  return (
    <div className='flex items-center min-h-screen justify-center bg-[#00C0EA]'>
    <motion.div
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
      >
        <div className='w-20 '>
            <img src={logo} alt="" />
        </div>
      </motion.div>
    </div>
  )
}

export default SplashScreen