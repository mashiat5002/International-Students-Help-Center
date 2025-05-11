"use client"
import React from 'react';
import { useEffect, useRef } from 'react';
import io from 'socket.io-client'; // Default import of io
import { Socket } from 'socket.io-client'; // Importing the Socket class
import { startMedia } from '../(utils)/start_media/route';


const participants = [
  { name: 'Oliver Noah', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Niki Andini', img: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { name: 'Taylor Asmara', img: 'https://randomuser.me/api/portraits/women/65.jpg' },
  { name: '...', img: '', extra: 15 },
];

const requests = [
  { name: 'Rijal Ginanjjar' },
  { name: 'Rex Widodo' },
  { name: 'Lina Punk' },
];

const tasks = [
  'Opening',
  'Performance Evaluation of the Party',
  'Planning Party Programs and Activities',
  'Internal Party Consolidation',
  'Party Financial Plan',
];

const chat = [
  { name: 'Daffa Senior', message: 'Mas rijal nandi bay?', avatar: 'https://randomuser.me/api/portraits/men/12.jpg' },
  { name: 'Bayu Atos', message: 'Feelingku sek menang', avatar: 'https://randomuser.me/api/portraits/men/13.jpg' },
];

const documents = [
  { title: 'Meeting Minutes.pdf', reason: 'Weekly Review', url: '#' },
  { title: 'Financial Report.xlsx', reason: 'Budget Analysis', url: '#' },
  { title: 'Party Program.docx', reason: 'Event Planning', url: '#' },
];

const selfView = {
  name: 'You',
  img: 'https://randomuser.me/api/portraits/men/99.jpg',
};

const chatMessages = [
  { name: 'Oliver Noah', message: 'Hello everyone!' },
  { name: 'You', message: 'Hi Oliver!' },
];



const VideoMeeting = () => {

    const socketRef = useRef<typeof Socket | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
    useEffect(() => {
    const isOfferer = window.location.hash === '#offerer';
    const socket = io({ path: '/api/socket' });
    
    socketRef.current = socket;
    
    startMedia({
      videoRef,
      peerConnectionRef,
      isOfferer,
      socket,
    });
    
    return () => {
      socket.disconnect();
    };
    }, []);
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
            <span className="ml-2 text-gray-500 text-xs sm:text-sm">19 Participants</span>
          </div>
          <button className="bg-red-100 text-red-600 px-3 sm:px-4 py-2 rounded-lg font-semibold text-xs sm:text-base">Leave Meeting</button>
        </div>

        {/* Video Area */}
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6">
          {/* Main Speaker */}
          <div className="flex-1 bg-white rounded-2xl p-2 sm:p-4 lg:p-6 relative shadow-md min-w-0">
        <div className="w-full h-80 sm:h-[26rem] object-cover rounded-xl">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover rounded-xl border border-gray-300"
          />
        </div>
            <div className="absolute top-4 sm:top-8 left-4 sm:left-10 flex items-center space-x-2 bg-gray-800 bg-opacity-60 px-3 py-1 rounded-full">
              <span className="text-white font-medium text-xs sm:text-base">Avril Levronka</span>
            </div>
            <div className="absolute top-4 sm:top-8 right-4 sm:right-10 flex items-center space-x-2">
              <span className="bg-white text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">Recording</span>
              <button className="bg-gray-200 p-2 rounded-full">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><circle cx="12" cy="12" r="8" /></svg>
              </button>
            </div>
            {/* Controls */}
            <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-4">
              <button className="bg-white p-2 sm:p-3 rounded-full shadow"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14" /><rect x="3" y="6" width="12" height="12" rx="2" /></svg></button>
              <button className="bg-white p-2 sm:p-3 rounded-full shadow"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 18v-6m0 0V6m0 6h6m-6 0H6" /></svg></button>
              <button className="bg-red-600 text-white p-2 sm:p-3 rounded-full shadow"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" /></svg></button>
            </div>
            {/* Self View Window */}
            <div className="absolute bottom-4 right-4 w-24 h-24 sm:w-32 sm:h-32 bg-gray-200 rounded-xl shadow-lg flex flex-col items-center justify-end overflow-hidden border-2 border-white">
            <video id="remoteVideo" autoPlay playsInline style={{ width: '300px', border: '1px solid #ccc', marginLeft: '10px' }} />
            <span className="bg-black bg-opacity-60 text-white text-xs px-2 py-1 w-full text-center absolute bottom-0 left-0">{selfView.name}</span>
            </div>
          </div>
          {/* Participants */}
          {/* ... existing code ... */}
        </div>
        {/* Chat UI below video area */}
        <div className="w-full max-w-2xl mx-auto mt-4 bg-white rounded-2xl shadow p-4 flex flex-col space-y-2">
          <div className="flex-1  overflow-y-auto space-y-2">
            {chatMessages.map((msg, i) => (
              <div key={i} className="flex items-center space-x-2">
                <span className={`font-semibold text-xs ${msg.name === 'You' ? 'text-blue-600' : 'text-gray-800'}`}>{msg.name}:</span>
                <span className="text-sm text-gray-700">{msg.message}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-2 pt-2 border-t">
            <input type="text" placeholder="Type a message..." className="flex-1 border rounded-full px-4 py-2 text-sm" />
            <button className="bg-gray-900 text-white px-4 py-2 rounded-full">Send</button>
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
    </div>
  );
};

export default VideoMeeting; 