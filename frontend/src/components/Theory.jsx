import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Theory = () => {
  const { id } = useParams();
  const [subtopic, setSubtopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubtopic = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/core/subtopics/${id}`
        );
        console.log(response.data); // Log the data to check
        setSubtopic(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSubtopic();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col h-screen p-8 bg-gray-100 text-gray-900">
      <Link
        to={`/core/${subtopic.topic}/subtopic`}
        className="mb-4 inline-block"
      >
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300 shadow-md">
          &lt; Back to DBMS Topics
        </button>
      </Link>
      <div className="flex-grow flex items-center justify-center">
        {subtopic ? (
          <div className="bg-white p-8 rounded-lg shadow-lg w-full h-full overflow-auto">
            <h1 className="text-4xl font-bold mb-4">{subtopic.name}</h1>
            <p className="text-gray-700 mb-4 whitespace-pre-line">
              {subtopic.theory}
            </p>
            <button
              onClick={() => {
                navigate(`/core/subtopics/${subtopic._id}`);
              }}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
            >
              Practice
            </button>
          </div>
        ) : (
          <p className="text-gray-700">Subtopic not found.</p>
        )}
      </div>
    </div>
  );
};

export default Theory;
