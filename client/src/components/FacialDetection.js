import React, { useRef, useEffect } from "react";

export default function FacialDetection() {
  const videoRef = useRef(null);

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
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
