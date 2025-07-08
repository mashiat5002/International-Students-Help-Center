import VideoMeeting from '@/app/components/VideoMeeting';
import React from 'react';


export default function Page({ params }: { params: { roomId: string } }) {
  return (
    <div>
      <VideoMeeting roomId={params.roomId} />
    </div>
  );
} 