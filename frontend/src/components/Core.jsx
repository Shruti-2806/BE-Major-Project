import React from "react";
// import Learndbms from "./Learndbms";
import { Link } from "react-router-dom";
export default function Core() {
  const subjects = [
    {
      name: "Operating System",
      importance:
        "Understanding OS concepts is crucial for system-level programming and optimizing application performance.",
      image:
        "https://uxwing.com/wp-content/themes/uxwing/download/computers-mobile-hardware/operating-system-icon.png",
    },
    {
      name: "Database Management Systems",
      importance:
        "Knowledge of DBMS is essential for designing efficient data storage solutions and writing optimized queries.",
      image:
        "https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/database-icon.png",
      learnLink: "/learndbms",
      practiseLink: "/practisedbms",
    },
    {
      name: "CS Fundamentals",
      importance:
        "Strong CS fundamentals form the backbone of problem-solving skills and algorithmic thinking.",
      image:
        "https://uxwing.com/wp-content/themes/uxwing/download/education-school/study-icon.png",
    },
    {
      name: "Object-Oriented Programming",
      importance:
        "OOPS concepts are fundamental to modern software development and a key requirement in many job roles.",
      image: "/src/assets/oops.png",
    },
  ];

  return (
    <div className="min-h-screen from-blue-900 via-purple-900 to-pink-800 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4">
            CORE SUBJECTS
          </h1>
          <div className="w-32 h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mx-auto mb-8 rounded-full"></div>
          <p
            className="text-2xl text-gray-500 max-w-3xl mx-auto"
            style={{ fontFamily: "Nunito" }}
          >
            Master these fundamental subjects to excel in your tech career and
            ace your placements.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {subjects.map((subject, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden group"
            >
              <div className="flex flex-col items-center space-y-4 pb-2 relative p-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <img
                    src={subject.image}
                    alt={subject.name}
                    className="rounded-full w-16 h-16"
                  />
                </div>
                <h2
                  className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
                  style={{ fontFamily: "Nunito" }}
                >
                  {subject.name}
                </h2>
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 opacity-10 rounded-full blur-2xl transform translate-x-12 -translate-y-12"></div>
              </div>
              <div className="px-6 py-4">
                <p className="text-gray-300 text-center">
                  {subject.importance}
                </p>
              </div>
              <div className="flex justify-center space-x-4 py-4">
                {subject.learnLink ? (
                  <Link to={subject.learnLink}>
                    <button className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white  py-2 px-4 rounded-full hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-lg">
                      Learn
                    </button>
                  </Link>
                ) : (
                  <button className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white py-2 px-4 rounded-full hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-lg">
                    Learn
                  </button>
                )}
                {subject.practiseLink ? (
                  <Link to={subject.practiseLink}>
                    <button className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white  py-2 px-4 rounded-full hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-lg">
                      Practise
                    </button>
                  </Link>
                ) : (
                  <button className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white py-2 px-4 rounded-full hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-lg">
                    Practise
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center mb-16">
          <p
            className="text-center text-gray-500 max-w-3xl  text-lg"
            style={{ fontFamily: "Nunito" }}
          >
            These core subjects are fundamental to computer science and are
            highly valued in the job market. They provide a strong foundation
            for problem-solving, system design, and software development, making
            them crucial areas of focus for students preparing for placements in
            the tech industry.
          </p>
        </div>
      </div>
    </div>
  );
}
