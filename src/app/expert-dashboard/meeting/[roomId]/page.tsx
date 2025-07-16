"use client";

import { usePathname } from 'next/navigation';
import React from 'react';
import Meeting_room from '@/app/components/Meeting_room';

export default function Page({ params }: { params: { roomId: string } }) {
  const pathname = usePathname();

  return (
    <div>
      <Meeting_room roomId={params.roomId} pathname={pathname}/>
    </div>
  );
}
