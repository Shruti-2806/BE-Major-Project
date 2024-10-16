import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios"; // Ensure axios is imported

const AptitudeTopicList = () => {
  const { topicId } = useParams();
  const [subtopics, setSubtopics] = useState([]);

  useEffect(() => {
    const fetchSubtopics = async () => {
      try {
        // Await the axios request
        const response = await axios.get("http://localhost:3000/api/aptitude/topics", {
          params: { topicId: topicId }
        });

        console.log(response.data); 
        if (Array.isArray(response.data) && response.data.length > 0) {
          setSubtopics(response.data);
        } else {
          console.error("No subtopics found");
        }
      } catch (error) {
        console.error(
          "Error fetching subtopics:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchSubtopics();
  }, [topicId]);

  // Randomized progress (adjustable between 10% and 90%)
  const getRandomProgress = () => Math.floor(Math.random() * (90 - 10 + 1)) + 10;

  return (
    <div className="min-h-screen text-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4">
            Learn Aptitude
          </h1>
          <div className="w-32 h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mx-auto mb-8 rounded-full"></div>
          <p
            className="text-2xl text-gray-500 max-w-3xl mx-auto"
            style={{ fontFamily: "Nunito" }}
          >
            A comprehensive list of aptitude subtopics to help you master important concepts.
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
                  Subtopic Name
                </th>
                <th className="px-6 py-4 text-left text-lg font-semibold border-b border-gray-600">
                  Progress
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800">
              {subtopics.map((subtopic, index) => (
                <tr
                  key={subtopic._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                  } hover:bg-gray-600 transition-colors duration-300`}
                >
                  <td className="px-6 py-4 text-lg text-gray-300 border-b border-gray-600">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-lg font-medium text-gray-200 border-b border-gray-600">
				  <Link to={`/aptitude/${subtopic._id}/practise`}>
                      {subtopic.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 border-b border-gray-600">
                    <div className="relative w-full h-4 bg-gray-700 rounded-full">
                      <div
                        className="absolute h-full bg-green-500 rounded-full"
                        style={{ width: `${getRandomProgress()}%` }} // Randomized progress
                      />
                    </div>
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

export default AptitudeTopicList;
