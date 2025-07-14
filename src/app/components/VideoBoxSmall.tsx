import { useEffect, useRef } from "react";

export const VideoBoxSmall = ({ stream,rerender}: { stream: MediaStream|null ,rerender:boolean}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  console.log(stream)
  
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream,rerender]);

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
   className="w-full h-full object-cover rounded-lg" style={{ background: '#222' } } ></video>
  )
}
