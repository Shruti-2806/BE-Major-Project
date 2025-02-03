import { useState } from "react"
import { useNavigate } from "react-router-dom"

const interviewRounds = [
  {
    name: "Online Assessment",
    description: "Complete a series of coding challenges and algorithmic problems.",
    status: "completed",
    path: "/mock-interview/oa"  
  },
  {
    name: "Technical Interview",
    description: "In-depth discussion about your technical skills and problem-solving abilities.",
    status: "current",
  },
  {
    name: "System Design",
    description: "Demonstrate your ability to design scalable and efficient systems.",
    status: "upcoming",
  },
  {
    name: "HR Interview",
    description: "Discuss your background, experience, and cultural fit with the company.",
    status: "upcoming",
  },
]

export default function MockInterview() {
  const [expandedRound, setExpandedRound] = useState(null)
  const navigate = useNavigate() 

  const handleRoundClick = (round) => {
    if (round.path) {
      navigate(round.path) 
    } else {
      setExpandedRound(expandedRound === round ? null : round)
    }
  }

  return (
    <div className="min-h-screen from-blue-600 via-purple-600 to-pink-600 px-4 sm:px-6 lg:px-8 py-12 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4">
            Interview Process
          </h1>
          <div className="w-32 h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mx-auto mb-8 rounded-full"></div>
          <p className="text-2xl text-gray-500 max-w-3xl mx-auto">Navigate through the stages of our comprehensive interview process</p>
        </div>

        <div className="space-y-6">
          {interviewRounds.map((round, index) => (
            <div
              key={round.name}
              className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl shadow-2xl overflow-hidden transition-all duration-300"
            >
              <div
                className="p-6 cursor-pointer flex items-center justify-between"
                onClick={() => handleRoundClick(round)} 
              >
                <div className="flex items-center space-x-4">
                  {round.status === "completed" ? (
                    <div className="text-green-400">✔</div>
                  ) : round.status === "current" ? (
                    <div className="w-4 h-4 rounded-full bg-blue-400"></div>
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-gray-400"></div>
                  )}
                  <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                    {round.name}
                  </h2>
                </div>
                <div
                  className={`transform transition-transform duration-300 ${expandedRound === index ? "rotate-90" : ""}`}
                >
                  ▶
                </div>
              </div>
              {expandedRound === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-300">{round.description}</p>
                  <div className="mt-4">
                    <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-md hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
                      Start
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
