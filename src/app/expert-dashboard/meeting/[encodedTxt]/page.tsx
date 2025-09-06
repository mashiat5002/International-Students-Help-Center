"use client";

import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import Meeting_room from '@/app/components/Meeting_room';


export default function Page({ params }: { params: { encodedTxt: string } }) {
  const pathname = usePathname();

  return (
    <div>
      <Meeting_room encodedTxt={params.encodedTxt} pathname={pathname}/>
    </div>
  );
}
