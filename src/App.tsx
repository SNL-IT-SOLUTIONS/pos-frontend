import AppRoutes from './routes/AppRoutes'
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';
const App = () => {

  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration
      once: true,    // whether animation should happen only once
    });
  }, []);

  return (
    <div>
      <AppRoutes />
    </div>
  )
}

export default App

