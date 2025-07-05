type SignalData = {
  from: string;
  to: string;
  offer?: RTCSessionDescriptionInit;
  answer?: RTCSessionDescriptionInit;
  candidate?: RTCIceCandidateInit;
};

export async function startMedia({
  videoRef,
  remoteVideoRef,
  peerConnectionRef,
  socket,
  roomId,
  existingUsers
}: {
  videoRef: React.RefObject<HTMLVideoElement>;
  remoteVideoRef: React.RefObject<HTMLVideoElement>;
  peerConnectionRef: React.MutableRefObject<{ [key: string]: RTCPeerConnection }>;
  socket: any;
  roomId: string;
  existingUsers: string[];
}) {
  const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  if (videoRef.current) videoRef.current.srcObject = localStream;

  const peers: { [id: string]: RTCPeerConnection } = {};
  const pendingCandidates: { [id: string]: RTCIceCandidateInit[] } = {};

  function createPeerConnection(userId: string): RTCPeerConnection {
    const peer = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });

    // Add local stream
    localStream.getTracks().forEach(track => peer.addTrack(track, localStream));

    const remoteStream = new MediaStream();
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
    }

    peer.ontrack = (event) => {
      event.streams[0].getTracks().forEach(track => remoteStream.addTrack(track));
    };

    peer.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('webrtc-ice-candidate', {
          to: userId,
          from: socket.id,
          candidate: event.candidate,
        });
      }
    };

    peers[userId] = peer;
    return peer;
  }

  // Store reference
  peerConnectionRef.current = peers;

  // === Handle offers to existing users ===
  for (const userId of existingUsers) {
    const peer = createPeerConnection(userId);
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    socket.emit('webrtc-offer', { to: userId, from: socket.id, offer });
  }

  // === Incoming offer ===
  socket.on('webrtc-offer', async ({ from, offer }: SignalData) => {
    if (peers[from]) return; // Already handled

    const peer = createPeerConnection(from);
    await peer.setRemoteDescription(new RTCSessionDescription(offer!));
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    socket.emit('webrtc-answer', { to: from, from: socket.id, answer });

    // Add buffered ICE candidates
    if (pendingCandidates[from]) {
      for (const cand of pendingCandidates[from]) {
        await peer.addIceCandidate(new RTCIceCandidate(cand));
      }
      delete pendingCandidates[from];
    }
  });

  // === Incoming answer ===
  socket.on('webrtc-answer', async ({ from, answer }: SignalData) => {
    const peer = peers[from];
    if (!peer) return;
    await peer.setRemoteDescription(new RTCSessionDescription(answer!));
  });

  // === Incoming ICE candidate ===
  socket.on('webrtc-ice-candidate', async ({ from, candidate }: SignalData) => {
    const peer = peers[from];
    if (peer && peer.remoteDescription) {
      await peer.addIceCandidate(new RTCIceCandidate(candidate!));
    } else {
      if (!pendingCandidates[from]) pendingCandidates[from] = [];
      pendingCandidates[from].push(candidate!);
    }
  });
}
