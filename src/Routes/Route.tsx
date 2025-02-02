import DashHome from '@/pages/access/DashHome/DashHome';
import Login from '@/pages/noaccess/onboarding/Login';
import NotFound from '@/pages/noaccess/NotFound';
import WelcomeScreen from '@/pages/noaccess/WelcomeScreen';
import WelcomeScreenThree from '@/pages/noaccess/WelcomeScreenThree';
import WelcomeScreenTwo from '@/pages/noaccess/WelcomeScreenTwo';
import { Routes, Route } from 'react-router-dom';
import LoginUser from '@/pages/noaccess/onboarding/LoginUser';
import RegisterParent from '@/pages/noaccess/onboarding/RegisterParent';
import RegisterTutor from '@/pages/noaccess/onboarding/RegisterTutor';

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
      <Route path="/dashboard" element={<DashHome />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AllRoute;
