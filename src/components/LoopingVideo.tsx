"use client";

import { useRef, useEffect } from "react";

interface LoopingVideoProps {
  src: string;
}

export const LoopingVideo = ({ src }: LoopingVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.currentTime >= 14) {
        video.currentTime = 0;
        video.play();
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);

    // Start playing the video
    video.play().catch(error => {
      console.error("Video autoplay failed:", error);
    });

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [src]);

  return (
    <div className="overflow-hidden rounded-2xl shadow-xl aspect-video">
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover"
      />
    </div>
  );
};