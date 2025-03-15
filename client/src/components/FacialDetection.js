import React, { useRef, useEffect, useState } from "react";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import * as tf from "@tensorflow/tfjs";

const FacialDetection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [mood, setMood] = useState("Neutral");

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error("Camera access error:", error);
      }
    };

    startCamera();
    loadModel();
  }, []);

  const loadModel = async () => {
    const model = await faceLandmarksDetection.load(
      faceLandmarksDetection.SupportedPackages.mediapipeFacemesh
    );
    detectFace(model);
  };

  const detectFace = async (model) => {
    if (!videoRef.current || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");

    const detect = async () => {
      if (!videoRef.current) return;
      const predictions = await model.estimateFaces({ input: videoRef.current });

      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

      if (predictions.length > 0) {
        setMood("Ugly 😭"); // 😂 Roasting the user
      }

      requestAnimationFrame(detect);
    };

    detect();
  };

  return (
    <div>
      <h2>Facial Mood Detection</h2>
      <video ref={videoRef} autoPlay playsInline className="w-96 h-auto" />
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-96 h-auto" />
      <p>Your mood: {mood}</p>
    </div>
  );
};

export default FacialDetection;
