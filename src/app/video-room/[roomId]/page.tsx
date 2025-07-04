import React from 'react';
import VideoMeeting from '../../components/VideoMeeting';

export default function Page({ params }: { params: { roomId: string } }) {
  return (
    <div>
      <VideoMeeting roomId={params.roomId} />
    </div>
  );
} 