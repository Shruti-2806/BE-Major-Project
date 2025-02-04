'use client';

import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { AlertCircle } from 'lucide-react';

const DsaDesc = () => {
  const { id } = useParams();
  console.log(id)
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const loc=useLocation();
  console.log(loc)

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.post(`http://43.204.230.35/description`, { id });
        console.log('API Response:', response.data);
        if (response.data.status === 'OK') {
          setQuestion(response.data.data);
        } else {
          setError('No question found');
        }
      } catch (err) {
        console.error('Error fetching question:', err);
        setError('Error fetching question details');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-gray-200 rounded-lg p-6 shadow-lg">
          <div className="h-8 bg-gray-300 rounded mb-4"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-red-600 text-white rounded-lg p-4 flex items-center">
          <AlertCircle className="h-4 w-4 mr-2" />
          <div>
            <h4 className="font-bold">Error</h4>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-red-600 text-white rounded-lg p-4 flex items-center">
          <AlertCircle className="h-4 w-4 mr-2" />
          <div>
            <h4 className="font-bold">Error</h4>
            <p>No question data available.</p>
          </div>
        </div>
      </div>
    );
  }

  const { question: questionData, tests } = question;


  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full bg-gray-100 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-3xl font-bold text-black">{questionData.name}</h1>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2 text-black">Description</h2>
            <p className=" text-lg text-gray-800 whitespace-pre-wrap ">{questionData.description}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2 text-black">Test Cases</h2>
            {tests && tests.length > 0 ? (
              <ul className="space-y-4">
                {tests.map((test) => (
                  <li key={test.id} className="bg-gray-200 p-4 rounded-md">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium text-black">Input:</h3>
                        <pre className="mt-1 text-sm bg-gray-300 p-2 rounded text-black">{test.input}</pre>
                      </div>
                      <div>
                        <h3 className="font-medium text-black">Output:</h3>
                        <pre className="mt-1 text-sm bg-gray-300 p-2 rounded text-black">{test.output}</pre>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-800">No test cases available.</p>
            )}
          </div>
        </div>

        {/* Button added here */}
        <div className="mt-6">
        <Link to={`/dsa/ide/${questionData.id}`}>
          <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-blue-600 transition duration-200">
            Code
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DsaDesc;
