import Login from '@/pages/noaccess/onboarding/Login';
import NotFound from '@/pages/noaccess/NotFound';
import WelcomeScreen from '@/pages/noaccess/WelcomeScreen';
import WelcomeScreenThree from '@/pages/noaccess/WelcomeScreenThree';
import WelcomeScreenTwo from '@/pages/noaccess/WelcomeScreenTwo';
import { Routes, Route } from 'react-router-dom';
import LoginUser from '@/pages/noaccess/onboarding/LoginUser';
import RegisterParent from '@/pages/noaccess/onboarding/RegisterParent';
import RegisterTutor from '@/pages/noaccess/onboarding/RegisterTutor';
import AllHiredTutors from '@/pages/access/student/AllHiredTutors';
import IndividualInstructor from '@/pages/access/student/IndividualInstructor';
import StudentHome from '@/pages/access/student/StudentHome';
import StudentAccount from '@/pages/access/student/StudentAccount';
import InstructorHome from '@/pages/access/instructor/InstructorHome';
import IndividualHiredTutors from '@/pages/access/student/IndividualHiredTutors';
import StudentFAQs from '@/pages/access/student/StudentFAQs';
import CustomerCare from '@/pages/noaccess/CustomerCare';
import StudentPasswordUpdate from '@/pages/access/student/StudentPasswordUpdate';
import IndividualParent from '@/pages/access/instructor/IndividualParent';
import AllStudent from '@/pages/access/instructor/AllStudent';
import InstructorAccount from '@/pages/access/instructor/InstructorAccount';

const AllRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<WelcomeScreen />} />
      <Route path="/welcome" element={<WelcomeScreen />} />
      <Route path="/welcome-two" element={<WelcomeScreenTwo />} />
      <Route path="/welcome-three" element={<WelcomeScreenThree />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login/user" element={<LoginUser />} />
      <Route path="/register/parent" element={<RegisterParent />} />
      <Route path="/register/tutor" element={<RegisterTutor />} />
      <Route path="/dashboard/welearn/cutomer-care" element={<CustomerCare />} />
      <Route path="*" element={<NotFound />} /> 
      
      <Route path="/dashboard/instructor" element={<InstructorHome />} />
      <Route path="/dashboard/instructor/all-students" element={<AllStudent />} />
      <Route path="/dashboard/instructor/tutor/:id" element={<IndividualParent />} />
      <Route path="/dashboard/instructor/account" element={<InstructorAccount />} />



      <Route path="/dashboard/student" element={<StudentHome />} />
      <Route path="/dashboard/student/all-hire-tutors" element={<AllHiredTutors />} />
      <Route path="/dashboard/student/tutor/:id" element={<IndividualInstructor />} />
      <Route path="/dashboard/student/hired/tutor/:id" element={<IndividualHiredTutors />} />
      <Route path="/dashboard/student/account" element={<StudentAccount />} />
      <Route path="/dashboard/student/faqs" element={<StudentFAQs />} />
      <Route path="/dashboard/student/password-update" element={<StudentPasswordUpdate />} />
    </Routes>
  );
};

export default AllRoute;
