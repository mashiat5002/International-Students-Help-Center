
"use client"
import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client'; // Default import of io
import { Socket } from 'socket.io-client'; // Importing the Socket class
import { startMedia } from '../(utils)/start_media/start_media';
import { call_send_msg_through_socket } from '../../../lib/auth/call_send_msg_through_socket';
import { call_join_room_to_socket } from '../../../lib/auth/join_room_to_socket';
import { FiMic } from "react-icons/fi";
import { FiMicOff } from "react-icons/fi";
import { FiVideo } from "react-icons/fi";
import { FiVideoOff } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import { VideoBoxBig } from './VideoBoxBig';
import { Video_call_Documets_review } from './Video_call_Documets_review';
import { VideoBoxSmall } from './VideoBoxSmall';




interface VideoMeetingProps {
  roomId: string;
}
interface ChatMessage {
  name: string;
  message: string;
}
type UserInfo = {
  name: string;
  roomId: string;
};

type UsersMap = {
  [socketId: string]: UserInfo;
};



const VideoMeeting = ({ roomId }: VideoMeetingProps) => {

    const [newComer,setnewComer]= useState("")
    const [rerender,setRerender] = useState<boolean>(true)
    const [btnrerender,setbtnRerender] = useState<boolean>(true)
    const [viewingSelf,setviewingSelf] = useState<boolean>(true)
    const [vdoPausedself,setvdoPausedself] = useState<boolean>(false)
    const [mutedself,setmutedself] = useState<boolean>(false)
    const [viewingOnbigscreen,setviewingOnbigscreen] = useState<string>('')
    const [mysocketId,setmysocketId] = useState<string>('')
    const [NewMessage,setNewMessage] = useState<string>('')
    const [chatMessages,setchatMessages] = useState<ChatMessage[]>([])
    const socketRef = useRef<typeof Socket | null>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const peerConnectionRef = useRef<{ [userId: string]: RTCPeerConnection }>({});
    const localStreamRef = useRef<MediaStream | null>(null);
    const [videoPaused, setVideoPaused] = useState(false);
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const [remoteUserIds, setRemoteUserIds] = useState<string[]>([]);
    const remoteVideoRefs = useRef<{ [id: string]: React.RefObject<HTMLVideoElement> }>({});
    const [mainVideoRef, setMainVideoRef] = useState<React.RefObject<HTMLVideoElement>>(localVideoRef);
    const [UserInforDetails , setUserInforDetails] = useState<UsersMap >({});
    const allStreamsRef = useRef<{ [userId: string]: MediaStream }>({});
    const [myObject, setMyObject] = useState({});
    const router = useRouter();
    
  


useEffect(() => {
  
  const socket = io("https://ishc-socketio-server-production.up.railway.app");
  socketRef.current = socket;
  
 
  
 
  
  socket.on("connect", () => {
    setmysocketId(socket.id)
    const calling_join_room = async () => {
      await call_join_room_to_socket(roomId, socket.id)
      socket.emit('join-room', roomId);
    }
  calling_join_room()
});
 

  socket.on("receive-notes",({msg}: {msg: any}) => {
    // console.log('received note:', msg);
    setMyObject(prev => ({
  ...prev,         // keep all existing keys
  [msg.idx]: msg.note  // add a new key "country"
}));

   
  });
  socket.on("add-new-userDetails",({updatedUserDetails,existingUsers}: {updatedUserDetails: UsersMap,existingUsers: string[]}) => {
    console.log('on new user entry1:', updatedUserDetails);
    console.log('on new user entry2:', existingUsers);
    setRemoteUserIds(Array.from(new Set(existingUsers.filter((id)=> id != socket.id))))
    
    setUserInforDetails(updatedUserDetails);
  });


  socket.on("send-previous-chats",({msg}: {msg: ChatMessage[]}) => {
    // console.log('[VideoMeeting] Received chat messages:', msg);
    setchatMessages(prevMessages => [...prevMessages, ...msg]);
  });
  socket.on("receive-chat",({msg}: {msg: ChatMessage}) => {
    // console.log('[VideoMeeting] Received chat message:', msg);
    setchatMessages(prevMessages => [...prevMessages, msg]);
  });

socket.on("user-disconnected", ({userId}:{userId: string}) => {
  // console.log('[VideoMeeting] User disconnected:', userId);
  if (remoteVideoRefs.current[userId]?.current) {
  remoteVideoRefs.current[userId].current.srcObject = null;
  delete remoteVideoRefs.current[userId];
  delete allStreamsRef.current[userId]
}

  

  setRemoteUserIds(prevIds => prevIds.filter(id => id !== userId));
  console.log("viewing", remoteUserIds[0])
  setviewingOnbigscreen(remoteUserIds[0])


});




  socket.on('room-info', ({ existingUsers, existingUserDetails }: { existingUsers: string[], existingUserDetails: any }) => {
  

    setUserInforDetails(existingUserDetails);

    existingUsers.forEach(id => {
      if (!remoteVideoRefs.current[id]) {
        remoteVideoRefs.current[id] = React.createRef<HTMLVideoElement>();
      }
    });
    
    const usersExceptMe = existingUsers.filter(id => id !== socket.id);


    
    setRemoteUserIds(Array.from(new Set(usersExceptMe)));
    const temp=usersExceptMe
    console.log("viewing",temp[0])
    setviewingOnbigscreen(temp[0])




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
        localStreamRef.current = stream;
      },
      onRemoteStream: (userId: string, stream: MediaStream) => {
        allStreamsRef.current[userId] = stream;
      if(!(remoteVideoRefs.current[userId] && remoteVideoRefs.current[userId].current)){


        remoteVideoRefs.current[userId] = React.createRef<HTMLVideoElement>();
       
        setTimeout(() => { setnewComer(userId) }, 5000);


      }
     
       
          
      setTimeout(() => {
     
        if (remoteVideoRefs.current[userId] && remoteVideoRefs.current[userId].current) {
          
          remoteVideoRefs.current[userId].current!.srcObject = stream;
        }
        
      }, 5000);
      },
    });
  });


  return () => {
    socket.disconnect();
  };
}, [roomId]);


 const send_note=(note:string,idx:string)=>{
    socketRef.current?.emit("send-notes", {
      msg:  {note:note,idx:idx}
    });
  }

