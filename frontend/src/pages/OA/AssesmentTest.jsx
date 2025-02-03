import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Editor from "@monaco-editor/react"
import { Timer, CheckCircle, Circle, HelpCircle, BookOpen, Code, Brain, ChevronLeft, ChevronRight } from "lucide-react"

export default function AssessmentTest() {
  const { tab, mode } = useParams() // Get both tab and mode from URL
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(tab || "mcq")
  const [timeLeft, setTimeLeft] = useState(7200)
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [questionStats, setQuestionStats] = useState({
    answered: 0,
    visited: 0,
    notAnswered: 5,
  })

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (tab && ["mcq", "dsa", "aptitude"].includes(tab)) {
      setActiveTab(tab)
    } else {
      // Redirect to mcq if invalid tab
      navigate("/assessment/" + mode + "/mcq", { replace: true })
    }
  }, [tab, mode, navigate])

  // Format time remaining
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Tab data with icons
  const tabs = [
    { id: "mcq", label: "MCQs", icon: BookOpen },
    { id: "dsa", label: "DSA", icon: Code },
    { id: "aptitude", label: "Aptitude", icon: Brain },
  ]

  // Dummy MCQ questions
  const mcqQuestions = [
    {
      id: 1,
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n log n)", "O(n²)"],
      correctAnswer: "O(log n)",
    },
    {
      id: 2,
      question: "Which of the following is not a React Hook?",
      options: ["useEffect", "useState", "useHistory", "useReactState"],
      correctAnswer: "useReactState",
    },
  ]

  // Dummy Aptitude questions
  const aptitudeQuestions = [
    {
      id: 1,
      question: "If a train travels 360 km in 4 hours, what is its speed in km/h?",
      options: ["80 km/h", "90 km/h", "85 km/h", "95 km/h"],
      correctAnswer: "90 km/h",
    },
  ]

  // Dummy DSA question
  const dsaQuestion = {
    title: "Two Sum",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers in nums such that they add up to target.
    You may assume that each input would have exactly one solution, and you may not use the same element twice.
    You can return the answer in any order.`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
    ],
    constraints: ["2 <= nums.length <= 104", "-109 <= nums[i] <= 109", "-109 <= target <= 109"],
  }

  // Update tab change handler to update URL
  const handleTabChange = (newTab) => {
    setActiveTab(newTab)
    navigate(`/assessment/${mode}/${newTab}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Header with Timer and Stats */}
      <div className="p-4 bg-gray-800 border-b border-gray-700">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Timer className="w-6 h-6 text-pink-400" />
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                {formatTime(timeLeft)}
              </span>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-1 px-3 py-1 border border-gray-600 rounded-full">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Answered: {questionStats.answered}</span>
              </div>
              <div className="flex items-center gap-1 px-3 py-1 border border-gray-600 rounded-full">
                <Circle className="w-4 h-4 text-blue-400" />
                <span>Visited: {questionStats.visited}</span>
              </div>
              <div className="flex items-center gap-1 px-3 py-1 border border-gray-600 rounded-full">
                <HelpCircle className="w-4 h-4 text-red-400" />
                <span>Not Answered: {questionStats.notAnswered}</span>
              </div>
            </div>
          </div>
          <div className="w-32 h-2 bg-gray-700 rounded-full">
            <div
              className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full"
              style={{ width: `${(questionStats.answered / 5) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-88px)]">
        {/* Vertical Tabs with collapse functionality */}
        <div
          className={`${
            isSidebarCollapsed ? "w-16" : "w-64"
          } bg-gray-800 border-r border-gray-700 transition-all duration-300 relative`}
        >
          {/* Collapse button */}
          <button
            onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
            className="absolute -right-3 top-4 bg-gray-700 rounded-full p-1 border border-gray-600 hover:bg-gray-600 z-10"
          >
            {isSidebarCollapsed ? (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-gray-400" />
            )}
          </button>

          {/* Modified tab buttons */}
          {tabs.map((tabItem) => {
            const Icon = tabItem.icon
            return (
              <button
                key={tabItem.id}
                onClick={() => handleTabChange(tabItem.id)}
                className={`w-full flex items-center gap-3 px-6 py-4 transition-colors ${
                  activeTab === tabItem.id
                    ? "bg-gradient-to-r from-blue-400/10 to-purple-400/10 border-r-4 border-purple-400"
                    : "hover:bg-gray-700"
                }`}
              >
                <Icon className={`w-5 h-5 ${activeTab === tabItem.id ? "text-purple-400" : "text-gray-400"}`} />
                {!isSidebarCollapsed && (
                  <span className={activeTab === tabItem.id ? "text-purple-400 font-medium" : "text-gray-400"}>
                    {tabItem.label}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          {/* MCQ Content */}
          {activeTab === "mcq" && (
            <div className="space-y-8">
              {mcqQuestions.map((q, index) => (
                <div key={q.id} className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">
                    {index + 1}. {q.question}
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {q.options.map((option, i) => (
                      <label
                        key={i}
                        className="flex items-center space-x-3 p-3 rounded-lg bg-gray-700 hover:bg-gray-600 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name={`question-${q.id}`}
                          value={option}
                          className="form-radio text-purple-400"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Aptitude Content */}
          {activeTab === "aptitude" && (
            <div className="space-y-8">
              {aptitudeQuestions.map((q, index) => (
                <div key={q.id} className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">
                    {index + 1}. {q.question}
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {q.options.map((option, i) => (
                      <label
                        key={i}
                        className="flex items-center space-x-3 p-3 rounded-lg bg-gray-700 hover:bg-gray-600 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name={`aptitude-${q.id}`}
                          value={option}
                          className="form-radio text-purple-400"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* DSA Content */}
          {activeTab === "dsa" && (
            <div className="grid grid-cols-2 gap-6">
              {/* Question Panel */}
              <div className="bg-gray-800 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">{dsaQuestion.title}</h2>
                <div className="prose prose-invert">
                  <p className="mb-4">{dsaQuestion.description}</p>
                  <h3 className="text-lg font-semibold mb-2">Example:</h3>
                  {dsaQuestion.examples.map((example, index) => (
                    <div key={index} className="bg-gray-700 p-4 rounded-lg mb-4">
                      <p>Input: {example.input}</p>
                      <p>Output: {example.output}</p>
                      <p>Explanation: {example.explanation}</p>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mb-2">Constraints:</h3>
                  <ul className="list-disc pl-4">
                    {dsaQuestion.constraints.map((constraint, index) => (
                      <li key={index}>{constraint}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Code Editor Panel */}
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <Editor
                  height="70vh"
                  defaultLanguage="javascript"
                  theme="vs-dark"
                  defaultValue="// Write your solution here

function twoSum(nums, target) {
    
}"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: "on",
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div
        className={`fixed bottom-0 ${isSidebarCollapsed ? "left-16" : "left-64"} right-0 p-4 bg-gray-800 border-t border-gray-700 transition-all duration-300`}
      >
        <div className="max-w-7xl mx-auto flex justify-between">
          <button className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600">Previous</button>
          <button className="px-6 py-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white rounded-lg hover:opacity-90">Next</button>
        </div>
      </div>
    </div>
  )
}

