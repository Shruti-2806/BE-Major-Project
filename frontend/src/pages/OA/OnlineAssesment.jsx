import { useState, useEffect } from "react";
import { FaCode, FaCalculator, FaBook, FaLanguage } from "react-icons/fa";

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case "Hard":
      return "bg-red-500 text-white";
    case "Medium":
      return "bg-yellow-500 text-white";
    case "Medium-Hard":
      return "bg-orange-500 text-white";
    default:
      return "bg-green-500 text-white";
  }
};

export default function OnlineAssessment() {
  const [searchQuery, setSearchQuery] = useState("");
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch("http://43.204.230.35/company", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const result = await response.json();
        console.log("Fetched companies:", result); 
    
        if (result && result.status === "OK" && Array.isArray(result.data)) {
          setCompanies(result.data); 
        } else {
          console.error("Unexpected response format:", result);
          setCompanies([]); 
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
        setCompanies([]); 
      } finally {
        setLoading(false);  
      }
    };
    

    fetchCompanies();
  }, []);

  if (loading) return <p className="text-center text-gray-700">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Navigation */}
        <nav className="flex justify-between mb-8 border-b pb-4">
          <h2 className="text-3xl font-extrabold text-gray-900">Companies</h2>
        </nav>

        {/* Search */}
        <div className="relative mb-8">
          <input
            type="text"
            className="w-full pl-10 bg-white border border-gray-300 rounded-lg py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
            placeholder="Search companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Company Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(companies) &&
            companies
              .filter((company) =>
                company.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((company) => (
                <div
                  key={company.id}
                  className="bg-white rounded-lg shadow-xl hover:shadow-2xl transform transition duration-300 hover:scale-105 p-6"
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <img
                      src={company.link}
                      alt={`${company.name} logo`}
                      className="w-30 h-16 rounded-full object-cover shadow-md"
                    />
                    <h3 className="text-2xl font-semibold text-gray-900">
                      {company.name}
                    </h3>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        OA Length:
                      </h4>
                      <p className="text-lg text-gray-800">{company.length}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        OA Difficulty:
                      </h4>
                      <span
                        className={`inline-block px-4 py-2 rounded-lg text-xs font-medium ${getDifficultyColor(
                          company.difficulty
                        )}`}
                      >
                        {company.difficulty}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Question Counts:
                      </h4>
                      <div className="flex flex-wrap gap-4">
                        {company.dsa > 0 && (
                          <div className="flex items-center gap-2">
                            <FaCode className="text-blue-500" />
                            <span className="bg-blue-100 text-blue-700 py-1 px-3 rounded-full text-sm">
                              DSA: {company.dsa}
                            </span>
                          </div>
                        )}

                        {company.aptitude > 0 && (
                          <div className="flex items-center gap-2">
                            <FaCalculator className="text-green-500" />
                            <span className="bg-green-100 text-green-700 py-1 px-3 rounded-full text-sm">
                              Aptitude: {company.aptitude}
                            </span>
                          </div>
                        )}

                        {company.core > 0 && (
                          <div className="flex items-center gap-2">
                            <FaBook className="text-yellow-500" />
                            <span className="bg-yellow-100 text-yellow-700 py-1 px-3 rounded-full text-sm">
                              Core Subjects: {company.core}
                            </span>
                          </div>
                        )}

                        {company.english > 0 && (
                          <div className="flex items-center gap-2">
                            <FaLanguage className="text-red-500" />
                            <span className="bg-red-100 text-red-700 py-1 px-3 rounded-full text-sm">
                              English: {company.english}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
