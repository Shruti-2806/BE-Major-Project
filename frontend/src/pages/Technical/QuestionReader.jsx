"use client"

export default function QuestionReader({ questions, currentIndex, onSelectQuestion }) {
  return (
    <div className="flex flex-wrap gap-2">
      {questions.map((_, index) => (
        <button
          key={index}
          onClick={() => onSelectQuestion(index)}
          className={
            `px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              currentIndex === index 
                ? "bg-indigo-600 text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`
          }
          aria-current={currentIndex === index ? "page" : undefined}
        >
          Question #{index + 1}
        </button>
      ))}
    </div>
  );
}
