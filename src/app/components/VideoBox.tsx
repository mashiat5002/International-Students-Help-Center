import { useEffect, useRef } from "react";

export const VideoBox = ({ stream,  big }: { stream: MediaStream,  big: boolean }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted={false}
    className={big ? "w-full h-full object-cover rounded-xl border border-gray-300" : "w-full h-full object-cover rounded-lg"}
    />
  );
};
