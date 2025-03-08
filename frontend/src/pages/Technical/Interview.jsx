import { useState } from "react";
import Video from "./Video.jsx";
import Audio from "./Audio.jsx";
import { Mic, MicOff, LightbulbIcon } from "lucide-react";
import { Button, Card } from "@mui/material";

const questions = [
  "Tell us about yourself and your experience.",
  "Explain the differences between Spring Boot and Node.js and why you might choose one over the other for a specific project.",
  "What are your strengths and weaknesses as a developer?",
  "Describe a challenging project you worked on and how you overcame obstacles.",
  "How do you stay updated with the latest technologies?",
];

export default function Interview() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Array(questions.length).fill(false));

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const toggleRecording = () => {
    setIsRecording((prev) => {
      const newRecordingState = !prev;

      if (!newRecordingState) {
        // When stopping recording, mark the question as answered
        setAnsweredQuestions((prev) => {
          const updated = [...prev];
          updated[currentQuestionIndex] = true;
          return updated;
        });
      }

      return newRecordingState;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-12xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border p-6">
            <div className="mt-8">
              <h2 className="text-xl font-medium text-gray-800">{questions[currentQuestionIndex]}</h2>
              <Audio text={questions[currentQuestionIndex]} autoPlay={true} />

              <Card className="bg-blue-50 p-4 border-blue-100 mt-24">
                <div className="flex items-start space-x-3">
                  <LightbulbIcon className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div className="text-sm text-blue-700">
                    <p className="font-medium mb-1">Note:</p>
                    <p>
                      Click on "Record Answer" when you want to answer the question. After the interview, you will receive feedback
                      along with the correct answers to compare.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div>
            <Video isRecording={isRecording} />

            {/* BUTTONS SECTION */}
            <div className="mt-6 flex justify-end space-x-2">
              {/* RECORD ANSWER BUTTON */}
              <Button 
                variant="contained" 
                size="large"
                onClick={toggleRecording}
                className={`flex items-center px-5 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg border-2 ${
                  isRecording 
                    ? "bg-red-600 text-white border-red-700"   
                    : "bg-blue-500 text-white border-blue-700" 
                }`}
              >
                {isRecording ? (
                  <>
                    <MicOff className="h-5 w-5 mr-2" /> Stop Recording
                  </>
                ) : (
                  <>
                    <Mic className="h-5 w-5 mr-2" /> Record Answer
                  </>
                )}
              </Button>

              {/* PREVIOUS QUESTION BUTTON */}
              {/* <Button 
                variant="outlined"
                className="border-gray-500 text-gray-600"
                onClick={handlePreviousQuestion} 
                disabled={currentQuestionIndex === 0}
              >
                Previous Question
              </Button> */}

              {/* NEXT QUESTION BUTTON */}
              <Button 
                variant="outlined"
                className="border-gray-500 text-gray-600"
                onClick={handleNextQuestion} 
                disabled={!answeredQuestions[currentQuestionIndex] || currentQuestionIndex === questions.length - 1}
              >
                Next Question
              </Button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
