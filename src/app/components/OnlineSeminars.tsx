'use client';

import React, { useState, useEffect } from 'react';
import { call_fetch_all_experts_seminars } from '../(utils)/call_fetch_all_experts_seminars/call_fetch_all_experts_seminars';
import { IoIosArrowBack } from 'react-icons/io';
import Seminar_Registration_Modal from './Seminar_Registration_Modal';
import LoadingSpinner from './common/LoadingSpinner';
import Toast from './common/Toast';
import timeFormatConverter from '../(utils)/time_format_converter/time_format_converter';

// New seminar details type
type seminarDetails = {
  _id: string;
  speaker: string;
  expert_id: string;
  description: string;
  meeting_topic: string;
  Creation_time: string;
  Scheduled_time: string;
  max_Participants: string;
  topics: string[];
  registed_participants: string;
  duration: string;
  status: string;
  isregistered: boolean;

   expert_institution: string;
   expert_email: string;
  expert_profession: string;
  expert_about: string;
  expert_img: string;
  expert_full_name: string;
};

const SeminarCard = React.memo(({
  seminar,
  isSelected,
  onClick,
 
}: {
  seminar: seminarDetails;
  isSelected: boolean;
  onClick: () => void;
  
}) => {

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-green-100 text-green-800';
      case 'ended':
        return 'bg-orange-100 text-orange-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'ongoing':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl shadow-lg overflow-hidden border relative
        transition-all duration-300 cursor-pointer 
        ${isSelected
          ? 'border-blue-500 shadow-blue-100 scale-[1.02]'
          : 'border-gray-100 hover:border-blue-300'}`}
    >
      <ul className="gap-4  " >
        <li className="flex w-full flex-col md:flex-row md:items-center justify-between bg-[#eef2f2c8] rounded-xl p-3 sm:p-4 border border-white/10">
          <div className="flex-1 space-y-1 sm:space-y-2">
            <div className="text-base sm:text-lg font-semibold text-blue-900 mb font-semibold-1">
              Topic: {seminar.meeting_topic}
            </div>
            <div className="text-blue-900/80 font-semibold text-xs sm:text-sm mb-1">
              Duration: {seminar.duration} Minutes
            </div>

            <div className="text-blue-900/60 font-semibold text-[10px] sm:text-xs mb-1">
              Scheduled on: {timeFormatConverter(seminar.Scheduled_time)}
            </div>
            <div className="text-blue-900/60 font-semibold text-[10px] sm:text-xs mb-1">
              Creation time: {timeFormatConverter(seminar.Creation_time)}
            </div>
          </div>
        </li>
      </ul>
      <div className={`right-4 top-4 p-2 absolute z-50 rounded-full text-xs  ${getStatusColor(seminar.status)}`}>
            {seminar.status}
          </div>
    </div>
  );
});

const SeminarDetails = ({
  seminar,
  onRegister,
   toggleHeading_Details,
  settoggleHeading_Details
}: {
  seminar: seminarDetails;
  onRegister: (seminar: seminarDetails) => void;
  toggleHeading_Details:boolean;
  settoggleHeading_Details: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const maxParticipants = parseInt(seminar.max_Participants);
  const registeredParticipants = parseInt(seminar.registed_participants);
  const availableSlots = maxParticipants - registeredParticipants;
  const progressPercentage = (registeredParticipants / maxParticipants) * 100;
 
  return (
    <div className="flex flex-col justify-between  p-4    h-[calc(100vh-6rem)]  overflow-x-hidden overflow-scroll backdrop-blur-md rounded-xl shadow-lg ">
      
      {/* Expert Card */}
      <div className="bg-blue-50/50 p-3 sm:p-4 rounded-xl mb-2">
        <h4 className="text-base sm:text-lg font-semibold text-blue-900 mb-2 sm:mb-3">Speaker:</h4>
        <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/80 rounded-lg shadow p-4">
          <img
            src={seminar.expert_img}
            alt={seminar.expert_full_name}
            className="w-20 h-20 rounded-full object-cover border-2 border-blue-200 shadow"
          />
          <div className="flex-1 flex flex-col items-center sm:items-start gap-1">
            <span className="text-blue-900 text-lg font-bold">{seminar.expert_full_name}</span>
            <span className="text-blue-700 text-sm font-semibold">{seminar.expert_profession}</span>
            <span className="text-blue-800 text-xs font-medium">{seminar.expert_institution}</span>
            <span className="text-gray-600 text-xs">Email: {seminar.expert_email}</span>
            <span className="text-gray-700 text-xs italic mt-1 text-center sm:text-left">{seminar.expert_about}</span>
          </div>
        </div>
      </div>
      <div className="bg-blue-50/50 p-3 sm:p-4 rounded-xl">
        <h4 className="text-base sm:text-lg font-semibold text-blue-900 mb-2 sm:mb-3">Seminar Topic</h4>
        <h4 className="font-medium text-blue-900 text-sm sm:text-base">{seminar.meeting_topic}</h4>

      </div>
      <div className="bg-blue-50/50 p-3 sm:p-4 rounded-xl">
        <h4 className="text-base sm:text-lg font-semibold text-blue-900 mb-2 sm:mb-3">Seminar Description</h4>
        <h4 className="font-medium text-blue-900 text-sm sm:text-base">{seminar.description}</h4>

      </div>

        {/* Topics */}
    <div className="bg-blue-50/50 p-4 rounded-xl">
      <h4 className="text-lg font-semibold text-blue-900 mb-3">Topics Covered</h4>
      {seminar.topics && seminar.topics.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {seminar.topics.map((topic, index) => (
            <span 
              key={index}
              className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
            >
              {topic}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 italic">Not Available</p>
      )}
    </div>



      <div className={` bg-blue-50/50 p-3 sm:p-4 rounded-xl`}>
        <h4 className="text-base sm:text-lg font-semibold text-blue-900 mb-2 sm:mb-3">Registration</h4>
        <div className="space-y-3 sm:space-y-4">
          <div>
            <div className="flex justify-between text-xs sm:text-sm text-blue-900/80 mb-1">
              <span>Available Slots: {availableSlots}</span>
              <span>{Math.round(progressPercentage)}% Full</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
          <button
            onClick={() => onRegister(seminar)}
            disabled={availableSlots <= 0 || seminar.isregistered || seminar.status=="cancelled" || seminar.status=="ended" }
            className={`${seminar.status=="ended" || seminar.status=="cancelled"?"bg-red-400 cursor-default":seminar.isregistered?"bg-green-400 ":seminar.max_Participants<=seminar.registed_participants?"bg-red-400":""} w-full px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r text-blue-900 font-semibold rounded-2xl shadow-md transition duration-300 ease-in-out text-sm sm:text-base
              ${availableSlots > 0 && !seminar.isregistered && seminar.status!="ended"
                ? ' hover:bg-blue-500 hover:text-white from-[#1111] to-[333446]'
                : 'bg-green-400 text-blue-600 cursor-default '}`}
          > 
            {seminar.status=="cancelled"?"cancelled":seminar.status=="ended"?"Ended":seminar.isregistered?"You Are Registered":availableSlots > 0 ? 'Register Now' : 'Fully Booked'}
          </button>
        </div>
      </div>

      <div onClick={()=>settoggleHeading_Details(!toggleHeading_Details)} className=' lg:hidden absolute right-5 top-5 h-8 w-8 ring-2  flex items-center justify-center ring-black cursor-pointer hover:ring-blue-500 rounded-xl'>
      <IoIosArrowBack color='black'/>
      </div>

    </div>
  );
};







const OnlineSeminars = () => {
  const [seminars, setSeminars] = useState<seminarDetails[]>([]);
  const [selectedSeminar, setSelectedSeminar] = useState<seminarDetails | null>(null);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [loading, setloading] = useState(false);
  const [toggleHeading_Details, settoggleHeading_Details] = useState(true);
  const [registrationSeminar, setRegistrationSeminar] = useState<seminarDetails | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [Filter, setFilter] = useState('all');
  const [rerender, setrerender] = useState(false);
  const [clickedIdx, setclickedIdx] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setloading(true);
      const res = await call_fetch_all_experts_seminars();
      console.log("Fetched Seminars: ", res.data);
      console.log(res)
      setloading(false);
      setSeminars(res.data.reverse());
      setSelectedSeminar(res.data[clickedIdx])
      
     
    };
    fetchData();
  }, [rerender]);

  const handleRegister = (seminar: seminarDetails) => {
    setRegistrationSeminar(seminar);
    setShowRegistrationModal(true);
  };



  const filteredSeminars = seminars.filter(seminar => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const meetingTopic = (seminar.meeting_topic ?? '').toLowerCase();
    const speaker = (seminar.speaker ?? '').toLowerCase();
    const description = (seminar.description ?? '').toLowerCase();
    const status= seminar.status;
    const topicsMatch = (seminar.topics ?? []).some(topic =>
      (topic ?? '').toLowerCase().includes(lowerCaseSearchTerm)
    );
     

    return (

      (status==Filter || Filter=="all") &&
      (meetingTopic.includes(lowerCaseSearchTerm) ||
      speaker.includes(lowerCaseSearchTerm) ||
      description.includes(lowerCaseSearchTerm) ||
      topicsMatch)
    );
  });

  return (
    // main parent container
    <div className="w-full h-full overflow-hidden md:h-[calc(100vh-4rem)]">
      <div className="w-full h-[calc(100vh-4rem)] animate-fadeIn grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 p-3 sm:p-6">
        {/* Seminars List */}
        <div className={`bg-white/20 ${toggleHeading_Details?"":"hidden lg:block "} backdrop-blur-md  rounded-xl shadow-lg overflow-hidden`}>
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b bg-white/50 backdrop-blur-sm flex flex-col sm:flex-row justify-between items-center gap-3">
            <h2 className="text-lg sm:text-xl font-bold text-blue-900">Online Seminars</h2>
            <div className='h-20  w-fit flex flex-col justify-between'> 
            <div className="flex gap-2">
                {(['all', 'upcoming','ongoing', 'ended', 'cancelled'] as const).map((type) => (
                  <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors
                    ${Filter===type
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
                <input
                  type="text"
                  placeholder="Search seminars..."
                  className="w-full sm:w-auto px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
          </div>
          <div className="p-3 sm:p-4  h-[calc(100%-3.5rem)]  overflow-y-auto custom-scrollbar">
            <div className="space-y-3 sm:space-y-4  mb-24">
              {loading?<LoadingSpinner/>:filteredSeminars.length === 0 ? (
                <div className="text-center text-gray-500 text-sm sm:text-base">No seminars found.</div>
              ) : filteredSeminars.map((seminar:seminarDetails,idx) => (
                <SeminarCard
                  key={seminar._id}
                  seminar={seminar}
                  isSelected={selectedSeminar?._id === seminar._id}
               
                 
                  onClick={() => {setclickedIdx(idx),setSelectedSeminar(seminar),settoggleHeading_Details(!toggleHeading_Details)}}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Seminar Details */}
        <div className="h-full">
          {selectedSeminar ? (
            <div className={`h-full ${!toggleHeading_Details?"":"hidden lg:block"}  custom-scrollbar pl-2`}  >
              <SeminarDetails
                seminar={selectedSeminar}
                onRegister={handleRegister}
                 settoggleHeading_Details={settoggleHeading_Details}
                  toggleHeading_Details={toggleHeading_Details}
              />
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500 text-sm sm:text-base">
              <p>Select a seminar to view details</p>
            </div>
          )}
        </div>
      </div>

      {/* Registration Modal */}
      {showRegistrationModal && registrationSeminar && (
        <Seminar_Registration_Modal
          setrerender={setrerender}
          rerender={rerender}
          seminar={registrationSeminar}
          onClose={() => setShowRegistrationModal(false)}
        />
      )}

      {/* Toast Notification */}
      {showToast && (
        <Toast
          type="success"
          message="Successfully registered for the seminar!"
        />
      )}
    </div>
  );
};

export default OnlineSeminars;
