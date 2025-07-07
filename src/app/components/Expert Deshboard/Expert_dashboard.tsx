'use client';
// import { useEffect } from 'react';

import OnlineSeminars from '@/app/components/OnlineSeminars';
import ScheduledMeetings from '@/app/components/ScheduledMeetings';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Profile from './Profile';
import { call_fetch_expert_logged_id_info } from '@/app/(utils)/call_fetch_expert_logged_id_info/call_fetch_expert_logged_id_info';
import SeminarSchedulingForm from './SeminarSchedulingForm';
import MeetingRequests from './MeetingRequests';
import UpcomingMeetings from './UpcomingMeetings';
import UpcomingSeminars from './UpcomingSeminars';
import HeroSection from './HeroSection';
import { call_logout_expert } from '@/app/(utils)/call_logout_expert/call_logout';
import { useRouter } from 'next/navigation';


const Expert_dashboard=()=> {
    const router = useRouter();
  const [activeItem, setActiveItem] = useState('Home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loading_profile_info, setLoadingProfileInfo] = useState(false);

    const [details, setDetails] = useState({});
  useEffect(() => {
        const fetchData = async () => {
          try {
            setLoadingProfileInfo(true);
            const response = await call_fetch_expert_logged_id_info()
            setDetails(response)
            setLoadingProfileInfo(false);
            console.log("response");
            console.log(response);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }
     ,[])



  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const Buttons = [
   
    { name: 'Home' },
    { name: 'Meeting Requests' },
    { name: 'Schedule Seminar' },
    { name: 'Upcoming Meetings' },
    { name: 'Upcoming Seminars' },
  ];

  const isActive = (item: string) => {
    return item==activeItem
  };




  return (
    <div className="min-h-screen bg-[#DFD0B8] ">
      {/* Top Navigation Bar */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 bg-[#948979] ${
        isScrolled ? 'bg-[#000033]' : 'bg-transparent'
      } `}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="text-3xl font-bold text-white hover:text-blue-400 transition-colors duration-300">
                <span className="text-blue-400">I</span>SHC
              </Link>
            </div>
            <div className="hidden sm:flex sm:space-x-8">
              {Buttons.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {setActiveItem(item.name); setShowProfile(false)}}
                  className={`text-white/90 hover:text-white relative group px-1 py-2 rounded-md transition-colors duration-300 ${
                    isActive(item.name) ? 'text-white' : ''
                  }`}
                >
                  {item.name}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 transform ${
                    isActive(item.name) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  } transition-transform duration-300`}></span>
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => {setShowProfile(true), setActiveItem('Profile')}}
                className={ ` ${isActive('Profile')?"text-[#FCD8CD] ":"text-white/90 hover:text-[#FCD8CD] "}  font-bold  transition-colors duration-300`}
              >
                Profile
              </button>
              <button 
                onClick={() => {call_logout_expert(), router.push('/')}}
                className="text-white px-6 py-2.5 rounded-lg font-medium
                  border-2 border-white bg-transparent
                  transform hover:scale-105 transition-all duration-300
                  hover:bg-white hover:text-[#000033]"
              >
                Sign out
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:text-blue-400 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          <div className={`sm:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} pb-4`}>
            <div className="flex flex-col space-y-1">
              {Buttons.map((link) => (
                <button
                  key={link.name}
                  className={`text-white/90 px-3 py-2 rounded-md transition-all duration-300 text-white 
                    ${activeItem === link.name ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-800 hover:bg-gray-700'}`}
                  onClick={() => {
                    setActiveItem(link.name);
                    setShowProfile(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {link.name}
                </button>
              ))}
              <button
                className={`text-white/90 px-3 py-2 rounded-md transition-all duration-300 text-white 
                  ${activeItem === 'Profile' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-800 hover:bg-gray-700'}`}
                onClick={() => {
                  setShowProfile(true);
                  setActiveItem('Profile');
                  setIsMobileMenuOpen(false);
                }}
              >
                Profile
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
        

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 
        
       
          ml-0
          w-full`}
        >
          { showProfile ? (
            <Profile details={details} setDetails={setDetails} loading_profile_info={loading_profile_info}/>
          ) : (
            <>
              {activeItem === 'Meeting Requests' && <MeetingRequests />}
              {activeItem === 'Schedule Seminar' && <SeminarSchedulingForm/>}
              {activeItem === 'Upcoming Meetings' && <UpcomingMeetings />}
              {activeItem === 'Upcoming Seminars' && <UpcomingSeminars />}
              {activeItem === 'Home' && <HeroSection setActiveItem={setActiveItem} />}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
 export default Expert_dashboard;