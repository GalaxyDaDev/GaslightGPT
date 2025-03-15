import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

export default function Chat() {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("botReply", (message) => {
      setMessages((prev) => [...prev, { sender: "bot", text: message }]);
    });

    return () => socket.off("botReply");
  }, []);

  const sendMessage = () => {
    setMessages([...messages, { sender: "user", text: userInput }]);
    socket.emit("chatMessage", userInput);
    setUserInput("");
  };

  return (
    <div className="w-full max-w-lg bg-gray-800 p-4 rounded-lg mt-6">
      <div className="h-64 overflow-y-auto">
        {messages.map((msg, index) => (
          <p key={index} className={msg.sender === "user" ? "text-right text-blue-300" : "text-red-400"}>
            {msg.text}
          </p>
        ))}
      </div>
      <input
        className="w-full p-2 mt-2 bg-gray-700 rounded-lg"
        placeholder="Say something..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
    </div>
  );
}
