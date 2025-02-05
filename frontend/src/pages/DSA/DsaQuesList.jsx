import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // Import Link for navigation
import axios from "axios";

const DsaQuesList = () => {
  const { name } = useParams(); // Get the topic name from the route parameters
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Make a POST request to fetch questions based on the topic name
        const response = await axios.post("http://localhost:8080/questions", {
          tag: name 
        });

        console.log(response.data); // Log the response data

        // Check if response is OK and has question data
        if (response.data.status === "OK" && Array.isArray(response.data.data)) {
          setQuestions(response.data.data);
        } else {
          console.error("No questions found");
        }
      } catch (error) {
        console.error("Error fetching questions:", error.message);
        if (error.response) {
          console.error("Response Data:", error.response.data);
        }
      }
    };

    fetchQuestions();
  }, [name]);

  return (
    <div className="min-h-screen text-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4">
            Questions for {name}
          </h1>
          <p className="text-2xl text-gray-500 max-w-3xl mx-auto" style={{ fontFamily: "Nunito" }}>
            Practice questions to enhance your skills in {name}.
          </p>
        </div>

        <div className="bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white">
                <th className="px-6 py-4 text-left text-lg font-semibold border-b border-gray-600">
                  S.No
                </th>
                <th className="px-6 py-4 text-left text-lg font-semibold border-b border-gray-600">
                  Question Name
                </th>
                <th className="px-6 py-4 text-left text-lg font-semibold border-b border-gray-600">
                  Tag
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800">
              {questions.map((question, index) => (
                <tr
                  key={question.id}
                  className="hover:bg-gray-600 transition-colors duration-300"
                >
                  <td className="px-6 py-4 text-lg text-gray-300 border-b border-gray-600">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-lg font-medium text-gray-200 border-b border-gray-600">
                    <Link to={`/dsa/descriptions/${question.id}`}>
                      {question.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-gray-400 border-b border-gray-600">
                    {question.tag}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DsaQuesList;
