import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Timer, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";

export default function AssessmentTest() {
  const { tab, mode } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { companyId, companyName } = location.state || {};

  const [allSections, setAllSections] = useState([]);
  const [activeTab, setActiveTab] = useState(tab);
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours countdown
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sectionData, setSectionData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeDSAQuestion, setActiveDSAQuestion] = useState(0);

  // Fetch question data
  useEffect(() => {
    if (!companyId) {
      console.error("No companyId provided in location.state");
      setError("Company information missing.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    fetch("http://localhost:8080/question-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "company-id": companyId }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data);
        if (data.status === "OK") {
          const keys = Object.keys(data).filter((key) => key !== "status");
          if (keys.length === 0) {
            setError("No question data available.");
          } else {
            setAllSections(keys);
            setSectionData(data);
            setActiveTab(tab || keys[0]);
          }
        } else {
          setError("Unexpected data format from server.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
        setLoading(false);
      });
  }, [tab, companyId]);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 0 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    navigate(`/assessment/${mode}/${newTab}`, { state: location.state });
  };

  const renderDSAQuestion = (question, index) => (
    <div key={question.question.id} className="mb-6 p-4 bg-gray-700 rounded-lg">
      <h3 className="text-xl font-semibold">{question.question.name}</h3>
      <p className="mt-2">{question.question.description}</p>
      <div className="mt-3">
        <h4 className="text-sm font-semibold text-blue-400">Test Cases:</h4>
        {question.tests.map((test) => (
          <div key={test.id} className="mt-2 bg-gray-800 p-3 rounded-md">
            <p className="text-sm">Input: {test.input}</p>
            <p className="text-sm">Output: {test.output}</p>
          </div>
        ))}
      </div>
      {/* CodeEditor as a simple textarea */}
      <textarea
        className="w-full h-72 bg-gray-800 text-white p-4 mt-4 rounded-md"
        placeholder="Write your code here..."
        rows={10}
        cols={50}
        onChange={(e) => console.log(e.target.value)}
      />
    </div>
  );

  const renderQuestion = (question, index) => {
    if (activeTab === "dsa") {
      return index === activeDSAQuestion ? renderDSAQuestion(question, index) : null;
    }
    return (
      <div key={question.id} className="mb-6 p-4 bg-gray-700 rounded-lg">
        <p className="text-lg">{question.description}</p>
        <div className="grid grid-cols-2 gap-3 mt-3">
          <button className="p-2 bg-gray-600 rounded-md hover:bg-blue-500">{question.option1}</button>
          <button className="p-2 bg-gray-600 rounded-md hover:bg-blue-500">{question.option2}</button>
          <button className="p-2 bg-gray-600 rounded-md hover:bg-blue-500">{question.option3}</button>
          <button className="p-2 bg-gray-600 rounded-md hover:bg-blue-500">{question.option4}</button>
        </div>
      </div>
    );
  };

  // Extract DSA questions (or default to an empty array if not available)
  const dsaQuestions = sectionData?.dsa || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <div className="p-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Timer className="w-6 h-6 text-pink-400" />
            <span className="text-2xl font-bold bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-88px)]">
        {/* Sidebar */}
        <div className={`${isSidebarCollapsed ? "w-16" : "w-64"} bg-gray-800 border-r border-gray-700 relative`}>
          <button
            onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
            className="absolute -right-3 top-4 bg-gray-700 rounded-full p-1 border border-gray-600 hover:bg-gray-600"
          >
            {isSidebarCollapsed ? (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-gray-400" />
            )}
          </button>

          {loading && <div className="text-gray-400 text-center p-4">Loading sections...</div>}
          {error && <div className="text-red-500 text-center p-4">{error}</div>}
          {!loading &&
            !error &&
            allSections?.map((section) => (
              <button
                key={section}
                onClick={() => handleTabChange(section)}
                className={`w-full flex items-center gap-3 px-6 py-4 ${
                  activeTab === section
                    ? "bg-gradient-to-r from-blue-400/10 to-purple-400/10 border-r-4 border-purple-400"
                    : "hover:bg-gray-700"
                }`}
              >
                <BookOpen className={`w-5 h-5 ${activeTab === section ? "text-purple-400" : "text-gray-400"}`} />
                {!isSidebarCollapsed && (
                  <span className={activeTab === section ? "text-purple-400 font-medium" : "text-gray-400"}>
                    {section.toUpperCase()}
                  </span>
                )}
              </button>
            ))}

          {/* Render DSA questions in Sidebar if active tab is "dsa" */}
          {activeTab === "dsa" &&
            dsaQuestions.map((question, index) => (
              <button
                key={question.question.id}
                onClick={() => setActiveDSAQuestion(index)}
                className={`w-full flex items-center gap-3 px-6 py-4 ${
                  activeDSAQuestion === index ? "bg-purple-400" : "hover:bg-gray-700"
                }`}
              >
                <span className={`text-sm ${activeDSAQuestion === index ? "text-white" : "text-gray-400"}`}>
                  {question.question.name}
                </span>
              </button>
            ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">{activeTab?.toUpperCase()}</h2>

            {/* Render Questions for active tab */}
            {sectionData[activeTab]?.map((question, index) =>
              renderQuestion(question, index)
            )}

            {/* Navigation for DSA questions */}
            {activeTab === "dsa" && dsaQuestions.length > 0 && (
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setActiveDSAQuestion((prev) => Math.max(0, prev - 1))}
                  disabled={activeDSAQuestion === 0}
                  className="px-4 py-2 bg-blue-500 rounded-md disabled:bg-gray-600"
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    setActiveDSAQuestion((prev) =>
                      Math.min(dsaQuestions.length - 1, prev + 1)
                    )
                  }
                  disabled={activeDSAQuestion === dsaQuestions.length - 1}
                  className="px-4 py-2 bg-blue-500 rounded-md disabled:bg-gray-600"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
