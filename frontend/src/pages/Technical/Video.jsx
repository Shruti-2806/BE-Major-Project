import { useState, useRef, useEffect } from "react";

export default function Video({ isRecording }) {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [stream, setStream] = useState(null);
  const [recordingStatus, setRecordingStatus] = useState("");
  const [recordingTime, setRecordingTime] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    async function setupMedia() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Error accessing media devices:", err);
      }
    }
    setupMedia();
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!stream) return;
    if (isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  }, [isRecording, stream]);

  const startRecording = () => {
    if (!stream) return;
    setRecordedChunks([]);
    setRecordingTime(0);
    const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
    recorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        setRecordedChunks((prev) => [...prev, event.data]);
      }
    };
    recorder.onstart = () => {
      setRecordingStatus("Recording");
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    };
    recorder.onstop = () => {
      setRecordingStatus("");
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (recordedChunks.length > 0) {
        const blob = new Blob(recordedChunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.style.display = "none";
        a.href = url;
        a.download = `interview-answer-${Date.now()}.webm`;
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    };
    recorder.start(1000);
    mediaRecorderRef.current = recorder;
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative">
      <div className="bg-black rounded-lg overflow-hidden aspect-video flex items-center justify-center">
        <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
      </div>
      {recordingStatus && (
        <div className="absolute bottom-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm flex items-center">
          <span className="animate-pulse mr-1.5 h-2 w-2 rounded-full bg-white inline-block"></span>
          {recordingStatus} {formatTime(recordingTime)}
        </div>
      )}
    </div>
  );
}
