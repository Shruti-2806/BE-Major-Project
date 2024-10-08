import React, { useState } from "react";

export const PractiseDbms = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({}); // State to store user's selected answers

  const questions = [
    {
      topic: "Database Management Systems",
      subtopic: "Normalization",
      question: "What is the highest normal form of this relation?",
      options: ["1NF", "2NF", "3NF", "BCNF"],
      answer: "BCNF",
      explanation:
        "BCNF is a stricter form of 3NF and removes all remaining anomalies.",
      createdAt: "2024-09-25",
    },
    {
      topic: "Database Management Systems",
      subtopic: "SQL",
      question: "Which SQL statement is used to extract data from a database?",
      options: ["SELECT", "UPDATE", "DELETE", "INSERT"],
      answer: "SELECT",
      explanation: "SELECT is used to retrieve data from the database.",
      createdAt: "2024-09-20",
    },
  ];

  const handleAnswerClick = (questionIndex, selectedOption) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: selectedOption, // Store user's selected option for each question
    });
  };

  return (
    <div className="min-h-screen from-blue-900 via-purple-900 to-pink-800 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4">
            Practise DBMS Questions
          </h1>
          <div className="w-32 h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mx-auto mb-8 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-1 gap-12 mb-16">
          {questions.map((question, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden group"
            >
              <div className="p-8">
                <h2
                  className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
                  style={{ fontFamily: "Nunito" }}
                >
                  {question.topic} - {question.subtopic}
                </h2>
                <p className="text-lg text-gray-400 mt-2">
                  <span className="font-semibold">Question:</span>{" "}
                  {question.question}
                </p>

                <ul className="mt-4 text-gray-300 space-y-2">
                  {question.options.map((option, idx) => (
                    <li
                      key={idx}
                      className={`bg-gray-800 p-2 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors ${
                        selectedAnswers[index] &&
                        option === question.answer &&
                        "bg-green-600 text-white" // Highlight correct answer in green if selected
                      } ${
                        selectedAnswers[index] &&
                        option !== question.answer &&
                        selectedAnswers[index] === option &&
                        "bg-red-600 text-white" // Highlight wrong answer in red if selected
                      }`}
                      onClick={() => handleAnswerClick(index, option)} // Handle option click
                    >
                      {option}
                    </li>
                  ))}
                </ul>

                {/* Show correct answer and explanation once the user clicks an option */}
                {selectedAnswers[index] && (
                  <>
                    <p className="mt-4 text-green-400">
                      <span className="font-semibold">Correct Answer:</span>{" "}
                      {question.answer}
                    </p>
                    <p className="mt-2 text-gray-400">
                      <span className="font-semibold">Explanation:</span>{" "}
                      {question.explanation}
                    </p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
