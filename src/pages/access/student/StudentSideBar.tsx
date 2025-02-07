import Loading from "@/Compnents/UI/Loading";
import useGetSingleStudent from "@/hooks/queries/useGetSingleStudent";
import { useAuth } from "@/Providers/AuthContext";
import { FaRegUser } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { FiHome } from "react-icons/fi";
import { Link } from "react-router-dom";
import { GoDotFill } from "react-icons/go";


interface StudentSideBarProps {
  isOpened: boolean
}

const StudentSideBar: React.FC<StudentSideBarProps> = ({ isOpened }) => {  

  const {decodedToken, handleLogout} = useAuth()

  const { isLoading, data } = useGetSingleStudent(decodedToken?.profile_id ?? 0);
  const studentProfileData = data?.data

  return (
    <div className={`lg:!block ${isOpened ? "!block" : "!hidden"} bg-neutral-100 p-10 h-screen !fixed 2xl:w-[16rem] xl:w-[15rem] lg:w-[15rem] w-[100%] z-30`}>

        {isLoading ? 
          <div className="pt-20">
            <Loading /> 
          </div> :
          <div className="mt-20 border-b border-neutral-50 pb-3">
            <div className="relative w-fit">
              <div className="w-20 h-20 flex  justify-center rounded-full border-2 border-[#00C0EA] bg-white overflow-hidden">
                <img src={studentProfileData?.profile_pic } className="w-full h-full object-cover" alt="" />
              </div>
              <p className="absolute top-2 right-[-5px] text-lg bg-green-600 text-green-600 rounded-full w-fit h-fit border-4 border-white"><GoDotFill /></p>
            </div>
            <div>
              <h2 className="text-lg font-semibold pt-3 ">{studentProfileData?.user?.name}</h2>
              <p className="text-green-600 text-xs ">Online</p>
            </div>
          </div>
        }



        <ul className='flex flex-col gap-6 text-sm font-medium pt-6'>
            <Link to={'/dashboard/student'}>
              <li className="flex items-center gap-3 font-semibold cursor-pointer bg-neutral-50 border border-neutral-100 p-2.5 lg:px-3 px-5 rounded-full w-full hover:bg-neutral-100"><FiHome className="text-lg text-[#00C0EA]"/>Home</li>
            </Link>

            <Link to={'/dashboard/student/account'}>
              <li className="flex items-center gap-3 font-semibold cursor-pointer bg-neutral-50 border border-neutral-100 p-2.5 lg:px-3 px-5 rounded-full w-full hover:bg-neutral-100"><FaRegUser className="text-lg text-[#00C0EA]"/>Account</li>
            </Link>

            <Link to={'/dashboard/student/all-hire-tutors'}>
              <li className="flex items-center gap-3 font-semibold cursor-pointer bg-neutral-50 border border-neutral-100 p-2.5 lg:px-3 px-5 rounded-full w-full hover:bg-neutral-100"><FiUsers className="text-lg text-[#00C0EA]"/>All Hired Tutors</li>
            </Link>

            <li className="flex items-center gap-3 font-semibold cursor-pointer bg-neutral-50 border border-neutral-100 p-2.5 lg:px-3 px-5 rounded-full w-full hover:bg-neutral-100"><RiLockPasswordLine className="text-lg text-[#00C0EA]"/>Password</li>

            <Link to={'/dashboard/student/all-hire-tutors'}>
              <li className="flex items-center gap-3 font-semibold cursor-pointer bg-neutral-50 border border-neutral-100 p-2.5 lg:px-3 px-5 rounded-full w-full hover:bg-neutral-100"><FiUsers className="text-lg text-[#00C0EA]"/>FAQs</li>
            </Link>


            <li onClick={handleLogout} className="flex items-center cursor-pointer gap-3 font-semibold bg-[#00C0EA] lg:w-full w-fit p-2.5 px-6 text-white rounded-full"><RiLogoutCircleRLine className="text-lg"/>Logout</li>
        </ul>
    </div>
  )
}

export default StudentSideBar