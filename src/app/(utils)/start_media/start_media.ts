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
  userId,
  decrypted_meeting_id,
  existingParticipants,
  onLocalStream,
  onRemoteStream
}: {
  videoRef: React.RefObject<HTMLVideoElement>;
  remoteVideoRef: React.RefObject<HTMLVideoElement>;
  peerConnectionRef: React.MutableRefObject<{ [key: string]: RTCPeerConnection }>;
  socket: any;
  userId: string;
  decrypted_meeting_id: string;
  existingParticipants: string[];
  onLocalStream?: (stream: MediaStream) => void;
  onRemoteStream?: (userId: string, stream: MediaStream) => void;
}) {

  
  const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  if (videoRef.current) videoRef.current.srcObject = localStream;
  if (onLocalStream) onLocalStream(localStream);


  const peers: { [id: string]: RTCPeerConnection } = {};
  const pendingCandidates: { [id: string]: RTCIceCandidateInit[] } = {};


  function createPeerConnection(Uid: string): RTCPeerConnection {
    // Finding out own public IP and port using public server of google and storing details connection in peer object.
    const peer = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });


    // grabbing local stream and adding tracks to peer connection
    localStream.getTracks().forEach(track => peer.addTrack(track, localStream));


    // creating a remote stream object to handle remote stream
    const remoteStream = new MediaStream();

    // assigning remote stream to video element
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
    }

    // Hook incoming tracks into remoteStream
    peer.ontrack = (event) => {
      event.streams[0].getTracks().forEach(track => remoteStream.addTrack(track));
      if (onRemoteStream) onRemoteStream(Uid, remoteStream);
    };




    peer.onicecandidate = (event) => {
      if(Uid !=userId){
      if (event.candidate) {
        socket.emit('webrtc-ice-candidate', {
          to: Uid,
          from: userId,
          candidate: event.candidate,
        });
      }}
    };

    peers[Uid] = peer;
    return peer;
  }


  // Store reference
  peerConnectionRef.current = { ...peerConnectionRef.current, ...peers };



  // === Handle offers to existing users ===
  for (const Uid of existingParticipants) {

    console.log("Creating peer connection for:", Uid);
    const peer = createPeerConnection(Uid);
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    if(Uid!=userId){

      socket.emit('webrtc-offer', { to: Uid, from: userId, offer });
    }
  }


  // === Incoming offer ===
  socket.on('webrtc-offer', async ({ from, offer }: SignalData) => {
    console.log("received offer from:", from);
    if (peers[from]) return; // Already handled


    const peer = createPeerConnection(from);
    // console.log(offer, "offer in webrtc-offerrrr");
    // console.log(peer, "peer in webrtc-offer");


    await peer.setRemoteDescription(new RTCSessionDescription(offer!));
    // console.log(offer, "completed setting remote description in webrtc-offer");
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    socket.emit('webrtc-answer', { to: from, from: userId, answer });


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

  // Allow external access to control audio/video tracks
;(socket as any)._localStream = localStream;

}


