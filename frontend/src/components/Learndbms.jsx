import React, { useRef, useState } from "react";

const topics = [
  {
    name: "Relational Databases",
    progress: 70,
    description:
      "Relational databases store data in tables that can be linked to one another. They use Structured Query Language (SQL) for data manipulation.",
    keyConcepts: [
      "Normalization",
      "Primary Keys",
      "Foreign Keys",
      "Joins",
      "Transactions",
    ],
    commonProblems: ["SQL Queries", "Data Integrity", "Database Design"],
  },
  {
    name: "NoSQL Databases",
    progress: 60,
    description:
      "NoSQL databases are designed for unstructured data and use various data models such as key-value, document, and graph.",
    keyConcepts: [
      "Document Stores",
      "Key-Value Stores",
      "Column Family Stores",
      "Graph Databases",
    ],
    commonProblems: ["Data Modeling", "Query Performance", "Sharding"],
  },
  {
    name: "databaseTransactions",
    progress: 80,
    description:
      "Database transactions are sequences of operations performed as a single logical unit of work. They ensure data integrity.",
    keyConcepts: [
      "ACID Properties",
      "Transaction Control",
      "Rollback",
      "Commit",
    ],
    commonProblems: ["Deadlocks", "Concurrency Control"],
  },
  {
    name: "indexing",
    progress: 50,
    description:
      "Indexing improves the speed of data retrieval operations on a database at the cost of additional space.",
    keyConcepts: ["B-trees", "Hash Indexes", "Full-text Indexes"],
    commonProblems: ["Index Optimization", "Query Performance"],
  },
  {
    name: "databaseNormalization",
    progress: 65,
    description:
      "Normalization is the process of organizing data to reduce redundancy and improve data integrity.",
    keyConcepts: ["1NF", "2NF", "3NF", "BCNF", "Denormalization"],
    commonProblems: ["Redundant Data", "Update Anomalies"],
  },
];

export const Learndbms = () => {
  const [activeSection, setActiveSection] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const topicRefs = useRef({});

  const scrollToTopic = (topic) => {
    topicRefs.current[topic]?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(topic);
  };

  const filteredTopics = topics.filter(
    (topic) =>
      topic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.keyConcepts.some((concept) =>
        concept.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      topic.commonProblems.some((problem) =>
        problem.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="flex flex-col">
      <header className=" text-white p-4 ">
        <div className="container mx-auto flex justify-end items-center">
          <div className="relative w-64 jus">
            <input
              type="search"
              placeholder="Search topics..."
              className="pl-10 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-purple-300 text-black "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M16.65 10.65A6.5 6.5 0 1110.65 4.65 6.5 6.5 0 0116.65 10.65z"
              />
            </svg>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden shadow-lg rounded-lg p-4">
        {/* Left sidebar with topics */}
        <aside className="w-64  overflow-y-auto sbg-white shadow-2xl rounded-2xl p-4  ">
          <h2 className="text-lg font-semibold mb-4 text-purple-700">
            DBMS Topics
          </h2>
          <nav className="space-y-2">
            {filteredTopics.map((topic) => (
              <button
                key={topic.name}
                className={`w-full text-left p-2 rounded-md transition-colors 
                  ${
                    activeSection === topic.name
                      ? "bg-purple-300 text-purple-800"
                      : "hover:bg-purple-200"
                  }`}
                onClick={() => scrollToTopic(topic.name)}
              >
                {topic.name.replace(/([A-Z])/g, " $1").trim()}
              </button>
            ))}
          </nav>
        </aside>

        {/* Right content area */}
        <main className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto p-8">
            <div className="space-y-8">
              {filteredTopics.map((topic) => (
                <section
                  key={topic.name}
                  ref={(el) => (topicRefs.current[topic.name] = el)}
                  className="mb-12"
                >
                  <div className="bg-white">
                    <h2 className="text-2xl font-bold flex items-center mb-2">
                      <span className="mr-2 text-purple-700">
                        {topic.name.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                    </h2>
                    <div className="relative mb-4">
                      <div className="h-2 " />
                    </div>
                    <p className="text-gray-600 mb-4">{topic.description}</p>
                    <h3 className="text-xl font-semibold mb-2">Key Concepts</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {topic.keyConcepts.map((concept, index) => (
                        <li key={index}>{concept}</li>
                      ))}
                    </ul>
                    <h3 className="text-xl font-semibold mt-4 mb-2">
                      Common Problems
                    </h3>
                    <ul className="list-decimal list-inside space-y-1 text-gray-700">
                      {topic.commonProblems.map((problem, index) => (
                        <li key={index}>{problem}</li>
                      ))}
                    </ul>
                  </div>
                </section>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
