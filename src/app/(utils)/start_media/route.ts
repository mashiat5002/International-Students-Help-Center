// webrtcHelpers.ts
export async function startMedia({
  videoRef,
  peerConnectionRef,
  isOfferer,
  socket,
}: {
  videoRef: React.RefObject<HTMLVideoElement>;
  peerConnectionRef: React.MutableRefObject<RTCPeerConnection | null>;
  isOfferer: boolean;
  socket: any;
}) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }

    const peer = new RTCPeerConnection();

    peer.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('webrtc-ice-candidate', event.candidate);
      }
    };

    peerConnectionRef.current = peer; 

    stream.getTracks().forEach((track) => {
      peer.addTrack(track, stream);
    });

    const remoteStream = new MediaStream();
    const remoteVideo = document.getElementById("remoteVideo") as HTMLVideoElement;
    if (remoteVideo) {
      remoteVideo.srcObject = remoteStream;
    }

    peer.ontrack = (event) => {
      remoteStream.addTrack(event.track);
    };

    if (isOfferer) {
      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);
      socket.emit('webrtc-offer', offer);

      socket.on('webrtc-answer', async (answer: any) => {
        await peer.setRemoteDescription(new RTCSessionDescription(answer));
      });
    }

    if (!isOfferer) {
      socket.on('webrtc-offer', async (offer: RTCSessionDescriptionInit) => {
        await peer.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);
        socket.emit('webrtc-answer', answer);
      });

      socket.on('webrtc-ice-candidate', (candidate: any) => {
        if (candidate) {
          peer.addIceCandidate(new RTCIceCandidate(candidate));
        }
      });
    }

  } catch (err) {
    console.error('Failed to get media:', err);
  }
}
