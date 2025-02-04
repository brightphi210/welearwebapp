import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type React from "react";
import { useAuth } from "./AuthContext";

interface AuthProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProps) => {
  const { decodedToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("accessToken");
  const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");

  useEffect(() => {
    if (location.pathname === "/") {
      if (!hasSeenWelcome) {
        navigate("/welcome", { replace: true });
      } else if (!isAuthenticated) {
        navigate("/login", { replace: true });
      } else {
        if (decodedToken?.user_type === "Student") {
          navigate("/dashboard/student", { replace: true });
        } else {
          navigate("/dashboard/instructor", { replace: true });
        }
      }
    }
  }, [isAuthenticated, hasSeenWelcome, decodedToken, navigate, location]);

  return <>{children}</>;
};

export default AuthProvider;
