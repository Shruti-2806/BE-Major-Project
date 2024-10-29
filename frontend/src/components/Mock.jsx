import React, { useState } from "react";
import { Search, Code, Clock, BarChart2 } from "lucide-react"; 
import { useLocation } from "react-router";

export default function CodingPlatform() {
  const [selectedTab, setSelectedTab] = useState("companies");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);


  const companies = ["Google", "Amazon", "Microsoft"];
  const questions = [
    { id: 1, title: "Two Sum", timeLimit: "2 mins", topics: ["Array", "Hash Table"] },
    { id: 2, title: "Reverse Linked List", timeLimit: "5 mins", topics: ["Linked List"] },
  ];
  const studentData = {
    questionsAttempted: 30,
    questionsCorrect: 22,
    averageTime: "1.8 mins",
    strongTopics: ["Array", "String", "Binary Search"],
    weakTopics: ["Graph", "Dynamic Programming"],
    recentSubmissions: [
      { question: "Two Sum", result: "Correct", time: "1.5 mins", date: "10/25/2024" },
      { question: "Reverse Linked List", result: "Incorrect", time: "3 mins", date: "10/24/2024" },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
      <header className="bg-white dark:bg-gray-800 shadow p-6 mb-8">
        <h1 className="text-3xl font-bold text-center">Coding Practice Platform</h1>
      </header>

      <main className="p-8 space-y-6 max-w-5xl mx-auto">
        {/* Tab Buttons */}
        <div className="flex justify-center space-x-4 mb-6">
          {["companies", "questions", "analysis"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`p-4 font-semibold transition duration-200 ${
                selectedTab === tab
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "hover:text-blue-500"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/_/g, " ")}
            </button>
          ))}
        </div>

        {/* Companies Tab */}
        {selectedTab === "companies" && (
          <div className="space-y-6">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search for companies"
                className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none shadow"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {companies.map((company) => (
                <div
                  key={company}
                  onClick={() => setSelectedCompany(company)}
                  className={`p-4 border rounded-md cursor-pointer shadow hover:shadow-lg transition duration-200 ${
                    selectedCompany === company ? "bg-blue-100 dark:bg-blue-900" : "hover:bg-blue-50 dark:hover:bg-gray-700"
                  }`}
                >
                  {company}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Questions Tab */}
        {selectedTab === "questions" && (
          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
            <div className="flex-1 space-y-4">
              {questions.map((question) => (
                <div
                  key={question.id}
                  onClick={() => setSelectedQuestion(question)}
                  className={`p-4 border rounded-md cursor-pointer shadow hover:shadow-lg transition duration-200 ${
                    selectedQuestion?.id === question.id ? "bg-blue-100 dark:bg-blue-900" : "hover:bg-blue-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <h3 className="font-semibold text-lg">{question.title}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <Clock className="w-4 h-4" />
                    <span>{question.timeLimit}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {question.topics.map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full text-xs"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex-1">
              {selectedQuestion ? (
                <div className="p-6 border rounded-md shadow bg-white dark:bg-gray-800">
                  <h2 className="text-2xl font-bold mb-2">{selectedQuestion.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">Solve this question and upload your solution.</p>
                  <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition duration-200">
                    Submit Solution
                  </button>
                </div>
              ) : (
                <div className="text-gray-500 dark:text-gray-400">Select a question to view details</div>
              )}
            </div>
          </div>
        )}

        {/* Analysis Tab */}
        {selectedTab === "analysis" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold">Your Progress Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 border rounded-md shadow bg-white dark:bg-gray-800">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
                  <BarChart2 className="w-4 h-4" />
                  <h2>Questions Attempted</h2>
                </div>
                <span className="text-lg font-semibold">{studentData.questionsAttempted}</span>
              </div>
              <div className="p-6 border rounded-md shadow bg-white dark:bg-gray-800">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
                  <Code className="w-4 h-4" />
                  <h2>Questions Correct</h2>
                </div>
                <span className="text-lg font-semibold">{studentData.questionsCorrect}</span>
              </div>
              <div className="p-6 border rounded-md shadow bg-white dark:bg-gray-800">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
                  <Clock className="w-4 h-4" />
                  <h2>Average Time per Question</h2>
                </div>
                <span className="text-lg font-semibold">{studentData.averageTime}</span>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-8">Topic Analysis</h2>
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 p-6 border rounded-md shadow bg-white dark:bg-gray-800">
                <h3 className="text-lg font-semibold mb-4">Strong Topics</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  {studentData.strongTopics.map((topic, index) => (
                    <li key={index}>{topic}</li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 p-6 border rounded-md shadow bg-white dark:bg-gray-800">
                <h3 className="text-lg font-semibold mb-4">Weak Topics</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  {studentData.weakTopics.map((topic, index) => (
                    <li key={index}>{topic}</li>
                  ))}
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-8">Recent Submissions</h2>
            <div className="space-y-4">
              {studentData.recentSubmissions.map((submission, index) => (
                <div key={index} className="flex justify-between p-4 border rounded-md shadow bg-white dark:bg-gray-800">
                  <span>{submission.question}</span>
                  <span className="text-gray-500 dark:text-gray-400">{submission.result}</span>
                  <span className="text-gray-500 dark:text-gray-400">{submission.time}</span>
                  <span className="text-gray-500 dark:text-gray-400">{submission.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
