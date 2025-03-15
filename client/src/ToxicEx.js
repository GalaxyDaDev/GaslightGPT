import React, { useEffect, useState } from "react";

export default function ToxicEx() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const conversation = [
      "I love you, we should get back together.",
      "SIKE! You really thought? Ugly mf.",
      "Actually, I was just testing you. Wanna go out?",
      "Nah, I lied again. You're as annoying as my alarm clock."
    ];
    let index = 0;
    const interval = setInterval(() => {
      if (index < conversation.length) {
        setMessages((prev) => [...prev, conversation[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 3000);
  }, []);

  return (
    <div className="text-lg bg-gray-800 p-6 rounded-lg mt-6">
      {messages.map((msg, i) => (
        <p key={i} className="mb-2">{msg}</p>
      ))}
    </div>
  );
}
