
"use client"
import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client'; // Default import of io
import { Socket } from 'socket.io-client'; // Importing the Socket class
import { startMedia } from '../(utils)/start_media/start_media';


const tasks = [
  'Opening',
  'Performance Evaluation of the Party',
  'Planning Party Programs and Activities',
  'Internal Party Consolidation',
  'Party Financial Plan',
];





const documents = [
  { title: 'Meeting Minutes.pdf', reason: 'Weekly Review', url: '#' }, 
  { title: 'Financial Report.xlsx', reason: 'Budget Analysis', url: '#' },
  { title: 'Party Program.docx', reason: 'Event Planning', url: '#' },
];



// ok

interface VideoMeetingProps {
  roomId: string;
}
interface ChatMessage {
  name: string;
  message: string;
}
const VideoMeeting = ({ roomId }: VideoMeetingProps) => {


    const [NewMessage,setNewMessage] = useState<ChatMessage>({name: '', message: ''})
    const [chatMessages,setchatMessages] = useState<ChatMessage[]>([])
    const socketRef = useRef<typeof Socket | null>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const peerConnectionRef = useRef<{ [userId: string]: RTCPeerConnection }>({});
    const tempRef = useRef<MediaStream | null>(null);
    const localStreamRef = useRef<MediaStream | null>(null);
    const [videoPaused, setVideoPaused] = useState(false);
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const [remoteUserIds, setRemoteUserIds] = useState<string[]>([]);
    const remoteVideoRefs = useRef<{ [id: string]: React.RefObject<HTMLVideoElement> }>({});
    const [mainVideoRef, setMainVideoRef] = useState<React.RefObject<HTMLVideoElement>>(localVideoRef);
    const [mainscreenId , setMainscreenId] = useState<string | null>(null);
    const allStreamsRef = useRef<{ [userId: string]: MediaStream }>({});

    



useEffect(() => {
  // console.log('[VideoMeeting] useEffect triggered');
  const socket = io("https://ishc-socketio-server-production.up.railway.app");
  socketRef.current = socket;
  // console.log('[VideoMeeting] Socket connected:', socket);


  socket.emit('join-room', roomId);
  // console.log('[VideoMeeting] join-room emitted:', roomId);
 
  socket.on("send-previous-chats",({msg}: {msg: ChatMessage[]}) => {
    // console.log('[VideoMeeting] Received chat messages:', msg);
    setchatMessages(prevMessages => [...prevMessages, ...msg]);
  });
  socket.on("receive-chat",({msg}: {msg: ChatMessage}) => {
    // console.log('[VideoMeeting] Received chat message:', msg);
    setchatMessages(prevMessages => [...prevMessages, msg]);
  });

socket.on("user-disconnected", ({userId}:{userId: string}) => {
  console.log('[VideoMeeting] User disconnected:', userId);
  if (remoteVideoRefs.current[userId]?.current) {
  remoteVideoRefs.current[userId].current.srcObject = null;
  delete remoteVideoRefs.current[userId];
}

  for(var i=0;i<remoteUserIds.length-1;i++){
    if(userId === remoteUserIds[i]){
      continue
    }

      allStreamsRef.current[remoteUserIds[i]] = allStreamsRef.current[remoteUserIds[i+1]];

    

  }

  setRemoteUserIds(prevIds => prevIds.filter(id => id !== userId));


});




  socket.on('room-info', ({ existingUsers, existingChats }: { existingUsers: string[], existingChats: ChatMessage[] }) => {
  

    
    
    existingUsers.forEach(id => {
      if (!remoteVideoRefs.current[id]) {
        remoteVideoRefs.current[id] = React.createRef<HTMLVideoElement>();
      }
    });
    
    const usersExceptMe = existingUsers.filter(id => id !== socket.id);


    
    setRemoteUserIds(usersExceptMe);




    // ✅ Set default main video to first remote user (if available)
    if (usersExceptMe.length > 0) {
      setMainVideoRef(remoteVideoRefs.current[usersExceptMe[0]]);
    }


    startMedia({
      videoRef: localVideoRef,
      remoteVideoRef,
      peerConnectionRef,
      socket,
      roomId,
      existingUsers,
      onLocalStream: (stream: MediaStream) => {
        console.log("got a local stream for user",  stream);
        localStreamRef.current = stream;
      },
      onRemoteStream: (userId: string, stream: MediaStream) => {
        allStreamsRef.current[userId] = stream;
        console.log("streaming----------------------------------------------------------")
      if(!(remoteVideoRefs.current[userId] && remoteVideoRefs.current[userId].current)){


        remoteVideoRefs.current[userId] = React.createRef<HTMLVideoElement>();
        console.log(socket.id, "self id in onRemoteStream");
       console.log([...usersExceptMe, userId])
        
        setRemoteUserIds(usersExceptMe => [...usersExceptMe, userId]);
      }
     
       
          
      setTimeout(() => {
        console.log("inside settimeout---------------------------------------------------------------")
        if (remoteVideoRefs.current[userId] && remoteVideoRefs.current[userId].current) {
          console.log("inside ---------------------------------------------------------------")
          
          remoteVideoRefs.current[userId].current!.srcObject = stream;
        }
        
      }, 5000);
      },
    });
  });


  return () => {
    // console.log('[VideoMeeting] Disconnecting socket');
    socket.disconnect();
  };
}, [roomId]);




// Pause local video track
const handlePause = () => {
  const stream = localStreamRef.current;
  if (stream) {
    stream.getVideoTracks().forEach(track => track.enabled = false);
    setVideoPaused(true);
  }
};


// Play/resume local video track
const handlePlay = () => {
  const stream = localStreamRef.current;
  if (stream) {
    stream.getVideoTracks().forEach(track => track.enabled = true);
    setVideoPaused(false);
  }
};




const handleMsgSend = () => {
 
  if (!NewMessage.name || !NewMessage.message) return; // Ensure both fields are filled
 
  setNewMessage({name: '', message: ''})
  // console.log("trying to send message", NewMessage, roomId);
  socketRef?.current?.emit('send-chat', { msg: NewMessage , roomId });
  setchatMessages(prevMessages => [...prevMessages, NewMessage]);


}




  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full lg:w-20 bg-gray-900 text-white flex flex-row lg:flex-col items-center py-3 lg:py-6 space-x-6 lg:space-x-0 lg:space-y-6 rounded-xl m-2 lg:m-4">
        <div className="flex flex-row lg:flex-col items-center space-x-6 lg:space-x-0 lg:space-y-6 flex-1">
          <button className="p-2 hover:bg-gray-800 rounded-lg">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>
          </button>
          <button className="p-2 hover:bg-gray-800 rounded-lg">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" /></svg>
          </button>
          <button className="p-2 hover:bg-gray-800 rounded-lg">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></svg>
          </button>
        </div>
        </aside>


      {/* Main Content */}
      <main className="flex-1 flex flex-col p-2 sm:p-4 lg:p-6 space-y-4 lg:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center">
            <button className="mr-2 sm:mr-4 p-2 bg-gray-200 rounded-full">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
            </button>
            <span className="font-semibold text-base sm:text-lg">Partai Banteng Weekly Meeting</span>
            <span className="ml-2 text-gray-500 text-xs sm:text-sm">{remoteUserIds.length} Participants</span>
          </div>
          <button className="bg-red-100 text-red-600 px-3 sm:px-4 py-2 rounded-lg font-semibold text-xs sm:text-base">Leave Meeting</button>
        </div>


        {/* Video Area */}
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6">
          {/* Main Speaker */}
          <div className="flex-1  rounded-2xl p-2 sm:p-4 lg:p-6 relative shadow-md min-w-0">
            <div className="w-full h-80 sm:h-[26rem] object-cover rounded-xl relative">
              {/* Local video in main area */}
             
              <video
                ref={remoteVideoRefs.current[remoteUserIds[0]]}
                autoPlay
                playsInline
                className={`w-full h-full object-cover rounded-xl border border-gray-300 `}
                muted
              />
             
           
            </div>
            {/* Controls only on main video */}
            {mainVideoRef === localVideoRef ? (
              <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-4">
                {/* Pause/Play Button */}
                {videoPaused ? (
                  <button onClick={handlePlay} className="bg-white p-2 sm:p-3 rounded-full shadow" title="Play">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21" /></svg>
                  </button>
                ) : (
                  <button onClick={handlePause} className="bg-white p-2 sm:p-3 rounded-full shadow" title="Pause">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
                  </button>
                )}
                <button className="bg-white p-2 sm:p-3 rounded-full shadow"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14" /><rect x="3" y="6" width="12" height="12" rx="2" /></svg></button>
                <button className="bg-white p-2 sm:p-3 rounded-full shadow"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 18v-6m0 0V6m0 6h6m-6 0H6" /></svg></button>
                <button className="bg-red-600 text-white p-2 sm:p-3 rounded-full shadow"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" /></svg></button>
              </div>
            ) : null}
            {/* Self View Window (small) */}
            <div
              className="absolute bottom-4 right-4 w-24 h-24 sm:w-32 sm:h-32 bg-gray-200 rounded-xl shadow-lg flex flex-col items-center justify-end overflow-hidden border-2 border-white cursor-pointer"
              // onClick={() => setMainVideoRef(localVideoRef)}
              title="Click to swap videos"
            >
              {/* Small video (always rendered) */}
              <video ref={localVideoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', border: '1px solid #ccc', marginLeft: '0' }} />
              <span className="bg-black bg-opacity-60 text-white text-xs px-2 py-1 w-full text-center absolute bottom-0 left-0">You</span>
            </div>
          </div>
          {/* Participants */}
          {/* ... existing code ... */}
        </div>
        {/* Chat UI below video area */}
        <div className="w-full max-w-2xl mx-auto mt-4 bg-white rounded-2xl shadow p-4 flex flex-col space-y-2">
          <div className="flex-1  overflow-y-auto space-y-2">
            {chatMessages?.map((msg, i) => (
  msg && msg.name && msg.message ? (
    <div key={i} className="flex items-center space-x-2">
      <span className={`font-semibold text-xs ${msg.name === 'You' ? 'text-blue-600' : 'text-gray-800'}`}>{msg.name}:</span>
      <span className="text-sm text-gray-700">{msg.message}</span>
    </div>
  ) : null
))}
          </div>
          <div className="flex items-center space-x-2 pt-2 border-t">
            <input value={NewMessage?.message} onChange={(e) => setNewMessage({"name":"Socket.id", "message": e.target.value})} type="text" placeholder="Type a message..." className="flex-1 border rounded-full px-4 py-2 text-sm" />
            <button onClick={()=>{handleMsgSend()}} className="bg-gray-900 text-white px-4 py-2 rounded-full">Send</button>
          </div>
        </div>
      </main>


      {/* Right Panel */}
      <aside className="w-full  lg:w-[40rem] flex flex-col space-y-4 lg:space-y-6 p-2 sm:p-4 lg:p-6">
        {/* Meeting Task List */}
        <div className="bg-gray-900 rounded-2xl p-4 text-white shadow">
          <h3 className="font-semibold mb-2">Meeting Task List</h3>
          <ul className="space-y-1">
            {tasks.map((t, i) => (
              <li key={i} className="flex items-center">
                <span className="w-4 h-4 mr-2 flex items-center justify-center">
                  {i === 0 ? (
                    <span className="inline-block w-2 h-2 bg-white rounded-full"></span>
                  ) : (
                    <span className="inline-block w-2 h-2 border border-white rounded-full"></span>
                  )}
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
        {/* Document List */}
        <div className="bg-white rounded-2xl p-4 shadow flex flex-col flex-1">
          <h3 className="font-semibold mb-2">Documents To Review</h3>
          <div className="flex-1 space-y-3 overflow-x-auto">
            {documents.map((doc, i) => (
              <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 min-w-[320px]">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 flex-1 min-w-0">
                  <span className="font-medium text-sm truncate max-w-[100px] sm:max-w-[140px]">{doc.reason}</span>
                  <span className="text-xs text-gray-500 truncate max-w-[100px] sm:max-w-[140px]">{doc.title}</span>
                </div>
                <div className="flex space-x-2 ml-auto">
                  <div className="bg-gray-900   text-white px-4 py-1 rounded-xl text-xs font-semibold transition-colors duration-150 shadow-sm">Not Started</div>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-semibold transition-colors duration-150 shadow-sm">Open</button>
                  <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-1 rounded-full text-xs font-semibold transition-colors duration-150 shadow-sm">Add Note</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>


      {/* Vertical Participants Sidebar */}
      <aside className="flex flex-col gap-3 overflow-y-auto max-h-[80vh] w-28 sm:w-36 p-2 bg-white rounded-xl shadow-md">
     
        {/* Remote videos */}
        {remoteUserIds.slice(1).map(id => (
          <div key={id} onClick={() => {
            remoteVideoRefs.current[id].current!.srcObject = allStreamsRef.current[remoteUserIds[0]];
            remoteVideoRefs.current[remoteUserIds[0]].current!.srcObject = allStreamsRef.current[id];


            tempRef.current = allStreamsRef.current[id];
            allStreamsRef.current[id] = allStreamsRef.current[remoteUserIds[0]];
            allStreamsRef.current[remoteUserIds[0]] = tempRef.current;

          }} className="relative rounded-lg border-2 border-gray-300 bg-gray-100 cursor-pointer" style={{ aspectRatio: '1/1' }}>
            <video ref={remoteVideoRefs.current[id]} autoPlay playsInline className="w-full h-full object-cover rounded-lg" style={{ background: '#222' }} />
            <span className="absolute bottom-1 left-1 right-1 bg-black bg-opacity-60 text-white text-xs px-2 py-0.5 rounded text-center truncate">User {id.substring(0, 5)}</span>
          </div>
        ))}
      </aside>
    </div>
  );
};


export default VideoMeeting;
