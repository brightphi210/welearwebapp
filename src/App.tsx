import { BrowserRouter} from "react-router-dom";
import SplashScreen from "./Compnents/SplashScreen";
import { useEffect, useState } from "react";
import QueryProvider from "./Providers/QueryProvider";
import AuthProvider from "./Providers/AuthProvider";
import AllRoute from "./Routes/Route";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Provider } from "./Providers/AuthContext";
AOS.init();

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <SplashScreen />;

  return (
    <QueryProvider>
        <BrowserRouter>
            <Provider>
              <AuthProvider>
                <AllRoute />
              </AuthProvider>
            </Provider>
        </BrowserRouter>
    </QueryProvider>
  );
}

export default App;
