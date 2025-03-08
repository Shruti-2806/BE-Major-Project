"use client"

import { useEffect, useRef, useState } from "react";

export default function Audio({ text, autoPlay = true }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      utteranceRef.current = new SpeechSynthesisUtterance();
      utteranceRef.current.onend = () => {
        setIsSpeaking(false);
      };

      return () => {
        if (utteranceRef.current) {
          window.speechSynthesis.cancel();
        }
      };
    }
  }, []);

  useEffect(() => {
    if (utteranceRef.current) {
      utteranceRef.current.text = text;
      if (autoPlay) {
        playAudio();
      }
    }
  }, [text, autoPlay]);

  const playAudio = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window && utteranceRef.current) {
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utteranceRef.current);
      setIsSpeaking(true);
    }
  };

  const stopAudio = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const toggleAudio = () => {
    if (isSpeaking) {
      stopAudio();
    } else {
      playAudio();
    }
  };

  return (
    <button
      onClick={toggleAudio}
      className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-100 transition"
    >
      {isSpeaking ? (
        <>
          <span className="text-red-500">■</span>
          <span>Stop</span>
        </>
      ) : (
        <>
          <span className="text-blue-500">🔊</span>
          <span>Read Aloud</span>
        </>
      )}
    </button>
  );
}
