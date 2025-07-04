// start_media.ts
export async function startMedia({
  videoRef,
  remoteVideoRef,
  peerConnectionRef,
  isOfferer,
  socket,
}: {
  videoRef: React.RefObject<HTMLVideoElement>;
  remoteVideoRef: React.RefObject<HTMLVideoElement>;
  peerConnectionRef: React.MutableRefObject<RTCPeerConnection | null>;
  isOfferer: boolean;
  socket: any;
}) {
  console.log('[startMedia] Called with isOfferer:', isOfferer);
  try {
    console.log('[startMedia] Requesting local media...');
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    console.log('[startMedia] Got local media stream');

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      console.log('[startMedia] Set local video stream');
    }

    const peer = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" }
      ]
    });
    console.log('[startMedia] Created RTCPeerConnection');

    peerConnectionRef.current = peer;

    // Add local tracks
    stream.getTracks().forEach((track) => {
      peer.addTrack(track, stream);
      console.log('[startMedia] Added local track:', track.kind);
    });

    // Set up remote stream
    const remoteStream = new MediaStream();
    if (remoteVideoRef && remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
      console.log('[startMedia] Set remote video stream');
    }

    peer.ontrack = (event) => {
      console.log('[startMedia] Received remote track:', event.track.kind);
      remoteStream.addTrack(event.track);
    };

    // ICE candidate handling
    peer.onicecandidate = (event) => {
      if (event.candidate) {
        console.log('[startMedia] Sending ICE candidate');
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
          console.log('[startMedia] Added buffered ICE candidate');
        } catch (err) {
          console.warn('[startMedia] Failed to add buffered ICE candidate:', err);
        }
      }
    }

    // ICE candidate reception
    socket.on('webrtc-ice-candidate', (candidate: any) => {
      if (candidate) {
        if (peer.remoteDescription && peer.remoteDescription.type) {
          peer.addIceCandidate(new RTCIceCandidate(candidate)).then(() => {
            console.log('[startMedia] Added ICE candidate');
          }).catch((err) => {
            console.error('[startMedia] Failed to add ICE candidate:', err);
          });
        } else {
          // Buffer the candidate
          pendingCandidates.push(candidate);
          console.log('[startMedia] Buffered ICE candidate');
        }
      }
    });

    // Offerer logic
    if (isOfferer) {
      try {
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);
        console.log('[startMedia] Created and set local offer');
        socket.emit('webrtc-offer', offer);
      } catch (err) {
        console.error('[startMedia] Failed to create/set offer:', err);
      }

      socket.once('webrtc-answer', async (answer: any) => {
        console.log('[startMedia][Offerer] Received answer, signalingState:', peer.signalingState);
        if (peer.signalingState === 'have-local-offer') {
          try {
            await peer.setRemoteDescription(new RTCSessionDescription(answer));
            console.log('[startMedia][Offerer] Set remote answer');
            await handleRemoteDescriptionSet();
          } catch (err) {
            console.error('[startMedia][Offerer] Failed to set remote answer:', err);
          }
        } else {
          console.warn('[startMedia][Offerer] Not in the right state to set remote answer:', peer.signalingState);
        }
      });
    }

    // Answerer logic
    if (!isOfferer) {
      socket.once('webrtc-offer', async (offer: RTCSessionDescriptionInit) => {
        console.log('[startMedia][Answerer] Received offer, signalingState:', peer.signalingState);
        if (peer.signalingState === 'stable') {
          try {
            await peer.setRemoteDescription(new RTCSessionDescription(offer));
            console.log('[startMedia][Answerer] Set remote offer');
            await handleRemoteDescriptionSet();
            const answer = await peer.createAnswer();
            await peer.setLocalDescription(answer);
            console.log('[startMedia][Answerer] Created and set local answer');
            socket.emit('webrtc-answer', answer);
          } catch (err) {
            console.error('[startMedia][Answerer] Failed to handle offer/answer:', err);
          }
        } else {
          console.warn('[startMedia][Answerer] Not in the right state to set remote offer:', peer.signalingState);
        }
      });
    }

  } catch (err) {
    console.error('[startMedia] Failed to get media or set up WebRTC:', err);
  }
}