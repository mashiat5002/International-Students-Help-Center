"use client";

import { usePathname } from 'next/navigation';
import React from 'react';
import Seminar_room from '@/app/components/Seminar_room';

export default function Page({ params }: { params: { encodedTxt: string } }) {
  const pathname = usePathname();

  return (
    <div>
      <Seminar_room encodedTxt={params.encodedTxt} pathname={pathname}/>
    </div>
  );
}
