import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams

export const AptitudePractice = () => {
  const { topicId } = useParams(); 
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Hardcoded data for aptitude questions
  const hardcodedQuestions = [
    {
      id: "1",
      subtopic: { name: "Profit and Loss" },
      question: "A man buys an article for ₹200 and sells it for ₹250. What is the profit percentage?",
      options: ["20%", "25%", "30%", "40%"],
      answer: "25%",
      explanation: "Profit = Selling Price - Cost Price = 250 - 200 = ₹50. Profit Percentage = (Profit/Cost Price) × 100 = (50/200) × 100 = 25%"
    },
    {
      id: "2",
      subtopic: { name: "Simple Interest" },
      question: "What is the simple interest on ₹1000 at 5% annual interest for 3 years?",
      options: ["₹150", "₹175", "₹100", "₹120"],
      answer: "₹150",
      explanation: "Simple Interest (SI) = (P × R × T) / 100 = (1000 × 5 × 3) / 100 = ₹150"
    },
    {
      id: "3",
      subtopic: { name: "Time and Work" },
      question: "If 5 men can do a work in 10 days, in how many days can 10 men complete the same work?",
      options: ["2 days", "5 days", "10 days", "20 days"],
      answer: "5 days",
      explanation: "Work done is inversely proportional to the number of men. So, if 5 men take 10 days, 10 men will take 5 days."
    },
    {
      id: "4",
      subtopic: { name: "Speed and Distance" },
      question: "A train travels 240 km in 4 hours. What is its speed?",
      options: ["50 km/h", "60 km/h", "70 km/h", "80 km/h"],
      answer: "60 km/h",
      explanation: "Speed = Distance / Time = 240 km / 4 hours = 60 km/h"
    },
    {
      id: "5",
      subtopic: { name: "Ratio and Proportion" },
      question: "In a ratio 3:4, if the total quantity is 700, what is the first part?",
      options: ["300", "350", "400", "450"],
      answer: "300",
      explanation: "Let the total parts be 3 + 4 = 7. First part = (3/7) × 700 = 300"
    },
    {
      id: "6",
      subtopic: { name: "Percentage" },
      question: "A student scored 80% marks in an exam. If the total marks are 500, what is the number of marks scored by the student?",
      options: ["350", "400", "450", "480"],
      answer: "400",
      explanation: "Marks scored = 80% of 500 = (80/100) × 500 = 400"
    },
    {
      id: "7",
      subtopic: { name: "Time and Distance" },
      question: "A car travels 150 km in 3 hours. What is the average speed?",
      options: ["45 km/h", "50 km/h", "55 km/h", "60 km/h"],
      answer: "50 km/h",
      explanation: "Average speed = Total distance / Total time = 150 km / 3 hours = 50 km/h"
    },
    {
      id: "8",
      subtopic: { name: "Ages" },
      question: "A father is 4 times as old as his son. If the sum of their ages is 50 years, what are their ages?",
      options: ["40 and 10", "36 and 9", "44 and 11", "48 and 12"],
      answer: "40 and 10",
      explanation: "Let son's age be x. Father's age = 4x. Sum of their ages = x + 4x = 50. So, x = 10. Father’s age = 40, Son’s age = 10."
    }
  ];

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Simulate a delay to mimic API request
    setTimeout(() => {
      setQuestions(hardcodedQuestions);
      setLoading(false);
    }, 500);
  }, []); // Fetch hardcoded data when component mounts

  const handleAnswerClick = (questionIndex, selectedOption) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: selectedOption,
    });
  };

  return (
    <div className="min-h-screen from-blue-900 via-purple-900 to-pink-800 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4">
            Practise Aptitude Questions
          </h1>
          <div className="w-32 h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mx-auto mb-8 rounded-full"></div>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading questions...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid md:grid-cols-1 gap-12 mb-16">
            {questions.map((question, index) => (
              <div
                key={question.id} // Use a unique key instead of index
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden group"
              >
                <div className="p-8">
                  {/* <h2
                    className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
                    style={{ fontFamily: "Nunito" }}
                  >
                    {question.subtopic.name}
                  </h2> */}
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
                          "bg-green-600 text-white"
                        } ${
                          selectedAnswers[index] &&
                          option !== question.answer &&
                          selectedAnswers[index] === option &&
                          "bg-red-600 text-white"
                        }`}
                        onClick={() => handleAnswerClick(index, option)}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>

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
        )}
      </div>
    </div>
  );
};

export default AptitudePractice;
