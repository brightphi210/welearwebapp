
import { useLocation } from 'react-router-dom'

const ProgressDots = () => {
    const location = useLocation()

  return (
    <div className='flex items-center gap-2 lg:mt-8'>
        <div className={`${location.pathname === '/welcome' ? 'bg-[#00C0EA] h-3 w-7 rounded-full' : 'bg-[#AAEAF8] h-3 w-3 rounded-full'}`}></div>
        <div className={`${location.pathname === '/welcome-two' ? 'bg-[#00C0EA] h-3 w-7 rounded-full' : 'bg-[#AAEAF8] h-3 w-3 rounded-full'}`}></div>
        <div className={`${location.pathname === '/welcome-three' ? 'bg-[#00C0EA] h-3 w-7 rounded-full' : 'bg-[#AAEAF8] h-3 w-3 rounded-full'}`}></div>
    </div>
  )
}

export default ProgressDots