const isVDOStreamEnabled = (stream: MediaStream | undefined) => {
  return stream?.getVideoTracks().some(track => track.enabled) ?? false;
};

const isAudioStreamEnabled = (stream: MediaStream | undefined) => {
  return stream?.getAudioTracks().some(track => track.enabled) ?? false;
};

const pauseRemoteVideo = (userId: string) => {
  console.log(userId,"is given for pausing remote vdo")
  const stream = allStreamsRef.current[userId];
  if (stream) {
    stream.getVideoTracks().forEach(track => (track.enabled = false));
  }
 setbtnRerender(!btnrerender)};

const resumeRemoteVideo = (userId: string) => {
  console.log(userId,"is given for resuming remote vdo")
  const stream = allStreamsRef.current[userId];
  if (stream) {
    stream.getVideoTracks().forEach(track => (track.enabled = true));
  }
 setbtnRerender(!btnrerender)};

const muteRemoteAudio = (userId: string) => {
  const stream = allStreamsRef.current[userId];
  if (stream) {
    console.log("given for muting",userId)
    stream.getAudioTracks().forEach(track => (track.enabled = false));
  }
  setbtnRerender(!btnrerender)
};

const unmuteRemoteAudio = (userId: string) => {
  console.log("given for unmuting",userId)
  const stream = allStreamsRef.current[userId];
  if (stream) {
    stream.getAudioTracks().forEach(track => (track.enabled = true));
  }
  setbtnRerender(!btnrerender)
};






// Pause local video track
const handlePause = () => {
  console.log("called handle pause")
  const stream = localStreamRef.current;
  if (stream) {
    stream.getVideoTracks().forEach(track => track.enabled = false);
    setVideoPaused(true);
  }
};


// Play/resume local video track
const handlePlay = () => {
  console.log("called handle play")
  const stream = localStreamRef.current;
  if (stream) {
    stream.getVideoTracks().forEach(track => track.enabled = true);
    setVideoPaused(false);
  }
};
// Mute local audio track
const handleMute = () => {
  const stream = localStreamRef.current;
  if (stream) {
    stream.getAudioTracks().forEach(track => track.enabled = false);
    setmutedself(true);
  }
};

