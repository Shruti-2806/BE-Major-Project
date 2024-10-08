import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Mock from "./components/Mock";
import Apptitude from "./components/Apptitude";
import Core from "./components/Core";
import { Footer } from "./components/Footer";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import { Learndbms } from "./components/Learndbms";
import { PractiseDbms } from "./components/PractiseDbms";

export const App = () => {
  const location = useLocation();

  return (
    <>
      {/* Conditionally render Navbar based on the current path */}
      {location.pathname !== "/login" && location.pathname !== "/signup" && (
        <Navbar />
      )}

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/mock-interview" element={<Mock />} />
        <Route path="/aptitude" element={<Apptitude />} />
        <Route path="/core" element={<Core />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/learndbms" element={<Learndbms />} />
        <Route path="/practisedbms" element={<PractiseDbms />} />
      </Routes>

      {/* Conditionally render Footer based on the current path */}
      {location.pathname !== "/login" && location.pathname !== "/signup" && (
        <Footer />
      )}
    </>
  );
};

export default App;
