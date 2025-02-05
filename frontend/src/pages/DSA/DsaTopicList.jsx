import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";

const DsaTopicList = () => {
  const [subtopics, setSubtopics] = useState([]);
  const loc=useLocation();
  console.log(loc)

  useEffect(() => {
    const fetchSubtopics = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/topics"
        );

        console.log(response.data); // Log the response data

        // Access the "data" property from the response
        if (response.data.status === "OK" && Array.isArray(response.data.data)) {
          const formattedSubtopics = response.data.data.map((name, index) => ({
            _id: index, // Using index as a unique identifier for now
            name: name
          }));
          setSubtopics(formattedSubtopics);
        } else {
          console.error("No subtopics found");
        }
      } catch (error) {
        console.error("Error fetching subtopics:", error.message);
        if (error.response) {
          console.error("Response Data:", error.response.data);
        }
      }
    };

    fetchSubtopics();
  }, []);

  return (
    <div className="min-h-screen text-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4">
            Learn DSA
          </h1>
          <div className="w-32 h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mx-auto mb-8 rounded-full"></div>
          <p
            className="text-2xl text-gray-500 max-w-3xl mx-auto"
            style={{ fontFamily: "Nunito" }}
          >
            A comprehensive list of DSA topics to help you master data structures and algorithms.
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
                <th className="px-6 py-4 text-left text-lg font-semibold border-b border-gray-600 flex justify-end">
                  Actions
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
                      {subtopic.name}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-600">
  <div className="flex justify-end space-x-4">
  <Link to={`/dsa/learn/${subtopic.name}`}>
    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
      Learn
    </button>
    </Link>
   
    <Link to={`/dsa/questions/${subtopic.name}`}>
    <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" >
      Practice
    </button>
    </Link>
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

export default DsaTopicList;
