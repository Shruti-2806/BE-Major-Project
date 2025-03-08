import { useState,useRef,useEffect } from "react"
import QuestionReader  from "./QuestionReader.jsx"
import Video from "./Video.jsx"
import Audio from "./Audio.jsx"
import { ChevronLeft, ChevronRight, Mic, MicOff, LightbulbIcon } from "lucide-react";
import {Button,Card} from "@mui/material";
import { BrowserRouter } from "react-router-dom";


const questions = [
  "Tell us about yourself and your experience.",
  "Explain the differences between Spring Boot and Node.js and why you might choose one over the other for a specific project.",
  "What are your strengths and weaknesses as a developer?",
  "Describe a challenging project you worked on and how you overcame obstacles.",
  "How do you stay updated with the latest technologies?",
]

export default function Interview() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1)
  const [isRecording, setIsRecording] = useState(false)
  // Add a new state for speech status
  const [isSpeaking, setIsSpeaking] = useState(false)
  const speechSynthesisRef = useRef(null);
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      if (isRecording) {
        setIsRecording(false)
      }
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      if (isRecording) {
        setIsRecording(false)
      }
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
  }

  // Add this useEffect to handle text-to-speech
  useEffect(() => {
    // Initialize speech synthesis
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      speechSynthesisRef.current = new SpeechSynthesisUtterance()

      // Set up speech ended event handler
      speechSynthesisRef.current.onend = () => {
        setIsSpeaking(false)
      }

      // Clean up
      return () => {
        if (speechSynthesisRef.current) {
          window.speechSynthesis.cancel()
        }
      }
    }
  }, [])

  // Add this useEffect to read the question when it changes
  useEffect(() => {
    if (speechSynthesisRef.current && typeof window !== "undefined" && "speechSynthesis" in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel()

      // Set the text to the current question
      speechSynthesisRef.current.text = questions[currentQuestionIndex]

      // Start speaking
      window.speechSynthesis.speak(speechSynthesisRef.current)
      setIsSpeaking(true)
    }
  }, [currentQuestionIndex, questions])

  // Add a function to toggle speech
  const toggleSpeech = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel()
        setIsSpeaking(false)
      } else {
        if (speechSynthesisRef.current) {
          speechSynthesisRef.current.text = questions[currentQuestionIndex]
          window.speechSynthesis.speak(speechSynthesisRef.current)
          setIsSpeaking(true)
        }
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <header className="bg-white border-b p-4 flex items-center">
        <div className="flex items-center space-x-2">
          <ChevronLeft className="h-5 w-5 text-gray-500" />
          <ChevronRight className="h-5 w-5 text-gray-500" />
          <div className="h-5 w-5 rounded-full flex items-center justify-center bg-gray-200">
            <span className="text-xs">↻</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="h-5 w-5 text-gray-500">□</div>
          <div className="h-5 w-5 text-gray-500">★</div>
        </div>
      </header> */}

      <main className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border p-6">
            <QuestionReader
              questions={questions}
              currentIndex={currentQuestionIndex}
              onSelectQuestion={(index) => {
                setCurrentQuestionIndex(index)
                if (isRecording) setIsRecording(false)
              }}
            />

            <div className="mt-8">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-medium text-gray-800">{questions[currentQuestionIndex]}</h2>
                <Audio text={questions[currentQuestionIndex]} autoPlay={true} />
              </div>

              <div className="flex items-center mb-6">
                {isRecording ? (
                  <Button variant="outline" size="icon" onClick={toggleRecording} className="mr-2">
                    <MicOff className="h-5 w-5" />
                  </Button>
                ) : (
                  <Button variant="outline" size="icon" onClick={toggleRecording} className="mr-2">
                    <Mic className="h-5 w-5" />
                  </Button>
                )}
              </div>

              <Card className="bg-blue-50 p-4 border-blue-100">
                <div className="flex items-start space-x-3">
                  <LightbulbIcon className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div className="text-sm text-blue-700">
                    <p className="font-medium mb-1">Note:</p>
                    <p>
                      Click on Record Answer when you want to answer the question. At the end of interview we will give
                      you the feedback along with correct answer for each of question and your answer to compare it.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div>
            <Video isRecording={isRecording} />

            <div className="mt-6 flex justify-end space-x-4">
              <Button variant="outline" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
                Previous Question
              </Button>
              <Button onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
                Next Question
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

