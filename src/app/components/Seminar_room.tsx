
"use client"
import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client'; // Default import of io
import { Socket } from 'socket.io-client'; // Importing the Socket class
import { startMedia } from '../(utils)/start_media/start_media';
import { call_send_msg_through_socket } from '../../../lib/auth/call_send_msg_through_socket';
import { FiMic } from "react-icons/fi";
import { FiMicOff } from "react-icons/fi";
import { FiVideo } from "react-icons/fi";
import { FiVideoOff } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import { usePathname, useRouter } from 'next/navigation';
import { VideoBoxBig } from './VideoBoxBig';
import { VideoBoxSmall } from './VideoBoxSmall';
import { call_fetch_seminar_details_using_roomid } from '../(utils)/call_fetch_seminar_details_using_roomid/call_fetch_seminar_details_using_roomid';
import Toast from './common/Toast';
import { call_join_room_to_socket_student } from '../../../lib/auth/join_room_to_socket_student';
import { call_join_room_to_socket_expert } from '../../../lib/auth/call_join_room_to_socket_expert';
import { call_fetch_expert_logged_id_info } from '../(utils)/call_fetch_expert_logged_id_info/call_fetch_expert_logged_id_info';
import { decrypt } from '../(utils)/jwt_encrypt_decrypt';

// Add fetch utility for seminar by ID






interface ChatMessage {
  name: string;
  message: string;
}
type UserInfo = {
  name: string;
  roomId: string;
  muted: boolean;
  video_paused: boolean;
};

type UsersMap = {
  [socketId: string]: UserInfo;
};

type seminarDetails={
    speaker: string;
    description: string;
    meeting_topic: string;
    Creation_time: Date ;
    Scheduled_time: Date;
    max_Participants: string;
    registed_participants: number;
    duration: string;
    topics: string[];
}

const Seminar_room = ({ encodedTxt,pathname }: {encodedTxt:string,pathname:string|null}) => {

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
    const [isloadingmsgSend, setisloadingmsgSend] = useState(false);
    const router = useRouter();
    
    // Seminar details state
    const [myObject, setMyObject] = useState({});
    
    const [seminarDetails, setSeminarDetails] = useState<seminarDetails | null>(null);
    const [showSidePanels, setShowSidePanels] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const videoAreaRef = useRef<HTMLDivElement>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastType, settoastType] = useState("");
    const [toastMessage, setToastMessage] = useState("");
    const [decrypted_id, setDecrypted_id] = React.useState<string>("");
    const [decrypted_meeting_id, setDecrypted_meeting_id] = React.useState<string>("");

  useEffect(() => {
    const call_fun=async () => {
      const str=  await decrypt(encodedTxt) as { id: string, meeting_id: string };
      setDecrypted_id(str.id);
      setDecrypted_meeting_id(str.meeting_id);
    }
    call_fun()
  }, []);

useEffect(() => {
  
  const socket = io("http://localhost:3001/");
  socketRef.current = socket;
  
  socket.on("connect", () => {
   socket.emit('join-room', encodedTxt);
});
 

  socket.on("receive-notes",({msg}: {msg: any}) => {
    // console.log('received note:', msg);
    setMyObject(prev => ({
  ...prev,         // keep all existing keys
  [msg.idx]: msg.note  // add a new key "country"
}));

   
  });
  socket.on("add-new-userDetails",({updatedUserDetails,existingUsers ,new_userId}: {updatedUserDetails: UsersMap,existingUsers: string[],new_userId:string}) => {
    
  });


  socket.on("send-previous-chats",({msg}: {msg: ChatMessage[]}) => {
    // console.log('[VideoMeeting] Received chat messages:', msg);
    setchatMessages(prevMessages => [...prevMessages, ...msg]);
  });
  socket.on("receive-chat",({msg}: {msg: ChatMessage}) => {
    // console.log('[VideoMeeting] Received chat message:', msg);
    setchatMessages(prevMessages => [...prevMessages, msg]);
  });

socket.on("disconnecting", ({userId,name}:{userId: string,name:string}) => {
  console.log("User disconnecting:", userId, name);
});




  socket.on('room-info', ({ existingParticipants, socketId ,userId,full_name}: { existingParticipants: string[], socketId: string, userId: string ,full_name: string}) => {

   console.log("Room info received:", { existingParticipants, socketId, userId, full_name });

    startMedia({
      videoRef: localVideoRef,
      remoteVideoRef,
      peerConnectionRef,
      socket,
      userId,
      decrypted_meeting_id,
      existingParticipants,
      onLocalStream: (stream: MediaStream) => {
        localStreamRef.current = stream;
       
      },
      onRemoteStream: (userId: string, stream: MediaStream) => {
        console.log("onRemoteStream called for userId:", userId, "with stream:", stream);
      },
    });
  });


  return () => {
    socket.disconnect();
  };
}, [decrypted_meeting_id]);



