import { Link } from "react-router-dom"
import { BookOpen, Play } from "lucide-react"
import { useState } from "react"

export default function CompanyAssessment() {
  const [sections, setSections] = useState([
    {
      _id: "1",
      name: "Multiple Choice Questions",
      description: "Technical MCQs covering various programming concepts and fundamentals",
      questionsCount: 20,
      timeEstimate: "60 mins",
      icon: "https://img.icons8.com/ios-filled/50/engineering.png",
      tabId: "mcq",
    },
    {
      _id: "2",
      name: "Data Structures & Algorithms",
      description: "Coding problems focusing on algorithms, data structures, and problem-solving",
      questionsCount: 2,
      timeEstimate: "90 mins",
      icon: "https://img.icons8.com/fluency-systems-regular/50/code.png",
      tabId: "dsa",
    },
    {
      _id: "3",
      name: "Aptitude Assessment",
      description: "Quantitative aptitude, logical reasoning, and analytical thinking questions",
      questionsCount: 20,
      timeEstimate: "45 mins",
      icon: "https://img.icons8.com/laces/64/brain.png",
      tabId: "aptitude",
    },
  ])

  return (
    <div className="min-h-screen from-blue-900 via-purple-900 to-pink-800 px-4 sm:px-6 lg:px-8 text-white">
      <div className="text-center mb-16 pt-16">
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4">
            Oracle
          </h1>
          <div className="w-32 h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mx-auto mb-8 rounded-full"></div>
          <p className="text-2xl text-gray-500 max-w-3xl mx-auto" style={{ fontFamily: "Nunito" }}>
            Complete all sections of the assessment to showcase your skills and advance in the recruitment process.
          </p>
        </div>
      <div className="space-y-8 mb-16">
        {sections.map((section) => (
          <div
            key={section._id}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden group"
          >
            <div className="flex items-center p-6 gap-8">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <img src={section.icon || "/placeholder.svg"} alt={section.name} />
                </div>
              </div>
              <div className="flex-grow">
                <h2
                  className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-2"
                  style={{ fontFamily: "Nunito" }}
                >
                  {section.name}
                </h2>
                <p className="text-gray-300 mb-2">{section.description}</p>
                <div className="flex items-center text-gray-400 text-sm">
                  <span className="mr-4">Questions: {section.questionsCount}</span>
                  {/* <span>Time: {section.timeEstimate}</span> */}
                </div>
              </div>
              <div className="flex-shrink-0 flex items-center gap-4">
                <Link to={`/assessment/practice/${section.tabId}`}>
                  <button className="flex items-center gap-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white py-2 px-4 rounded-full hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                    <BookOpen className="w-5 h-5" />
                    Practice
                  </button>
                </Link>
                <Link to={`/assessment/start/${section.tabId}`}>
                  <button className="flex items-center gap-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white py-2 px-4 rounded-full hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                    <Play className="w-5 h-5" />
                    Solve
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

