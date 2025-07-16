"use client";

import { usePathname } from 'next/navigation';
import React from 'react';
import Seminar_room from '@/app/components/Seminar_room';

export default function Page({ params }: { params: { roomId: string } }) {
  const pathname = usePathname();

  return (
    <div>
      <Seminar_room roomId={params.roomId} pathname={pathname}/>
    </div>
  );
}