// Unmute local audio track
const handleUnmute = () => {
  const stream = localStreamRef.current;
  if (stream) {
    stream.getAudioTracks().forEach(track => track.enabled = true);
    setmutedself(false);
  }
};
const handlegetOut = () => {
  const stream = localStreamRef.current;
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
  }
  socketRef.current?.disconnect();
  router.push('/');
};




const handleMsgSend = async() => {
 
  if (NewMessage=="") return; 
 await call_send_msg_through_socket(NewMessage, roomId);


setNewMessage('')


}
useEffect(() => {
  // (window as any).remoteUserIds = remoteUserIds;
  (window as any).viewingOnbigscreen = viewingOnbigscreen;
  // (window as any).mysocketId = mysocketId;
}, [viewingOnbigscreen]);




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
            <span className="font-semibold text-base sm:text-lg">University of Otago MSC Application</span>
            <span className="ml-2 text-gray-500 text-xs sm:text-sm">{remoteUserIds.length} Participants</span>
          </div>
          <button className="bg-red-100 text-red-600 px-3 sm:px-4 py-2 rounded-lg font-semibold text-xs sm:text-base">Leave Meeting</button>
        </div>


        {/* Video Area */}
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6">
          {/* Main Speaker */}
          <div className="flex-1  rounded-2xl p-2 sm:p-4 lg:p-6 relative shadow-md min-w-0">
            <div  className="w-full h-80 sm:h-[26rem] object-cover rounded-xl relative">
              {/* Local video in main area */}
              <p className='absolute m-4 bg-transparent font-bold '>{UserInforDetails ? UserInforDetails[remoteUserIds[0]]?.name : `User ${remoteUserIds[0].substring(0, 5)}`}</p>
             
         
            <VideoBoxBig stream={!viewingSelf?localStreamRef.current:allStreamsRef.current[remoteUserIds[0]] }   rerender={rerender}   />
              
              
             
           
            </div>


            {/* Controls only on main video */}
           
              {!viewingSelf
              ?<div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-4">
                {/* Pause/Play Button */}
               {vdoPausedself?<button onClick={()=>{handlePlay(),setvdoPausedself(false)}} className='bg-white hover:bg-slate-400  p-2 sm:p-3 rounded-full shadow'><FiVideo /></button>:<button onClick={()=>{handlePause(),setvdoPausedself(true)}} className='bg-white hover:bg-slate-400 p-2 sm:p-3 rounded-full shadow '><FiVideoOff /></button>}
                {mutedself?<button onClick={()=>{handleUnmute(),setmutedself(false)}}  className='bg-white hover:bg-slate-400 p-2 sm:p-3 rounded-full shadow'><FiMic /></button>:<button onClick={()=>{handleMute(),setmutedself(true)}} className='bg-white hover:bg-slate-400 p-2 sm:p-3 rounded-full shadow'><FiMicOff /></button>}
                 <button onClick={()=>{handlegetOut()}} className="bg-red-500 hover:bg-red-600 p-2 sm:p-3 rounded-full shadow text-white"><IoCloseSharp  className="w-full h-full" /></button>             
              </div>:
              btnrerender?<div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-4">
                {/* Pause/Play Button */}
               {isVDOStreamEnabled(allStreamsRef.current[viewingOnbigscreen])?<button onClick={()=>{pauseRemoteVideo(viewingOnbigscreen)}} className='bg-white hover:bg-slate-400  p-2 sm:p-3 rounded-full shadow'><FiVideo /></button>:<button onClick={()=>{resumeRemoteVideo(viewingOnbigscreen)}} className='bg-white hover:bg-slate-400 p-2 sm:p-3 rounded-full shadow '><FiVideoOff /></button>}
                {isAudioStreamEnabled(allStreamsRef.current[viewingOnbigscreen])?<button onClick={()=>{muteRemoteAudio(viewingOnbigscreen)}} className='bg-white hover:bg-slate-400 p-2 sm:p-3 rounded-full shadow'><FiMic /></button>:<button onClick={()=>{unmuteRemoteAudio(viewingOnbigscreen)}} className='bg-white hover:bg-slate-400 p-2 sm:p-3 rounded-full shadow'><FiMicOff /></button>}
              </div>:
              <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-4">
                {/* Pause/Play Button */}
               {isVDOStreamEnabled(allStreamsRef.current[viewingOnbigscreen])?<button onClick={()=>{pauseRemoteVideo(viewingOnbigscreen)}} className='bg-white hover:bg-slate-400  p-2 sm:p-3 rounded-full shadow'><FiVideo /></button>:<button onClick={()=>{resumeRemoteVideo(viewingOnbigscreen)}} className='bg-white hover:bg-slate-400 p-2 sm:p-3 rounded-full shadow '><FiVideoOff /></button>}
                {isAudioStreamEnabled(allStreamsRef.current[viewingOnbigscreen])?<button onClick={()=>{muteRemoteAudio(viewingOnbigscreen)}} className='bg-white hover:bg-slate-400 p-2 sm:p-3 rounded-full shadow'><FiMic /></button>:<button onClick={()=>{unmuteRemoteAudio(viewingOnbigscreen)}} className='bg-white hover:bg-slate-400 p-2 sm:p-3 rounded-full shadow'><FiMicOff /></button>}
              </div>
              
              }
           





            {/* Self View Window (small) */}
            <div onClick={()=>setviewingSelf(!viewingSelf)}
              className="absolute bottom-4 right-4 w-24 h-24 sm:w-32 sm:h-32 bg-gray-200 rounded-xl shadow-lg flex flex-col items-center justify-end overflow-hidden border-2 border-white cursor-pointer"
              // onClick={() => setMainVideoRef(localVideoRef)}
              title="Click to swap videos"
            >
              {/* Small video (always rendered) */}
              <VideoBoxSmall rerender={rerender} stream={viewingSelf?localStreamRef.current  : allStreamsRef.current[remoteUserIds[0]]}/>
              <span className="bg-black bg-opacity-60 text-white text-xs px-2 py-1 w-full text-center absolute bottom-0 left-0">{UserInforDetails ? UserInforDetails[mysocketId]?.name : `User ${mysocketId.substring(0, 5)}`} </span> 


            </div>
          </div>
          {/* Participants */}
       
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
            <input value={NewMessage} onChange={(e) => setNewMessage( e.target.value)} type="text" placeholder="Type a message..." className="flex-1 border rounded-full px-4 py-2 text-sm" />
            <button onClick={()=>{handleMsgSend()}} className="bg-gray-900 text-white px-4 py-2 rounded-full">Send</button>
          </div>
        </div>
      </main>


      {/* Right Panel */}
      <aside className="w-full  lg:w-[40rem] flex flex-col space-y-4 lg:space-y-6 p-2 sm:p-4 lg:p-6">
        {/* Meeting Task List */}
        
        {/* Document List */}
        <Video_call_Documets_review roomId= {roomId} send_note= {send_note} myObject={myObject} setMyObject={setMyObject}/>
      </aside>


      {/* Vertical Participants Sidebar */}
      <aside className="flex flex-col gap-3 overflow-y-auto max-h-[80vh] w-28 sm:w-36 p-2 bg-white rounded-xl shadow-md">
     
        {/* Remote videos */}
        {remoteUserIds.slice(1).map(id => (
          
          <div onClick={()=>{
            console.log("clickeddddd",id)
            // setviewingOnbigscreen(id)

            const temp= remoteUserIds;
            const targetIdx= temp.indexOf(id)
            const prevOntarget= temp[0];
            temp[0]= id;
            temp[targetIdx]= prevOntarget;
            setRemoteUserIds(temp)
           setRerender(!rerender)
           setviewingSelf(true)


          }}  className= {`relative rounded-lg   border-2 border-gray-300 bg-gray-100 cursor-pointer`} style={{ aspectRatio: '1/1' }}>
            <VideoBoxSmall stream={allStreamsRef.current[id]}  rerender={rerender}/>
            <span className="absolute bottom-1 left-1 right-1 bg-black bg-opacity-60 text-white text-xs px-2 py-0.5 rounded text-center truncate">{UserInforDetails ? UserInforDetails[id]?.name : `User ${id.substring(0, 5)}`}</span>
          </div>
        ))}
      </aside>
    </div>
  );
};


export default VideoMeeting;
