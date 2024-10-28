import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import { useParams } from "react-router";

export default function CodeEditor() {
  const [code, setCode] = useState("import java.io.*;\nimport java.util.*;\npublic class Main{\n\tpublic static void main(String args[]){\n\n\t}\n}");
  const [testCases, setTestCases] = useState([{ input: "", output: "" }]);
  const [language, setLanguage] = useState("Java");
  const [submissionOutput, setSubmissionOutput] = useState(""); // New state for submission output
  const [submissionStatus, setSubmissionStatus] = useState(""); // New state for submission status
  const { questionid } = useParams();
  console.log(questionid)
  const qid = parseInt(questionid, 10);
  const handleCodeChange = (value) => {
    setCode(value);
  };

  const addTestCase = () => {
    setTestCases([...testCases, { input: "", output: "" }]);
  };

  const updateTestCase = (index, field, value) => {
    const updatedTestCases = [...testCases];
    updatedTestCases[index][field] = value;
    setTestCases(updatedTestCases);
  };

  const runTests = async () => {
    try {
      const response = await fetch("http://13.201.82.235:20000/run_code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: encodeURIComponent(code),
          language: language,
          inputs: testCases.map((testCase) => testCase.input),
        }),
      });

      const data = await response.json(); // Wait for JSON parsing

      // Log the full response for debugging
      console.log("Full Response:", data);

      if (response.ok && data.status === "OK") {
        const results = data.results; // Check if results exist
        console.log("Results:", results); // Log the results

        if (results && Array.isArray(results)) {
          const updatedTestCases = testCases.map((testCase, index) => ({
            ...testCase,
            output: results[index] || "No output", // Assign the corresponding output
          }));
          setTestCases(updatedTestCases); // Update state with new outputs
        } else {
          setTestCases(testCases.map(testCase => ({ ...testCase, output: "No valid results found." })));
        }
      } else {
        const errorText = await response.text();
        setTestCases(testCases.map(testCase => ({ ...testCase, output: `Error running tests: ${errorText}` })));
      }
    } catch (error) {
      setTestCases(testCases.map(testCase => ({ ...testCase, output: `Error: ${error.message}` })));
    }
  };

  const submitCode = async () => {
    try {
      const response = await fetch("http://13.201.82.235:20000/submit_code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: encodeURIComponent(code),
          language: language,
          id: 1,
        }),
      });
      
      const data = await response.json();
      console.log("Submission Response:", data);

      if (response.ok) {
        setSubmissionOutput(data.result || "No output returned."); // Set submission output
        setSubmissionStatus("success"); // Set status for success
      } else {
        const errorText = await response.text();
        setSubmissionOutput(`Error submitting code: ${errorText}`);
        setSubmissionStatus("error"); // Set status for error
      }
    } catch (error) {
      setSubmissionOutput(`Error: ${error.message}`);
      setSubmissionStatus("error"); // Set status for error
    }
  };

  const languageExtension = () => {
    switch (language) {
      case "Python":
        return python();
      case "Cpp":
        return cpp();
      case "Java":
        return java({ java: true });
      default:
        return java();
    }
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);

    if (selectedLanguage === "Cpp") {
      setCode("#include<bits/stdc++.h>\nusing namespace std;\n\nvoid solve() {\n // write your logic here\n}\n\nint main () {\n\tsolve();\n}");
    } else if (selectedLanguage === "Python") {
      setCode("print('Hello World!!')"); 
    } else if (selectedLanguage === "Java") {
      setCode("import java.io.*;\nimport java.util.*;\npublic class Main{\n\tpublic static void main(String args[]){\n\n\t}\n}");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900 p-4 gap-4">
      <div className="w-1/2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Code Editor</h2>
          <div className="flex items-center space-x-2">
            <select
              onChange={handleLanguageChange}
              value={language}
              className="px-4 py-2 border rounded-md"
            >
              <option value="Java">Java</option>
              <option value="Cpp">C++</option>
              <option value="Python">Python</option>
            </select>
            <button
              onClick={submitCode} // Change to submitCode function
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Submit
            </button>
          </div>
        </div>
        <CodeMirror
          value={code}
          height="calc(100vh - 160px)"
          theme="dark"
          extensions={[languageExtension()]}
          onChange={handleCodeChange}
          className="rounded-md border shadow-lg"
        />
      </div>
      <div className="w-1/2 flex flex-col">
        <div className="flex flex-row justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Test Cases</h2>
          <div className="flex space-x-2">
            <button
              onClick={addTestCase}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Add Test Case
            </button>
            <button
              onClick={runTests}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Run Tests
            </button>
          </div>
        </div>

        <div className="space-y-4 mb-4 overflow-y-auto ">
          {testCases.map((testCase, index) => (
            <div key={index} className="flex space-x-2 items-start">
              <div className="flex flex-col w-1/2">
                <label className="mb-1 font-semibold">Input for Test Case {index + 1}</label>
                <textarea
                  value={testCase.input}
                  onChange={(e) => updateTestCase(index, "input", e.target.value)}
                  className="p-2 border rounded-md resize-none h-20 overflow-y-auto shadow-sm"
                  placeholder={`Input for Test Case ${index + 1}`}
                />
              </div>
              <div className="flex flex-col w-1/2">
                <label className="mb-1 font-semibold">Output</label>
                <textarea
                  value={testCase.output}
                  readOnly
                  className="p-2 border rounded-md resize-none h-20 overflow-y-auto bg-gray-200 shadow-sm"
                  placeholder={`Output for Test Case ${index + 1}`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Display submission output below the test cases */}
        <div>
          <h2 className="text-xl font-semibold">Submission Output</h2>
          {submissionOutput === "Accepted" ? (
            <div className="text-green-600 font-bold text-lg">{submissionOutput}</div>
          ) : (
            <div className="text-red-600 font-bold text-lg">{submissionOutput}</div>
          )}
        </div>
      </div>
    </div>
  );
}
