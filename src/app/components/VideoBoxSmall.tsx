import React, { useEffect, useRef } from "react";

type VideoBoxSmallProps = {
  stream?: MediaStream;           // May be undefined if user has no video
  name: string;                   // User's display name
  isMuted?: boolean;              // Whether to show mute icon or placeholder
  onClick?: () => void;           // Optional click handler (to bring to big screen)
};

export const VideoBoxSmall: React.FC<VideoBoxSmallProps> = ({
  stream,
  name,
  isMuted = false,
  onClick,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Attach the incoming MediaStream to the <video> element
  useEffect(() => {
    if (videoRef.current) {
      if (stream) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.srcObject = null;
      }
    }
  }, [stream]);

  return (
    <div
      className="relative w-48 h-32 bg-gray-900 rounded-2xl overflow-hidden shadow-md cursor-pointer"
      onClick={onClick}
    >
      {/* Video or Placeholder */}
      {stream ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={true} // Small boxes are usually muted
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full bg-gray-700">
          <span className="text-white text-sm">{name.charAt(0)}</span>
        </div>
      )}

      {/* Overlay with name + mute status */}
      <div className="absolute bottom-0 w-full bg-black/50 text-white text-xs p-1 flex justify-between items-center">
        <span className="truncate">{name}</span>
        {isMuted && <span className="text-red-400 text-[10px]">🔇</span>}
      </div>
    </div>
  );
};
