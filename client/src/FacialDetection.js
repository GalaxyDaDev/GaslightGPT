import React, { useRef, useEffect } from "react";
import * as faceapi from "@tensorflow-models/face-landmarks-detection";
import "@tensorflow/tfjs";

export default function FacialDetection() {
  const videoRef = useRef(null);

  useEffect(() => {
    const startVideo = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      videoRef.current.srcObject = stream;
    };
    startVideo();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg font-bold text-white">Facial Detection</h2>
      <video ref={videoRef} autoPlay className="mt-4 rounded-lg" />
    </div>
  );
}
