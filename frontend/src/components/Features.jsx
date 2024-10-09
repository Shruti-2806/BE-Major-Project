import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faBrain,
  faUserTie,
  faBook,
} from "@fortawesome/free-solid-svg-icons"; // Import specific icons

const Features = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const features = [
    {
      title: "DSA",
      description:
        "Hands-on coding exercises to practice programming skills and receive feedback on correctness and optimality.",
      icon: faCode,
      color: "hotpink",
    },
    {
      title: "Aptitude",
      description:
        "Includes modules designed to enhance general problem-solving and logical reasoning abilities, with MCQs based on selected topics.",
      icon: faBrain,
      color: "lightblue",
    },
    {
      title: "Mock Interview",
      description:
        "Simulates a real-world interview experience, providing users with an opportunity to practice their communication and problem-solving skills.",
      icon: faUserTie,
      color: "lightgreen",
    },
    {
      title: "Core Subjects",
      description:
        "Covers fundamental topics relevant to the platform's focus, providing theoretical explanations and multiple-choice questions (MCQs) for practice.",
      icon: faBook,
      color: "lightgoldenrodyellow",
    },
  ];

  return (
    <div className="w-full min-h-screen text-gray-800">
      <div className="container mx-auto ">
        <h2 className="text-5xl font-bold text-center mb-8">
          Our Stellar Features
        </h2>
        <p className="text-lg text-center mb-12">
          Explore the unique features that help you elevate your skills and
          prepare for success in your tech career.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-xl hover:scale-105"
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div
                className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center shadow-md ${
                  hoveredFeature === index ? "animate-pulse" : ""
                }`}
                style={{ backgroundColor: feature.color }}
              >
                <FontAwesomeIcon
                  icon={feature.icon}
                  size="2x"
                  className="text-gray-900"
                />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
