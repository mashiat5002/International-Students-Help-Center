import React from 'react';
import Seminar_room from '@/app/components/Seminar_room';

export default function Page({ params }: { params: { roomId: string } }) {
  return (
    <div>
      <Seminar_room roomId={params.roomId} />
    </div>
  );
} 