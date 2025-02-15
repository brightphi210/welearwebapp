import { profileImage } from '@/Compnents/images/imagePath'
import useGetSingleInstructor from '@/hooks/queries/useGetSingleInstructor'
import { useAuth } from '@/Providers/AuthContext'
import { IoMdClose } from 'react-icons/io'
import { RiMenu2Fill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

interface MyProps {
    toggleDrawer: () => void,
    isOpened: boolean,
  
}

const InstructorTopNavbar = ({toggleDrawer, isOpened}: MyProps) => {

    const {decodedToken} = useAuth()
    const {data } = useGetSingleInstructor(decodedToken?.profile_id ?? 0);
    const myData = data?.data

  return (
    <div>        
        {/* Top Navigation Bar */}
      <div className="flex fixed pt-3 pb-3 w-full z-50 bg-white items-center justify-between border-b border-neutral-200 lg:px-10 px-5">
        <div className="flex gap-5 items-center">
          <div className="lg:hidden block" onClick={toggleDrawer}>
            {!isOpened ? (
              <p className="text-xl bg-neutral-100 p-2.5 rounded-full">
                <RiMenu2Fill />
              </p>
            ) : (
              <p className="text-xl bg-neutral-100 p-2.5 rounded-full">
                <IoMdClose />
              </p>
            )}
          </div>
          <h2 className="text-[#00C0EA] text-lg font-semibold">Welearn</h2>
        </div>

        <Link to={'/dashboard/instructor/account'}>
        <div className="w-10 h-10 overflow-hidden bg-neutral-300 rounded-full">
          <img className='w-full h-full object-cover' src={myData?.profile_pic || profileImage?.porfileImg} alt="Profile" />
        </div>
        </Link>
      </div>
    </div>
  )
}

export default InstructorTopNavbar