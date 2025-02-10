import { CustomizedButtonMain } from '@/Compnents/UI/CustomizedButton'
import { useAuth } from '@/Providers/AuthContext'

const InstructorHome = () => {
  const {handleLogout} = useAuth()
  return (
    <div>
        <div>
          Instructor Home Page
          <CustomizedButtonMain text='Logout' onClick={handleLogout}/>
        </div>
    </div>
  )
}

export default InstructorHome