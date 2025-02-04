import { BookOpen, Play } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function CompanyAssessment() {
  const [sections, setSections] = useState([]);
  const { id, name } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    if (!id) return;

    const fetchSections = async () => {
      try {
        const response = await fetch("http://localhost:8080/sections", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ "company-id": id }),
        });

        const data = await response.json();
        if (data.status === "OK") {
          setSections(data.data);
        }
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    };

    fetchSections();
  }, [id]);

  const getIcon = (name) => {
    switch (name.toLowerCase()) {
      case "dsa":
        return "https://img.icons8.com/fluency-systems-regular/50/code.png"
      case "aptitude":
        return "https://img.icons8.com/laces/64/brain.png"
      case "technical":
        return "https://img.icons8.com/ios-filled/50/engineering.png"
      case "english":
        return "https://img.icons8.com/ios-filled/50/book.png"
      default:
        return "/placeholder.svg"
    }
  }

  const handleNavigation = (path, section) => {
    // Check if it's a Coding Problem section
    const isCodingProblem = section.name.toLowerCase() === 'dsa';

      navigate(path, {
        state: {
          sectionData: section,
          companyId: id,
          companyName: name,
          allSections: sections,
        },
      });
  };
  

  return (
    <div className="min-h-screen from-blue-900 via-purple-900 to-pink-800 px-4 sm:px-6 lg:px-8 text-white">
      <div className="text-center mb-16 pt-16">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4">
          {name}
        </h1>
        <div className="w-32 h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mx-auto mb-8 rounded-full"></div>
        <p className="text-2xl text-gray-500 max-w-3xl mx-auto" style={{ fontFamily: "Nunito" }}>
          Complete all sections of the assessment to showcase your skills and advance in the recruitment process.
        </p>
      </div>
      <div className="space-y-8 mb-16">
        {sections.map((section) => (
          <div
            key={section["section-id"] || section["ques-id"]}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden group"
          >
            <div className="flex items-center p-6 gap-8">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <img src={getIcon(section.name) || "/placeholder.svg"} alt={section.name} className="w-8 h-8" />
                </div>
              </div>
              <div className="flex-grow">
                <h2
                  className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-2"
                  style={{ fontFamily: "Nunito" }}
                >
                  {section.name.toUpperCase()}
                </h2>
                <div className="flex items-center text-gray-400 text-sm">
                  <span className="mr-4">Total Marks: {section.marks}</span>
                </div>
              </div>
              <div className="flex-shrink-0 flex items-center gap-4">
                <button
                  onClick={() =>
                    handleNavigation(`/assessment/practice/${section["section-id"] || section["ques-id"]}`, section)
                  }
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white py-2 px-4 rounded-full hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  <BookOpen className="w-5 h-5" />
                  Practice
                </button>
                <button
                  onClick={() =>
                    handleNavigation(`/assessment/start/${section["name"]}`, section)
                  }
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white py-2 px-4 rounded-full hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  <Play className="w-5 h-5" />
                  Solve
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
