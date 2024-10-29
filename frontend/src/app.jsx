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
import DsaTopicList from "./pages/DSA/DsaTopicList";
import DsaQuesList from "./pages/DSA/DsaQuesList";
import DsaDesc from "./pages/DSA/DsaDesc";
// import Editor from "./components/Editor";
import CodeEditor from "./pages/DSA/CodeEditor";
import LearnDesc from "./pages/DSA/LearnDesc";
// import { path } from 'path';

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
          <Route
            path="/core/subtopic/:topic/practise"
            element={<PractiseBySubtopic />}
          />
          <Route path="/core/:topicId/practise" element={<Practise />} />
          <Route path="/aptitude" element={<Aptitude />} />
          <Route path="/aptitude/subtopic" element={<Aptitude />} />\

          <Route path="/dsa" element={<DsaTopicList/>}/>
          <Route path="/dsa/questions/:name" element={<DsaQuesList/>}/>
          <Route path="/dsa/descriptions/:id" element={<DsaDesc/>}/>
          <Route path="/dsa/ide/:id" element={<CodeEditor/>}/>
          <Route path="/dsa/learn/:name" element={<LearnDesc/>}/>
          {/* <Route path='/aptitude' element={<Apptitude />} /> */}

          <Route path='/mock' element={<Mock />} /> 

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
