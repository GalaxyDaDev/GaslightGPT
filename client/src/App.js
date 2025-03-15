import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import IQTest from "./components/IQTest";
import ChatMode from "./components/ChatMode";
import ToxicExMode from "./components/ToxicExMode";
import FacialDetection from "./components/FacialDetection";
import "./App.css";

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowOptions(true), 4000); // Wait 4 seconds, then show options
  }, []);

  return (
    <div className="welcome-container">
      <h1 className="animate-text">Welcome to Gaslight GPT, smart fellow</h1>
      {showOptions && (
        <button onClick={() => navigate("/iq-test")} className="start-button">
          Start IQ Test
        </button>
      )}
    </div>
  );
};

const ModeSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="mode-selection">
      <h2>Choose Your Mode:</h2>
      <button onClick={() => navigate("/chat-mode")}>Therapy Mode (Chat Roasting)</button>
      <button onClick={() => navigate("/toxic-ex")}>Toxic-Ex Mode</button>
      <button onClick={() => navigate("/facial-detection")}>Facial Compliment Mode</button>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/iq-test" element={<IQTest />} />
        <Route path="/choose-mode" element={<ModeSelection />} />
        <Route path="/chat-mode" element={<ChatMode />} />
        <Route path="/toxic-ex" element={<ToxicExMode />} />
        <Route path="/facial-detection" element={<FacialDetection />} />
      </Routes>
    </Router>
  );
};

export default App;
