import type { NextApiRequest, NextApiResponse } from 'next';
import type { Server as HTTPServer } from 'http';
import type { Socket as NetSocket } from 'net';
import type { Server as IOServer } from 'socket.io';
import { Server } from 'socket.io';

type NextApiResponseWithSocket = NextApiResponse & {
  socket: NetSocket & {
    server: HTTPServer & {
      io?: IOServer;
    };
  };
};


export default function handler(req: NextApiRequest, res: NextApiResponseWithSocket) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server, {
      path: '/api/socket',
    });

    io.on('connection', (socket) => {
      console.log('✅ Client connected:', socket.id);

      socket.on('custom-message', (msg) => {
        console.log('📩 Received:', msg);
        socket.broadcast.emit('custom-message', msg);
      });

      socket.on('disconnect', () => {
        console.log('❌ Disconnected:', socket.id);
      });

       socket.on("webrtc-offer", (offer) => {
         console.log("📩 Received webrtc-offer:", offer);
         socket.broadcast.emit("webrtc-offer", offer);
       });

       socket.on("webrtc-answer", (answer) => {
         console.log("📩 Received webrtc-answer:", answer);
         socket.broadcast.emit("webrtc-answer", answer);
       });

       socket.on("webrtc-ice-candidate", (candidate) => {
         console.log("📩 Received ICE candidate:", candidate);
         socket.broadcast.emit("webrtc-ice-candidate", candidate);
       });

    });

    res.socket.server.io = io;
  }

  res.end();
}
