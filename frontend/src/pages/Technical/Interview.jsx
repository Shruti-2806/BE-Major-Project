import { useState } from "react";
import { useLocation } from "react-router-dom";
import Video from "./Video.jsx";
import Audio from "./Audio.jsx";
import { Mic, MicOff, LightbulbIcon } from "lucide-react";
import { Button, Card } from "@mui/material";

export default function Interview() {
  const location = useLocation();

  const questionsFromState = location.state?.questions || [];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState(
    new Array(questionsFromState.length).fill(false)
  );

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionsFromState.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const toggleRecording = () => {
    setIsRecording((prev) => {
      const newRecordingState = !prev;

      if (!newRecordingState) {
        // When stopping recording, mark the question as answered
        setAnsweredQuestions((prevAnswered) => {
          const updated = [...prevAnswered];
          updated[currentQuestionIndex] = true;
          return updated;
        });
      }

      return newRecordingState;
    });
  };

  // If no questions were passed (like if user navigates directly to /interview),
  // we can render a fallback UI
  if (questionsFromState.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-12xl mx-auto p-6">
          <p>No questions to display. Please upload a resume first.</p>
        </main>
      </div>
    );
  }

  // Current question object
  const currentQuestion = questionsFromState[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-12xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border p-6">
            <div className="mt-8">
              {/* Display the current question description */}
              <h2 className="text-xl font-medium text-gray-800">
                {currentQuestion.description}
              </h2>

              {/* Pass the question text to your Audio component if needed */}
              <Audio text={currentQuestion.description} autoPlay={true} />

              <Card className="bg-blue-50 p-4 border-blue-100 mt-24">
                <div className="flex items-start space-x-3">
                  <LightbulbIcon className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div className="text-sm text-blue-700">
                    <p className="font-medium mb-1">Note:</p>
                    <p>
                      Click on "Record Answer" when you want to answer the question.
                      After the interview, you will receive feedback along with
                      the correct answers to compare.
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

              {/* PREVIOUS QUESTION BUTTON (uncomment if you need it) */}
              {/* 
              <Button 
                variant="outlined"
                className="border-gray-500 text-gray-600"
                onClick={handlePreviousQuestion} 
                disabled={currentQuestionIndex === 0}
              >
                Previous Question
              </Button> 
              */}

              {/* NEXT QUESTION BUTTON */}
              <Button 
                variant="outlined"
                className="border-gray-500 text-gray-600"
                onClick={handleNextQuestion} 
                disabled={
                  !answeredQuestions[currentQuestionIndex] ||
                  currentQuestionIndex === questionsFromState.length - 1
                }
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
