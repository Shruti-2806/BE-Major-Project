"use client"

import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Timer, CheckCircle, Circle, HelpCircle, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";

export default function AssessmentTest() {
  const { tab, mode } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionData, companyId, companyName, allSections } = location.state || {};

  const [activeTab, setActiveTab] = useState(tab || allSections?.[0]?.["section-id"] || allSections?.[0]?.["ques-id"]);
  const [timeLeft, setTimeLeft] = useState(7200);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [questionStats, setQuestionStats] = useState({ answered: 0, visited: 0, notAnswered: 5 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!allSections?.length) {
      navigate("/", { replace: true });
      return;
    }

    if (tab) {
      const validTab = allSections.find((section) => (section["section-id"] || section["ques-id"]) === tab);
      if (!validTab) {
        navigate(`/assessment/${mode}/${allSections[0]["section-id"] || allSections[0]["ques-id"]}`, {
          state: location.state,
          replace: true,
        });
      }
    }
  }, [tab, mode, navigate, allSections, location.state]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getIcon = (name) => {
    return BookOpen;
  };

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    navigate(`/assessment/${mode}/${newTab}`, { state: location.state });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
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

      <div className="flex h-[calc(100vh-88px)]">
        <div className={`${isSidebarCollapsed ? "w-16" : "w-64"} bg-gray-800 border-r border-gray-700 relative`}>
          <button
            onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
            className="absolute -right-3 top-4 bg-gray-700 rounded-full p-1 border border-gray-600 hover:bg-gray-600"
          >
            {isSidebarCollapsed ? <ChevronRight className="w-4 h-4 text-gray-400" /> : <ChevronLeft className="w-4 h-4 text-gray-400" />}
          </button>

          {allSections?.map((section) => {
            const Icon = getIcon(section.name);
            const sectionId = section["section-id"] || section["ques-id"];
            return (
              <button
                key={sectionId}
                onClick={() => handleTabChange(sectionId)}
                className={`w-full flex items-center gap-3 px-6 py-4 ${
                  activeTab === sectionId ? "bg-gradient-to-r from-blue-400/10 to-purple-400/10 border-r-4 border-purple-400" : "hover:bg-gray-700"
                }`}
              >
                <Icon className={`w-5 h-5 ${activeTab === sectionId ? "text-purple-400" : "text-gray-400"}`} />
                {!isSidebarCollapsed && <span className={activeTab === sectionId ? "text-purple-400 font-medium" : "text-gray-400"}>{section.name}</span>}
              </button>
            );
          })}
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">
              {allSections?.find((section) => (section["section-id"] || section["ques-id"]) === activeTab)?.name}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}