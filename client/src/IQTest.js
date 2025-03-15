import React, { useState } from "react";

const questions = [
  { question: "What is 2 + 2?", correct: "4" },
  { question: "What is the capital of France?", correct: "Paris" },
  { question: "How many continents are there?", correct: "7" },
  { question: "What is the square root of 16?", correct: "4" },
];

const insults = [
  "Wow, even a rock could do better!",
  "You really thought you were smart? Think again!",
  "That’s... technically right, but you're still dumb.",
  "I’m actually losing brain cells reading this.",
  "Congratulations, you're the reason warning labels exist."
];

export default function IQTest() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [finished, setFinished] = useState(false);

  const handleSubmit = () => {
    if (userAnswer.trim().toLowerCase() === questions[step].correct.toLowerCase()) {
      setScore(score + 1);
    }
    setUserAnswer("");
    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      setFinished(true);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg mt-6 text-center">
      {!finished ? (
        <>
          <h2 className="text-xl font-bold">{questions[step].question}</h2>
          <input
            className="w-full p-2 mt-4 bg-gray-700 rounded-lg text-center"
            placeholder="Your answer..."
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
          <button className="mt-4 px-4 py-2 bg-blue-500 rounded-lg" onClick={handleSubmit}>
            Submit
          </button>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold">Test Complete!</h2>
          <p className="mt-2 text-yellow-400">
            Your IQ is: {Math.floor(Math.random() * 50) + 50} (Garbage-tier)
          </p>
          <p className="mt-2 text-red-400">
            {insults[Math.floor(Math.random() * insults.length)]}
          </p>
        </>
      )}
    </div>
  );
}
