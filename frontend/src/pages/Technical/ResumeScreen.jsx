import { useState } from "react";
import { AiOutlineFilePdf } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ResumeScreen() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");

  // Initialize navigate
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setUploadStatus(""); // Reset status on new file selection
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      setUploadStatus("Please upload a PDF file before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setUploadStatus("Uploading...");

      const response = await axios.post("http://localhost:8080/resume-questions", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setUploadStatus("Upload successful! 🎉");
        console.log(response.data);


        navigate("/technical-interview", {
          state: response.data.data, 
        });
      } else {
        setUploadStatus("Upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Upload Your Resume</h1>
        <p className="text-gray-600 mb-6">Upload your resume in PDF format to apply for opportunities.</p>

        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-500 transition">
          <input type="file" className="hidden" accept=".pdf" onChange={handleFileChange} />
          <svg
            className="w-12 h-12 text-gray-400 mb-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0 0V8m0 4h4m-4 0H8m12 2a4 4 0 11-8 0 4 4 0 018 0zm4 6a8 8 0 10-16 0h16z"></path>
          </svg>
          <span className="text-gray-600">Click to upload or drag & drop</span>
        </label>

        {fileName && (
          <div className="mt-4 flex items-center justify-center text-green-600">
            <AiOutlineFilePdf className="w-6 h-6 mr-2" />
            <p>{fileName}</p>
          </div>
        )}

        {/* Upload Status Message */}
        {uploadStatus && (
          <p
            className={`mt-4 ${
              uploadStatus.includes("successful") ? "text-green-600" : "text-red-600"
            }`}
          >
            {uploadStatus}
          </p>
        )}

        <button
          onClick={handleSubmit}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
