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
        "Offers hands-on coding exercises, allowing users to practice their programming skills and receive feedback on code correctness and optimality.",
      icon: faCode, // Using Font Awesome icon for DSA
      color: "hotpink",
    },
    {
      title: "Aptitude",
      description:
        "Optimized for minimal power consumption without sacrificing quality.",
      icon: faBrain, // Using Font Awesome icon for Aptitude
      color: "lightblue",
    },
    {
      title: "Mock Interview",
      description: "Prepare with realistic interview simulations.",
      icon: faUserTie, // Using Font Awesome icon for Mock Interview
      color: "lightgreen",
    },
    {
      title: "Core Subjects",
      description: "Master the core subjects with comprehensive content.",
      icon: faBook, // Using Font Awesome icon for Core Subjects
      color: "lightgoldenrodyellow",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-5xl font-bold text-center mb-12">
          Our Stellar Features
        </h2>
        <p className="text-lg text-center mb-8">
          Explore the unique features that help you elevate your skills and
          prepare for success in your tech career.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div
                className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
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
              <p className="text-gray-400 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
