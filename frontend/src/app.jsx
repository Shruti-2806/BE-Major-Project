import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Mock from "./components/Mock";
import Aptitude from "./pages/Aptitude/AptitudeSubjects";
import Core from "./components/Core";
import { Footer } from "./components/Footer";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";

import Home from "./pages/Home";
import CoreSubjects from "./pages/Core/CoreSubjects";
import SubtopicList from "./pages/Core/SubtopicList";
import SubtopicTheory from "./pages/Core/SubtopicTheory";
import { Practise } from "./pages/Core/Practise";
import PractiseBySubtopic from "./pages/Core/PractiseBySubtopic";

import AptitudeSubtopicList from "./pages/Aptitude/AptitudeSubtopicList";
import AptitudePractice from "./pages/Aptitude/AptitudePractice";

const App = () => {
  const location = useLocation();

  return (
    <>
      {/* Conditionally render Navbar based on the current path */}
      {location.pathname !== "/login" && location.pathname !== "/signup" && (
        <Navbar />
      )}
      <div className="app">
        <Routes>
          {/* <Route path='/' element={<Hero />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/core" element={<CoreSubjects />} />
          <Route path="/core/:topicId/subtopic" element={<SubtopicList />} />
          <Route path="/core/subtopics/:id" element={<SubtopicTheory />} />
          <Route path="/core/subtopic/:topic/practise"element={<PractiseBySubtopic />}/>
          <Route path="/core/:topicId/practise" element={<Practise />} />

          <Route path="/aptitude" element={<Aptitude />} />
          <Route path="/aptitude/:topicId/subtopic" element={<AptitudeSubtopicList />} />
          <Route path="/aptitude/:topicId/practise" element={<AptitudePractice />} />
          {/* <Route path='/aptitude' element={<Apptitude />} /> */}

          {/* <Route path='/mock-interview' element={<Mock />} /> */}

          {/* <Route path='/core' element={<Core />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path='/practisedbms' element={<PractiseDbms />} /> */}
          {/* <Route path='/learndbmslist' element={<Learndbmslist />} /> */}
          {/* <Route path='/subtopic/:id' element={<Learndbms />} /> */}
        </Routes>
      </div>

      {/* Conditionally render Footer based on the current path */}
      {location.pathname !== "/login" && location.pathname !== "/signup" && (
        <Footer />
      )}
    </>
  );
};

export default App;
