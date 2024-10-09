import React from "react";
import { Link } from "react-router-dom";

export const Apptitude = () => {
  const aptitudeTopics = [
    {
      name: "Logical Reasoning",
      importance:
        "Logical reasoning helps develop critical thinking skills, which are essential for solving complex problems in competitive exams and interviews.",
      image: "/src/assets/logical-reasoning.png",
      practiseLink: "/practicelogicalreasoning",
    },
    {
      name: "Quantitative Aptitude",
      importance:
        "Quantitative aptitude focuses on mathematical problem-solving, crucial for aptitude tests in placement exams and standardized tests.",
      image: "/src/assets/quantitative.png",
      practiseLink: "/practicequantitativeaptitude",
    },
    {
      name: "Verbal Ability",
      importance:
        "Strong verbal ability is key for communication, comprehension, and linguistic problem-solving in aptitude exams and interviews.",
      image: "/src/assets/verbal.png",
      practiseLink: "/practiceverbalability",
    },
    {
      name: "Data Interpretation",
      importance:
        "Data interpretation enhances the ability to analyze and draw insights from data, which is critical for decision-making in business scenarios.",
      image: "/src/assets/data-interpretation.png",
      practiseLink: "/practicedatainterpretation",
    },
  ];

  return (
    <div className="min-h-screen from-blue-900 via-purple-900 to-pink-800 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4">
            Aptitude
          </h1>
          <div className="w-20 h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mx-auto mb-6 rounded-full"></div>
          <p
            className="text-xl text-gray-500 max-w-3xl mx-auto"
            style={{ fontFamily: "Nunito" }}
          >
            Sharpen your logical thinking and problem-solving skills to tackle
            aptitude tests and stand out in competitive exams.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {aptitudeTopics.map((aptitudeTopic, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-xl overflow-hidden group relative"
              style={{
                width: "280px",
                height: "280px",
                margin: "auto",
                position: "relative",
              }}
            >
              <div className="flex flex-col items-center space-y-3 relative p-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={aptitudeTopic.image}
                    alt={aptitudeTopic.name}
                    className="rounded-full w-10 h-10"
                  />
                </div>
                <h2
                  className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-center"
                  style={{ fontFamily: "Nunito" }}
                >
                  {aptitudeTopic.name}
                </h2>
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 opacity-10 rounded-full blur-2xl transform translate-x-6 -translate-y-6"></div>
              </div>
              <div className="px-4 py-2">
                <p className="text-gray-300 text-center text-sm">
                  {aptitudeTopic.importance}
                </p>
              </div>

              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <Link to={aptitudeTopic.practiseLink}>
                    <button className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white py-2 px-4 rounded-full hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm">
                      Practice
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center mb-12">
          <p
            className="text-center text-gray-500 max-w-3xl text-base"
            style={{ fontFamily: "Nunito" }}
          >
            Aptitude tests are essential for assessing critical thinking,
            logical reasoning, and problem-solving skills. They are a key
            component in competitive exams and job placements, helping employers
            evaluate candidates' ability to perform under pressure and solve
            real-world problems effectively. Mastering these skills will
            significantly enhance your chances of success in the tech industry
            and beyond.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Apptitude;
