import React from "react";
import AceEditor from "react-ace";

// Import Ace Editor modes and theme
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

const CodeEditor = ({ language = "javascript", value, onChange, className }) => {
  return (
    <AceEditor
      mode={language}
      theme="monokai"
      onChange={onChange}
      value={value}
      name="code-editor"
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
      }}
      width="100%"
      height="300px"
      className={className}
    />
  );
};

export default CodeEditor;
