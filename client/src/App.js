import React, { useState } from "react";
import Chat from "./Chat";
import FacialDetection from "./FacialDetection";
import ToxicEx from "./ToxicEx";
import IQTest from "./IQTest";

export default function App() {
  const [mode, setMode] = useState(null);

  return (
    <div className="flex flex-col items-center bg-gray-900 text-white h-screen">
      <h1 className="text-4xl font-bold mt-10 animate-pulse">Welcome to Gaslight-GPT, smart fellow!</h1>

      {!mode && (
        <div className="mt-6">
          <button className="m-2 px-6 py-3 bg-red-500 rounded-lg" onClick={() => setMode("IQTest")}>
            Start IQ Test
          </button>
          <button className="m-2 px-6 py-3 bg-blue-500 rounded-lg" onClick={() => setMode("chat")}>
            Therapy Mode (Get Roasted)
          </button>
          <button className="m-2 px-6 py-3 bg-purple-500 rounded-lg" onClick={() => setMode("toxicEx")}>
            Toxic-Ex Mode
          </button>
          <button className="m-2 px-6 py-3 bg-yellow-500 rounded-lg" onClick={() => setMode("face")}>
            Facial Compliment Mode
          </button>
        </div>
      )}

      {mode === "chat" && <Chat />}
      {mode === "face" && <FacialDetection />}
      {mode === "toxicEx" && <ToxicEx />}
      {mode === "IQTest" && <IQTest />}
    </div>
  );
}
