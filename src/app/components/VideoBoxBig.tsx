import { useEffect, useRef } from "react";

export const VideoBoxBig = ({ stream ,rerender}: { stream: MediaStream |null,rerender:boolean }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return  (
    <video
      ref={videoRef}
      autoPlay
      playsInline
       className={`w-full  h-full object-cover rounded-xl border border-gray-300 `}
    />
  );
};
