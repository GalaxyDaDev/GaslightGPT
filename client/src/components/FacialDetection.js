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
    const model = await faceLandmarksDetection.createDetector(
      faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh
    );
    detectFace(model);
  };

  const detectFace = async (model) => {
    if (!videoRef.current || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");

    const detect = async () => {
      if (!videoRef.current) return;
      const faces = await model.estimateFaces(videoRef.current);

      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

      if (faces.length > 0) {
        faces.forEach((face) => {
          const keypoints = face.keypoints;
          if (keypoints.length > 0) {
            ctx.strokeStyle = "red";
            ctx.lineWidth = 2;
            ctx.beginPath();
            keypoints.forEach((point, index) => {
              if (index === 0) ctx.moveTo(point.x, point.y);
              else ctx.lineTo(point.x, point.y);
            });
            ctx.closePath();
            ctx.stroke();
          }
        });

        // Simple mood roasting logic
        const randomMoods = [
          "Bro, why you looking like that? 💀",
          "You look tired... or just ugly? 😂",
          "Damn, ever heard of beauty sleep? 😭",
          "Oh no... 😳 did the camera break?",
        ];
        setMood(randomMoods[Math.floor(Math.random() * randomMoods.length)]);
      } else {
        setMood("Neutral");
      }

      requestAnimationFrame(detect);
    };

    detect();
  };

  return (
    <div className="relative">
      <h2 className="text-xl font-bold">Facial Mood Detection</h2>
      <div className="relative w-96 h-auto">
        <video ref={videoRef} autoPlay playsInline className="w-full h-auto" />
        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      </div>
      <p className="text-lg font-semibold mt-2">Your mood: {mood}</p>
    </div>
  );
};

export default FacialDetection;
