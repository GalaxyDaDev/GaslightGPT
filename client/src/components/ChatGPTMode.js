import React, { useState } from "react";

const ChatGPTMode = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async () => {
    const res = await fetch("http://localhost:3001/roast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userMessage: message }),
    });
    const data = await res.json();
    setResponse(data.response);
  };

  return (
    <div>
      <h2>GaslightGPT Roast Chat</h2>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
      <p>Response: {response}</p>
    </div>
  );
};

export default ChatGPTMode;
