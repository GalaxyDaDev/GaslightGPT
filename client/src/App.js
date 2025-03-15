import React from "react";
import FacialDetection from "./components/FacialDetection";
import ChatGPTMode from "./components/ChatGPTMode";

function App() {
  return (
    <div>
      <h1>Welcome to GaslightGPT 🤡</h1>
      <FacialDetection />
      <ChatGPTMode />
    </div>
  );
}

export default App;
