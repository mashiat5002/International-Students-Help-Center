import React from 'react';

interface Participant {
  id: string;
  label: string;
  isLocal: boolean;
}

interface ParticipantsGridProps {
  participants: Participant[];
  mainId: string;
  onSelect: (id: string) => void;
  videoRefs: { [id: string]: React.RefObject<HTMLVideoElement> };
}

const ParticipantsGrid: React.FC<ParticipantsGridProps> = ({ participants, mainId, onSelect, videoRefs }) => {
  return (
    <div className="flex flex-col gap-3 overflow-y-auto max-h-[80vh] w-28 sm:w-36 p-2 bg-white rounded-xl shadow-md">
      {participants.map((p) => (
        <div
          key={p.id}
          className={`relative rounded-lg border-2 ${mainId === p.id ? 'border-blue-500' : 'border-gray-300'} cursor-pointer bg-gray-100`}
          style={{ aspectRatio: '1/1' }}
          onClick={() => onSelect(p.id)}
          title={p.label}
        >
          <video
            ref={videoRefs[p.id]}
            autoPlay
            playsInline
            muted={p.isLocal}
            className="w-full h-full object-cover rounded-lg"
            style={{ background: '#222' }}
          />
          <span className="absolute bottom-1 left-1 right-1 bg-black bg-opacity-60 text-white text-xs px-2 py-0.5 rounded text-center truncate">
            {p.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ParticipantsGrid; 