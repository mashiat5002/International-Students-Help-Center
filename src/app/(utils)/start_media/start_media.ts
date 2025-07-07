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
  existingUsers,
  onLocalStream,
  onRemoteStream
}: {
  videoRef: React.RefObject<HTMLVideoElement>;
  remoteVideoRef: React.RefObject<HTMLVideoElement>;
  peerConnectionRef: React.MutableRefObject<{ [key: string]: RTCPeerConnection }>;
  socket: any;
  roomId: string;
  existingUsers: string[];
  onLocalStream?: (stream: MediaStream) => void;
  onRemoteStream?: (userId: string, stream: MediaStream) => void;
}) {

  
  console.log(existingUsers, "existingUsers in startMedia");
  console.log(socket.id, "self id");
  const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  if (videoRef.current) videoRef.current.srcObject = localStream;
  if (onLocalStream) onLocalStream(localStream);


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
    if(userId != socket.id){

      if (onRemoteStream) onRemoteStream(userId, remoteStream);
    }

    console.log(peer, "peer in createPeerConnection");
    peer.ontrack = (event) => {
        console.log("Received ontrack from", userId, event.streams);
        if (event.streams[0]) {
          event.streams[0].getTracks().forEach(track => {
            remoteStream.addTrack(track);
            console.log("Added track", track.kind, "from", userId);
          });
        } else {
          console.warn("No stream received in ontrack from", userId);
        }
};



    peer.onicecandidate = (event) => {
      if(userId !=socket.id){
      if (event.candidate) {
        socket.emit('webrtc-ice-candidate', {
          to: userId,
          from: socket.id,
          candidate: event.candidate,
        });
      }}
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
    if(userId!=socket.id){

      socket.emit('webrtc-offer', { to: userId, from: socket.id, offer });
    }
  }


  // === Incoming offer ===
  socket.on('webrtc-offer', async ({ from, offer }: SignalData) => {
    if (peers[from]) return; // Already handled


    const peer = createPeerConnection(from);
    // console.log(offer, "offer in webrtc-offerrrr");
    // console.log(peer, "peer in webrtc-offer");


    await peer.setRemoteDescription(new RTCSessionDescription(offer!));
    // console.log(offer, "completed setting remote description in webrtc-offer");
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
    try{

      await peer.setRemoteDescription(new RTCSessionDescription(answer!));
    }catch(error){
      console.error("Error setting remote description:", error);
    }
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


