// start_media.ts
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

    const peer = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" }
      ]
    });

    peerConnectionRef.current = peer;

    // Add local tracks
    stream.getTracks().forEach((track) => {
      peer.addTrack(track, stream);
    });

    // Set up remote stream
    const remoteStream = new MediaStream();
    const remoteVideo = document.getElementById("remoteVideo") as HTMLVideoElement;
    if (remoteVideo) {
      remoteVideo.srcObject = remoteStream;
    }

    peer.ontrack = (event) => {
      remoteStream.addTrack(event.track);
    };

    // ICE candidate handling
    peer.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('webrtc-ice-candidate', event.candidate);
      }
    };

    // Buffer for ICE candidates received before remote description is set
    const pendingCandidates: RTCIceCandidateInit[] = [];

    // Helper to add buffered candidates after remote description is set
    async function handleRemoteDescriptionSet() {
      while (pendingCandidates.length > 0) {
        const cand = pendingCandidates.shift();
        try {
          await peer.addIceCandidate(new RTCIceCandidate(cand));
        } catch (err) {
          console.warn("Failed to add buffered ICE candidate:", err);
        }
      }
    }

    // ICE candidate reception
    socket.on('webrtc-ice-candidate', (candidate: any) => {
      if (candidate) {
        if (peer.remoteDescription && peer.remoteDescription.type) {
          peer.addIceCandidate(new RTCIceCandidate(candidate));
        } else {
          // Buffer the candidate
          pendingCandidates.push(candidate);
        }
      }
    });

    // Offerer logic
    if (isOfferer) {
      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);
      socket.emit('webrtc-offer', offer);

      socket.on('webrtc-answer', async (answer: any) => {
        console.log("[Offerer] Received answer, signalingState:", peer.signalingState);
        if (peer.signalingState === "have-local-offer") {
          await peer.setRemoteDescription(new RTCSessionDescription(answer));
          await handleRemoteDescriptionSet();
        } else {
          console.warn("[Offerer] Not in the right state to set remote answer:", peer.signalingState);
        }
      });
    }

    // Answerer logic
    if (!isOfferer) {
      socket.on('webrtc-offer', async (offer: RTCSessionDescriptionInit) => {
        console.log("[Answerer] Received offer, signalingState:", peer.signalingState);
        if (peer.signalingState === "stable") {
          await peer.setRemoteDescription(new RTCSessionDescription(offer));
          await handleRemoteDescriptionSet();
          const answer = await peer.createAnswer();
          await peer.setLocalDescription(answer);
          socket.emit('webrtc-answer', answer);
        } else {
          console.warn("[Answerer] Not in the right state to set remote offer:", peer.signalingState);
        }
      });
    }

  } catch (err) {
    console.error('Failed to get media or set up WebRTC:', err);
  }
}