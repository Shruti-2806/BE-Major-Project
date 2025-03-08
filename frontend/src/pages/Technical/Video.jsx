import { useState, useRef, useEffect } from "react";

export default function Video({ isRecording }) {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [audioChunks, setAudioChunks] = useState([]);
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
    setAudioChunks([]);
    setRecordingTime(0);

    // Create separate tracks for video+audio and audio-only
    const videoStream = new MediaStream(stream.getVideoTracks());
    const audioStream = new MediaStream(stream.getAudioTracks());

    const videoRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });
    const audioRecorder = new MediaRecorder(audioStream, { mimeType: "audio/webm" });

    videoRecorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        setRecordedChunks((prev) => [...prev, event.data]);
      }
    };

    audioRecorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        setAudioChunks((prev) => [...prev, event.data]);
      }
    };

    videoRecorder.onstart = () => {
      setRecordingStatus("Recording");
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    };

    videoRecorder.onstop = () => {
      setRecordingStatus("");
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      // Save video file
      if (recordedChunks.length > 0) {
        const videoBlob = new Blob(recordedChunks, { type: "video/webm" });
        downloadBlob(videoBlob, `interview-answer-${Date.now()}.webm`);
      }

      // Save audio file
      if (audioChunks.length > 0) {
        const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
        downloadBlob(audioBlob, `interview-audio-${Date.now()}.webm`);
      }
    };

    videoRecorder.start(1000);
    audioRecorder.start(1000);
    mediaRecorderRef.current = { videoRecorder, audioRecorder };
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      if (mediaRecorderRef.current.videoRecorder?.state !== "inactive") {
        mediaRecorderRef.current.videoRecorder.stop();
      }
      if (mediaRecorderRef.current.audioRecorder?.state !== "inactive") {
        mediaRecorderRef.current.audioRecorder.stop();
      }
    }
  };

  const downloadBlob = (blob, fileName) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style.display = "none";
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
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