useEffect(() => {
   const callfun =async()=>{

     if(!decrypted_meeting_id) return;
     try{
      const res= await call_fetch_seminar_details_using_roomid(decrypted_meeting_id)
      setSeminarDetails(res.data[0]);

    }catch(err){
      console.log("failing to fetch seminar details")
    }
  }
  callfun() ;
  
}, [decrypted_meeting_id]);


 


const pauseRemoteVideo = (userId: string) => {


};

const resumeRemoteVideo = (userId: string) => {

};

const muteRemoteAudio = (userId: string) => {

};

const unmuteRemoteAudio = (userId: string) => {

};






// Pause local video track
const handlePause = () => {

};


// Play/resume local video track
const handlePlay = () => {

};
// Mute local audio track
const handleMute = () => {

};

// Unmute local audio track
const handleUnmute = () => {

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
  setisloadingmsgSend(true)
 await call_send_msg_through_socket(NewMessage, decrypted_meeting_id);
setisloadingmsgSend(false)

setNewMessage('')


}
useEffect(() => {
  // (window as any).remoteUserIds = remoteUserIds;
  (window as any).viewingOnbigscreen = viewingOnbigscreen;
  // (window as any).mysocketId = mysocketId;
}, [viewingOnbigscreen]);

  // Fullscreen effect for video area
  useEffect(() => {
    if (isFullscreen && videoAreaRef.current) {
      const el = videoAreaRef.current;
      if (el.requestFullscreen) {
        el.requestFullscreen();
      } else if ((el as any).webkitRequestFullscreen) {
        (el as any).webkitRequestFullscreen();
      } else if ((el as any).msRequestFullscreen) {
        (el as any).msRequestFullscreen();
      }
    } else if (!isFullscreen && document.fullscreenElement) {
      document.exitFullscreen?.();
    }
    // Clean up: exit fullscreen if component unmounts
    return () => {
      if (document.fullscreenElement) {
        document.exitFullscreen?.();
      }
    };
  }, [isFullscreen]);


  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`w-full lg:w-20 bg-gray-900 text-white flex flex-row lg:flex-col items-center py-3 lg:py-6 space-x-6 lg:space-x-0 lg:space-y-6 rounded-xl m-2 lg:m-4${isFullscreen ? ' fixed top-4 left-4 z-[100] w-auto lg:w-20 m-0' : ''}`}
        style={isFullscreen ? { borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.25)' } : {}}
      >
        <div className="flex flex-row lg:flex-col items-center space-x-6 lg:space-x-0 lg:space-y-6 flex-1">
          <button
            className={`p-2 rounded-lg transition-colors duration-150 ${!showSidePanels ? 'bg-red-100 text-black' : 'hover:bg-gray-800 text-gray-300'}`}
            onClick={() => setShowSidePanels((prev) => !prev)}
            title={showSidePanels ? 'Hide side panels' : 'Show side panels'}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6">
              <circle cx="12" cy="12" r="10" />
            </svg>
          </button>
          <button
            className={`p-2 rounded-lg transition-colors duration-150 ${isFullscreen ? 'bg-red-100 text-black' : 'hover:bg-gray-800 text-gray-300'}`}
            onClick={() => setIsFullscreen((prev) => !prev)}
            title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6">
              <rect x="4" y="4" width="16" height="16" rx="2" />
            </svg>
          </button>
         
        </div>
      </aside>

        


      {/* Main Content */}
      <main className="flex-1 flex flex-col p-2 sm:p-4 lg:p-6 space-y-4 lg:space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center ">
            
            <span className="ml-2 font-semibold text-base sm:text-lg mr-5">{seminarDetails?.meeting_topic}</span>
            <span className="ml-2 text-gray-500 text-xs sm:text-sm md:mt-2">{remoteUserIds.length+1} Joined</span>
          </div>
          {pathname?.includes("expert-dashboard")?<button onClick={()=>handlegetOut()} className="bg-red-100 text-red-600 hover:bg-red-500 hover:text-white px-3 sm:px-4 py-2 rounded-lg font-semibold text-xs sm:text-base">End Meeting</button>:null}
        </div>
 

        {/* Video Area */}
        <div
          ref={videoAreaRef}
          className={`${!showSidePanels?"h-[40rem]":null} flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6${isFullscreen ? ' fixed inset-0 z-50 w-screen h-screen !m-0 !rounded-none !p-0' : ''}`}
          style={isFullscreen ? { width: '100vw', height: '100vh', margin: 0, borderRadius: 0, padding: 0 } : {}}
        >
          {/* Main Speaker */}
          <div className="flex-1  rounded-2xl p-2 sm:p-4 lg:p-6 relative shadow-md min-w-0">
            <div
              className={`w-full ${(isFullscreen || !showSidePanels) ? 'h-full' : 'h-80 sm:h-[26rem]'} object-cover rounded-xl relative`}
            >
              {/* Local video in main area */}
              <p className='absolute m-4 bg-transparent font-bold text-white'>{UserInforDetails ? UserInforDetails[!viewingSelf?mysocketId:remoteUserIds[0]]?.name : `User ${remoteUserIds[0].substring(0, 5)}`}</p>
             
             
         
            <VideoBoxBig stream={!viewingSelf?localStreamRef.current:allStreamsRef.current[remoteUserIds[0]] }   rerender={rerender}   />
        
            </div>
            

          

            {/* Controls only on main video */}
           
             
            
              <div className="mb-2 absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-4">
                {/* Pause/Play Button */}
               {UserInforDetails[viewingOnbigscreen]?.video_paused?<button onClick={()=>{resumeRemoteVideo(viewingOnbigscreen)}} className='bg-white hover:bg-slate-400  p-2 sm:p-3 rounded-full shadow'><FiVideoOff /></button>:<button onClick={()=>{pauseRemoteVideo(viewingOnbigscreen)}} className='bg-white hover:bg-slate-400 p-2 sm:p-3 rounded-full shadow '><FiVideo /></button>}
                {UserInforDetails[viewingOnbigscreen]?.muted?<button onClick={()=>{unmuteRemoteAudio(viewingOnbigscreen)}} className='bg-white hover:bg-slate-400 p-2 sm:p-3 rounded-full shadow'><FiMicOff /></button>:<button onClick={()=>{muteRemoteAudio(viewingOnbigscreen)}} className='bg-white hover:bg-slate-400 p-2 sm:p-3 rounded-full shadow'><FiMic /></button>}
              </div>
              
              
           





            {/* Self View Window (small) */}
          
            <div onClick={()=>{setviewingSelf(!viewingSelf)}}
              className={`${remoteUserIds.length==0?"hidden":""}  absolute bottom-4 right-4 w-24 h-24 sm:w-32 sm:h-32 bg-gray-200 rounded-xl shadow-lg flex flex-col items-center justify-end overflow-hidden border-2 border-white cursor-pointer`}
              title="Click to swap videos"
            >
              {/* Small video (always rendered) */}
              <VideoBoxSmall rerender={rerender} stream={viewingSelf?localStreamRef.current  : allStreamsRef.current[remoteUserIds[0]]}/>
              <span className="bg-black bg-opacity-60 text-white text-xs px-2 py-1 w-full text-center absolute bottom-0 left-0">{UserInforDetails ? UserInforDetails[viewingSelf?mysocketId:remoteUserIds[0]]?.name : `User ${mysocketId.substring(0, 5)}`} </span> 
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
            <button disabled={isloadingmsgSend} onClick={()=>{handleMsgSend()}} className="bg-gray-900 text-white px-4 py-2 rounded-full">{isloadingmsgSend?"Sending..":"Send"}</button>
          </div>
        </div>
      </main>

      {/* Participants Sidebar */}
      {showSidePanels && remoteUserIds.slice(1).length > 0 ? (
        <aside className="flex flex-col gap-3 overflow-y-auto max-h-[80vh] w-28 sm:w-36 p-2 bg-white rounded-xl shadow-md">
          {/* Remote videos */}
          {remoteUserIds.slice(1).map(id => (
            <div
              key={id}
              onClick={() => {
                const temp = [...remoteUserIds];
                const targetIdx = temp.indexOf(id);
                const prevOntarget = temp[0];
                temp[0] = id; 
                temp[targetIdx] = prevOntarget;
                setRemoteUserIds(temp);
                setRerender(!rerender);
                setviewingSelf(true);
                setviewingOnbigscreen(id)
              
              }}
              className="relative rounded-lg border-2 border-gray-300 bg-gray-100 cursor-pointer"
              style={{ aspectRatio: '1/1' }}
            >
              <VideoBoxSmall stream={allStreamsRef.current[id]} rerender={rerender} />
              <span className="absolute bottom-1 left-1 right-1 bg-black bg-opacity-60 text-white text-xs px-2 py-0.5 rounded text-center truncate">
                {UserInforDetails ? UserInforDetails[id]?.name : `User ${id.substring(0, 5)}`}
              </span>
            </div>
          ))}
        </aside>
      ) : null}

      {/* Seminar Details Panel */}
      {showSidePanels && (
        <aside className="w-full   lg:w-[40rem] flex flex-col space-y-4 lg:space-y-6 p-2 sm:p-4 lg:p-6">
          {/* Seminar Details  section */}
          <div className="bg-gray-900 p-10 h-full  rounded-2xl  text-white shadow mb-6">
            <h3 className="font-semibold mb-4 text-lg">Seminar Details </h3>
            {seminarDetails ? (
              <ul className="space-y-3 text-base">
                <li className="flex flex-wrap gap-x-6 gap-y-1">
                  <span className="font-semibold">Meeting Topic:</span>
                  <span>{seminarDetails.meeting_topic || '-'}</span>
                </li>
                <li className="flex flex-wrap gap-x-6 gap-y-1">
                  <span className="font-semibold">Starting Time:</span>
                  <span>{seminarDetails.Scheduled_time ? new Date(seminarDetails.Scheduled_time).toLocaleString() : '-'}</span>
                </li>
                <li className="flex flex-wrap gap-x-6 gap-y-1">
                  <span className="font-semibold">Duration:</span>
                  <span>{seminarDetails.duration ? `${seminarDetails.duration} min` : '-'}</span>
                </li>
                <li className="flex flex-wrap gap-x-6 gap-y-1">
                  <span className="font-semibold">Max Participants:</span>
                  <span>{seminarDetails.max_Participants || '-'}</span>
                  <span className="font-semibold ml-6">Registered:</span>
                  <span>{seminarDetails.registed_participants ?? '-'}</span>
                </li>
                {seminarDetails.topics && seminarDetails.topics.length > 0 && (
                  <li className="flex flex-wrap gap-x-6 gap-y-1">
                    <span className="font-semibold">Topics:</span>
                    <span>{seminarDetails.topics.join(', ')}</span>
                  </li>
                )}
                {seminarDetails.description && (
                  <li className="flex flex-col gap-y-1">
                    <span className="font-semibold">Description:</span>
                    <span>{seminarDetails.description}</span>
                  </li>
                )}
                {seminarDetails.speaker && (
                  <li className="flex flex-col gap-y-1">
                    <span className="font-semibold">Speaker:</span>
                    <span>{seminarDetails.speaker}</span>
                  </li>
                )}
              </ul>
            ) : (
              <div className="text-gray-300">Loading seminar details...</div>
            )}
          </div>
        </aside>
      )}

{showToast&&<Toast
      type={toastType}
      message={toastMessage}
    />}
      
    </div>
  );
};



export default Seminar_room;
