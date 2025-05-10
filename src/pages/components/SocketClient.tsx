'use client';


import { startMedia } from '@/app/(utils)/start_media/route';
import { useEffect, useRef } from 'react';
import io from 'socket.io-client'; // Default import of io
import { Socket } from 'socket.io-client'; // Importing the Socket class



export default function SocketClient() {
  
  const socketRef = useRef<typeof Socket | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);

 useEffect(() => {
  const isOfferer = window.location.hash === '#offerer';
  const socket = io({ path: '/api/socket' });

  socketRef.current = socket;

  startMedia({
    videoRef,
    peerConnectionRef,
    isOfferer,
    socket,
  });

  return () => {
    socket.disconnect();
  };
}, []);


   return (
    <div >
      <p >🎥 Local Camera Preview</p>
<video ref={videoRef} autoPlay playsInline muted style={{ width: '300px', border: '1px solid #ccc' }} />
      <p >🎥 Remote Camera Preview</p>
<video id="remoteVideo" autoPlay playsInline style={{ width: '300px', border: '1px solid #ccc', marginLeft: '10px' }} />
   
    </div>
  );
}