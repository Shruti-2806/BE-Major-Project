import { useState } from "react";
import { useLocation } from "react-router-dom";
import Video from "./Video.jsx";
import Audio from "./Audio.jsx";
import { Mic, MicOff, LightbulbIcon } from "lucide-react";
import { Button, Card } from "@mui/material";

export default function Interview() {
  const location = useLocation();
  const questionsFromState = location.state?.questions || [];

  // Index for the main questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // Recording state (shared for main and follow-up questions)
  const [isRecording, setIsRecording] = useState(false);
  // Array to keep track of answered main questions
  const [answeredQuestions, setAnsweredQuestions] = useState(
    new Array(questionsFromState.length).fill(false)
  );

  // State for follow-up questions:
  const [followUpQuestions, setFollowUpQuestions] = useState([]);
  const [currentFollowUpIndex, setCurrentFollowUpIndex] = useState(0);

  // Handler for going to the previous main question (only applies to main questions)
  const handlePreviousQuestion = () => {
    // Only allow previous if not in follow-up mode
    if (followUpQuestions.length === 0 && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNextQuestion = () => {
    if (followUpQuestions.length > 0) {
      if (currentFollowUpIndex < followUpQuestions.length - 1) {
        setCurrentFollowUpIndex(currentFollowUpIndex + 1);
      } else {
        setFollowUpQuestions([]);
        setCurrentFollowUpIndex(0);
        if (currentQuestionIndex < questionsFromState.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
      }
    } else {
      const numFollowUps = Math.floor(Math.random() * 3) + 1;
      const generatedFollowUps = [];
      for (let i = 0; i < numFollowUps; i++) {
        generatedFollowUps.push({
          id: `${questionsFromState[currentQuestionIndex]["question-id"]}-followup-${i + 1}`,
          description: `Follow-up question ${i + 1} for question ${questionsFromState[currentQuestionIndex]["question-id"]}`,
        });
      }
      setFollowUpQuestions(generatedFollowUps);
    }
  };

  const toggleRecording = () => {
    setIsRecording((prev) => {
      const newRecordingState = !prev;

      if (!newRecordingState) {
        if (followUpQuestions.length === 0) {
          setAnsweredQuestions((prevAnswered) => {
            const updated = [...prevAnswered];
            updated[currentQuestionIndex] = true;
            return updated;
          });
        }
      }

      return newRecordingState;
    });
  };

  // If no questions were passed (user navigates directly), show a fallback.
  if (questionsFromState.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-12xl mx-auto p-6">
          <p>No questions to display. Please upload a resume first.</p>
        </main>
      </div>
    );
  }

  // Determine which question to display: either the current follow-up or the main question.
  const currentDisplayedQuestion =
    followUpQuestions.length > 0
      ? followUpQuestions[currentFollowUpIndex]
      : questionsFromState[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-12xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border p-6">
            <div className="mt-8">
              {/* Display the current question or follow-up question description */}
              <h2 className="text-xl font-medium text-gray-800">
                {currentDisplayedQuestion.description}
              </h2>

              {/* Audio component to read the question */}
              <Audio text={currentDisplayedQuestion.description} autoPlay={true} />

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

              {/* PREVIOUS QUESTION BUTTON */}
              <Button
                variant="outlined"
                className="border-gray-500 text-gray-600"
                onClick={handlePreviousQuestion}
                disabled={followUpQuestions.length > 0 || currentQuestionIndex === 0}
              >
                Previous Question
              </Button>

              {/* NEXT QUESTION BUTTON */}
              <Button
                variant="outlined"
                className="border-gray-500 text-gray-600"
                onClick={handleNextQuestion}
                disabled={
                  followUpQuestions.length === 0 &&
                  (!answeredQuestions[currentQuestionIndex] ||
                    currentQuestionIndex === questionsFromState.length - 1)
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
