'use client';
// import { useEffect } from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import StudyProgrammes from '@/app/components/StudyProgrammes';
import FavoriteProgrammes from '@/app/components/FavoriteProgrammes';
import JourneyProgress from '@/app/components/JourneyProgress';
import Documents from '@/app/components/Documents';
import ApplicationLinks from '@/app/components/ApplicationLinks';
import OnlineSeminars from '@/app/components/OnlineSeminars';
import ScheduledMeetings from '@/app/components/ScheduledMeetings';
import PastInquiries from '@/app/components/PastInquiries';
import Profile from '@/app/components/Profile';
import { call_logout } from '@/app/(utils)/call_logout/route';
import { call_fetch_logged_id_info } from '../(utils)/call_fetch_logged_id_info/route';
import ExpertsProfilesCardsList from '@/app/components/ExpertsProfilesCardsList';


export default function HomePage() {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState('Journey Progress');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showExperts, setShowExperts] = useState(false);
  const [details, setDetails] = useState({
      email: '',
      full_name: '',
      img: ''
    });
  // Remove or modify the authentication check for now
  // useEffect(() => {
  //   const isAuthenticated = false; // This was causing the redirect
  //   if (!isAuthenticated) {
  //     router.push('/');
  //   }
  // }, [router]);

  const menuItems = [
    { name: 'Find Study Programmes', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    )},
    { name: 'Favorite Programmes', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )},
    { name: 'Journey Progress', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17l6-6-6-6m10 16l-4-4 4-4m-16 4l4-4-4-4" />
      </svg>
    )},
    { name: 'Documents', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )},
    { name: 'Application Links', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    )},
    { name: 'Past Inquiries', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )},
    { name: 'Scheduled Meetings', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )},
    { name: 'Online Seminars', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    )},
   
  ];
   useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await call_fetch_logged_id_info()
          setDetails(response)
         
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }
   ,[])
  return (
    <div className="min-h-screen bg-gray-100 ">
      {/* Top Navigation Bar */}
      <nav className="bg-gradient-to-r from-black via-[#000033] to-black shadow-lg fixed w-full z-20 border-b border-white/10">
        <div className="px-4">
          <div className="flex justify-between h-16 items-center">
            {/* Left Section */}
            <div className="flex items-center space-x-6">
              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden text-white/90 p-2 rounded-md hover:bg-white/10 transition-all duration-300 hover:text-white"
              >
                <svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  {isSidebarOpen ? (
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M15 19l-7-7 7-7"
                    />
                  ) : (
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7"
                    />
                  )}
                </svg>
              </button>

              {/* Desktop Collapse Button */}
              <button 
                onClick={() => setIsDesktopSidebarCollapsed(!isDesktopSidebarCollapsed)}
                className="hidden lg:flex text-white/90 p-2 rounded-md hover:bg-white/10 transition-all duration-300 hover:text-white items-center space-x-2"
              >
                <svg 
                  className={`w-6 h-6 transition-transform duration-300 ${isDesktopSidebarCollapsed ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <div className="flex items-center space-x-3 pl-2">
                <div className="bg-white/10 p-1.5 rounded-lg backdrop-blur-sm">
                  <span className="text-2xl font-bold text-white">
                    <span className="text-blue-400">I</span>SHC
                  </span>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => {
                  setShowExperts(true);
                  setActiveItem('');   // Clear active menu item when showing profile
                }} 
                className="flex items-center space-x-2 text-white/90 hover:text-white px-4 py-2 rounded-lg hover:bg-white/5 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-7a4 4 0 11-8 0 4 4 0 018 0zm6 13v-2a4 4 0 00-3-3.87M9 20v-2a4 4 0 013-3.87" />
                </svg>
                <span>Experts</span>
              </button>
              <button 
                onClick={() => {
                  setShowExperts(false);
                  setShowProfile(true);
                  setActiveItem('');  // Clear active menu item when showing profile
                }} 
                className="flex items-center space-x-2 text-white/90 hover:text-white px-4 py-2 rounded-lg hover:bg-white/5 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Profile</span>
              </button>
              <button 
                onClick={() => {call_logout(),router.push('/')}}
                className="flex items-center space-x-2 text-white/90 hover:text-white px-4 py-2 rounded-lg hover:bg-white/5 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Container with Sidebar and Content */}
      <div className="flex pt-16">
        {/* Sidebar Overlay for Mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar - Fixed height and width for desktop */}
        <aside className={`fixed lg:fixed flex flex-col bg-gradient-to-b from-[#000033] to-[#001a4d] shadow-xl text-white
          transition-all duration-300 transform
          h-[calc(100vh-4rem)] top-16
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0
          ${isDesktopSidebarCollapsed ? 'lg:w-20' : 'lg:w-64'} w-64
          z-40`}
        >
          {/* Logo */}
          <div className="h-[100px] p-6 border-b border-white/10 shrink-0">
            <div className="flex items-center space-x-3">
              <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm shrink-0">
                <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className={`overflow-hidden transition-all duration-300 ${isDesktopSidebarCollapsed ? 'lg:hidden' : ''}`}>
                <span className="text-2xl font-bold tracking-wider whitespace-nowrap">
                  <span className="text-blue-400">I</span>SHC
                </span>
                <p className="text-xs text-gray-300 mt-1.5 leading-tight">
                  <span className="block">International</span>
                  <span className="block text-nowrap">Students Help Center</span>
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-1.5">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  setActiveItem(item.name);
                  setShowProfile(false);
                  setShowExperts(false);
                }}
                className={`flex items-center w-full p-2.5 rounded-xl transition-all duration-300
                  ${activeItem === item.name
                    ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm translate-x-2'
                    : 'text-gray-300 hover:bg-white/10 hover:translate-x-2'
                  }`}
              >
                <div className={`${
                  activeItem === item.name
                    ? 'bg-white/20 p-1.5 rounded-lg'
                    : 'p-1.5'
                  } shrink-0`}>
                  {item.icon}
                </div>
                <span className={`ml-3 text-sm whitespace-nowrap overflow-hidden transition-all duration-300 ${isDesktopSidebarCollapsed ? 'lg:hidden' : ''}`}>
                  {item.name}
                </span>
              </button>
            ))}
          </nav>

          {/* Bottom Section */}
          <div className="p-6 border-t border-white/10 shrink-0">
            <div 
              onClick={() => {
                setShowExperts(false);
                setShowProfile(true);
                setActiveItem('');  // Clear active menu item when showing profile
              }}
              className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                {details.img!=""?
                <img
                    src={details.img}
                    // alt={profile.name}
                   className="w-full h-full rounded-full object-cover border-4 border-white shadow "
                  />
                :<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>}
              </div>
              <div className={`overflow-hidden transition-all duration-300 ${isDesktopSidebarCollapsed ? 'lg:hidden' : ''}`}>
                <h3 className="text-xs font-semibold ">{details.full_name}</h3>
                <p className="text-xs text-gray-300 whitespace-nowrap">Student</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 
          ${isDesktopSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}
          ml-0
          w-full`}
        >
          {showExperts? <ExpertsProfilesCardsList/>: showProfile ? (
            <Profile details={details}/>
          ) : (
            <>
              {activeItem === 'Find Study Programmes' && <StudyProgrammes />}
              {activeItem === 'Favorite Programmes' && <FavoriteProgrammes />}
              {activeItem === 'Journey Progress' && <JourneyProgress />}
              {activeItem === 'Documents' && <Documents />}
              {activeItem === 'Application Links' && <ApplicationLinks />}
              {activeItem === 'Online Seminars' && <OnlineSeminars />}
              {activeItem === 'Scheduled Meetings' && <ScheduledMeetings />}
              {activeItem === 'Past Inquiries' && <PastInquiries />}
              
            </>
          )}
        </main>
      </div>
    </div>
  );
}
