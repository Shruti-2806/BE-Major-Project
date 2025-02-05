import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

const AssessmentDashboard = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  
  const calculateWeightedScore = (score, maxScore, weightage) => {
    return (score / maxScore) * weightage;
  };
  
  const assessmentData = {
    overall: 57,
    sections: {
      dsa: {
        score: 25,
        maxScore: 50,
        timeSpent: 45,
        avgTime: 35,
        currentRating: 1200,
        newRating: 1145,
        ratingDelta: -55,
        totalQuestions: 20,
        correctAnswers: 10,
        weightage: 50,
        questionTimeData: [
          { question: 'Q1', time: 2.5, avgTime: 2 },
          { question: 'Q2', time: 3.2, avgTime: 2.5 },
          { question: 'Q3', time: 1.8, avgTime: 2.2 },
          { question: 'Q4', time: 4.0, avgTime: 2.8 },
          { question: 'Q5', time: 2.1, avgTime: 2.3 }
        ],
        performanceHistory: [
          { month: 'Sep', rating: 1150 },
          { month: 'Oct', rating: 1200 },
          { month: 'Nov', rating: 1180 },
          { month: 'Dec', rating: 1145 }
        ]
      },
      technical: {
        score: 22,
        maxScore: 25,
        timeSpent: 30,
        avgTime: 25,
        currentRating: 1150,
        newRating: 1210,
        ratingDelta: 60,
        totalQuestions: 15,
        correctAnswers: 12,
        weightage: 25,
        questionTimeData: [
          { question: 'Q1', time: 1.5, avgTime: 2 },
          { question: 'Q2', time: 2.2, avgTime: 2.5 },
          { question: 'Q3', time: 1.8, avgTime: 2.2 },
          { question: 'Q4', time: 2.0, avgTime: 2.8 },
          { question: 'Q5', time: 1.9, avgTime: 2.3 }
        ],
        performanceHistory: [
          { month: 'Sep', rating: 1100 },
          { month: 'Oct', rating: 1120 },
          { month: 'Nov', rating: 1150 },
          { month: 'Dec', rating: 1210 }
        ]
      },
      aptitude: {
        score: 10,
        maxScore: 25,
        timeSpent: 20,
        avgTime: 30,
        currentRating: 1300,
        newRating: 1248,
        ratingDelta: -52,
        totalQuestions: 10,
        correctAnswers: 4,
        weightage: 25,
        questionTimeData: [
          { question: 'Q1', time: 3.5, avgTime: 2 },
          { question: 'Q2', time: 3.2, avgTime: 2.5 },
          { question: 'Q3', time: 2.8, avgTime: 2.2 },
          { question: 'Q4', time: 3.0, avgTime: 2.8 },
          { question: 'Q5', time: 2.9, avgTime: 2.3 }
        ],
        performanceHistory: [
          { month: 'Sep', rating: 1350 },
          { month: 'Oct', rating: 1320 },
          { month: 'Nov', rating: 1300 },
          { month: 'Dec', rating: 1248 }
        ]
      }
    }
  };

  const calculatePercentage = (score, maxScore) => {
    return Math.round((score / maxScore) * 100);
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return 'bg-green-600';
    if (percentage >= 50) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  const getSectionTitle = (section) => {
    return section.charAt(0).toUpperCase() + section.slice(1);
  };

  const RatingChange = ({ currentRating, newRating, ratingDelta }) => (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">Current Rating</span>
        <span className="font-medium">{currentRating}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">New Rating</span>
        <span className="font-medium">{newRating}</span>
      </div>
      <div className="flex items-center justify-end mt-1">
        {ratingDelta > 0 ? (
          <FaArrowUp className="w-4 h-4 mr-1 text-green-600" />
        ) : (
          <FaArrowUp className="w-4 h-4 mr-1 text-red-600" />
        )}
        <span className={`font-bold ${ratingDelta > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {ratingDelta > 0 ? '+' : ''}{ratingDelta}
        </span>
      </div>
    </div>
  );

  const PerformanceGraphs = ({ data }) => (
    <div className="space-y-6 mt-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="text-lg font-medium">Time per Question vs Average</div>
        <div className="h-64 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.questionTimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="question" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="time" fill="#4f46e5" name="Your Time" />
              <Bar dataKey="avgTime" fill="#94a3b8" name="Average Time" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="text-lg font-medium">Rating History</div>
        <div className="h-64 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.performanceHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="rating" 
                stroke="#4f46e5" 
                strokeWidth={2}
                dot={{ fill: '#4f46e5' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const DetailedAnalysis = ({ section, data }) => {
    const percentage = calculatePercentage(data.score, data.maxScore);
    
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="text-sm text-gray-500">Time Spent</div>
            <div className="flex items-center mt-2">
              <span className="text-xl font-bold">{data.timeSpent} min</span>
              <span className="text-sm ml-2 text-gray-500">/ {data.avgTime} min avg</span>
            </div>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="text-sm text-gray-500">Rating</div>
            <RatingChange 
              currentRating={data.currentRating}
              newRating={data.newRating}
              ratingDelta={data.ratingDelta}
            />
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm text-gray-500">Questions</div>
                <div className="text-xl font-bold mt-1">
                  {data.correctAnswers} / {data.totalQuestions}
                </div>
              </div>
              <div className="text-2xl font-bold flex flex-col items-end">
                <span className={getScoreColor(percentage)}>
                  {data.score} / {data.maxScore}
                </span>
                <span className={`text-sm ${getScoreColor(percentage)}`}>
                  ({percentage}%)
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
              <div
                className={`h-2 rounded-full ${getProgressColor(percentage)}`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">Assessment Dashboard</h1>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {['dsa', 'technical', 'aptitude'].map((section) => (
          <div key={section} className="space-y-4">
            <div className="bg-white shadow-md rounded-lg p-6">
              <div
                className="cursor-pointer font-medium text-xl"
                onClick={() => setSelectedSection(section)}
              >
                {getSectionTitle(section)} - 
                {calculatePercentage(assessmentData.sections[section].score, assessmentData.sections[section].maxScore)}%
              </div>
              {selectedSection === section && (
                <>
                  <DetailedAnalysis section={section} data={assessmentData.sections[section]} />
                  <PerformanceGraphs data={assessmentData.sections[section]} />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssessmentDashboard;
