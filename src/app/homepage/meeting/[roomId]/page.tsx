import React from 'react';
import Meeting_room from '@/app/components/Meeting_room';

export default function Page({ params }: { params: { roomId: string } }) {
  return (
    <div>
      <Meeting_room roomId={params.roomId} />
    </div>
  );
} 