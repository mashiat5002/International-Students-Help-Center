'use client';

import React, { useState, useEffect } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { FaVideo } from 'react-icons/fa';
import LoadingSpinner from './common/LoadingSpinner';
import Toast from './common/Toast';
import timeFormatConverter from '../(utils)/time_format_converter/time_format_converter';
import { call_fetch_meeting_requests_for_student } from '../(utils)/call_fetch_meeting_requests_for_student/call_fetch_meeting_requests_for_student';
import { encrypt } from '../(utils)/jwt_encrypt_decrypt';
import { call_fetch_logged_id_info } from '../(utils)/call_fetch_logged_id_info/call_fetch_logged_id_info';

// Meeting details type
type MeetingDetails = {
  _id: string;
  expert_id: string;
  journey_id: string;
  Institution: string;
  fieldOfStudy: string;
  ApplyingOn: string;
  expert_email: string;
  expert_profession: string;
  expert_about: string;
  expert_img: string;
  expert_full_name: string;
  meeting_topic: string;
  student_email: string;
  student_full_name: string;
  Request_time: { type: Date };
  Scheduled_time: string;
  status: string;
};

// Meeting card for list
const MeetingCard = React.memo(({
  meeting,
  isSelected,
  onClick,
}: {
  meeting: MeetingDetails;
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl shadow-lg overflow-hidden border relative transition-all duration-300 cursor-pointer ${isSelected ? 'border-blue-500 shadow-blue-100 scale-[1.02]' : 'border-gray-100 hover:border-blue-300'}`}
    >
      <ul className="gap-4">
        <li className="flex w-full flex-col md:flex-row md:items-center justify-between bg-[#eef2f2c8] rounded-xl p-3 sm:p-4 border border-white/10">
          <div className="flex-1 space-y-1 sm:space-y-2">
            <div className="text-base sm:text-lg font-semibold text-blue-900 mb font-semibold-1">
              Topic: {meeting.meeting_topic}
            </div>
            <div className="text-blue-900/80 font-semibold text-xs sm:text-sm mb-1">
              Institution: {meeting.Institution}
            </div>
            <div className="text-blue-900/80 font-semibold text-xs sm:text-sm mb-1">
              Field: {meeting.fieldOfStudy}
            </div>
            <div className="text-blue-900/60 font-semibold text-[10px] sm:text-xs mb-1">
              Scheduled on: {timeFormatConverter(meeting.Scheduled_time)}
            </div>
            <div className="text-blue-900/60 font-semibold text-[10px] sm:text-xs mb-1">
              Expert: {meeting.expert_full_name} ({meeting.expert_full_name})
            </div>
            <div className="text-blue-900/60 font-semibold text-[10px] sm:text-xs mb-1">
              Status: {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
});

// Meeting details panel
const MeetingDetailsPanel = ({
  meeting,
  toggleHeading_Details,
  settoggleHeading_Details,
}: {
  meeting: MeetingDetails;
  toggleHeading_Details: boolean;
  settoggleHeading_Details: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [param,setPeram] = useState<string>("");
  useEffect(() => {
    const getEncryptedparam=async()=>{
      const loggedInfo= await call_fetch_logged_id_info()
      console.log("meeting._id:", meeting._id)
      const encryptedParam = await encrypt({meeting_id: meeting._id, id: loggedInfo.id ,full_name:loggedInfo.full_name});
      
      setPeram(encryptedParam);
    }
    getEncryptedparam()
  
  }, [meeting]);
  return (
    <div className="flex flex-col justify-between p-4 h-[calc(100vh-6rem)] overflow-x-hidden overflow-scroll backdrop-blur-md rounded-xl shadow-lg relative">
      
      <div className="bg-blue-50/50 p-3 sm:p-4 rounded-xl mb-2">
        <h4 className="text-base sm:text-lg font-semibold text-blue-900 mb-2 sm:mb-3">Meeting Withhh:</h4>
        <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/80 rounded-lg shadow p-4">
          <img
            src={meeting.expert_img}
            alt={meeting.expert_full_name}
            className="w-20 h-20 rounded-full object-cover border-2 border-blue-200 shadow"
          />
          <div className="flex-1 flex flex-col items-center sm:items-start gap-1">
            <span className="text-blue-900 text-lg font-bold">{meeting.expert_full_name}</span>
            <span className="text-blue-700 text-sm font-semibold">{meeting.expert_profession}</span>
            <span className="text-blue-800 text-xs font-medium">{meeting.Institution}</span>
            <span className="text-gray-600 text-xs">Email: {meeting.expert_email}</span>
            <span className="text-gray-700 text-xs italic mt-1 text-center sm:text-left">{meeting.expert_about}</span>
          </div>
        </div>
      </div>

      

      <div className="bg-blue-50/50 p-3 sm:p-4 rounded-xl mb-2">
        <h4 className="text-base sm:text-lg font-semibold text-blue-900 mb-2 sm:mb-3">Meeting Topic</h4>
        <p className="font-medium text-blue-900 text-sm sm:text-base">{meeting.meeting_topic}</p>
      </div>
      <div className="bg-blue-50/50 p-3 sm:p-4 rounded-xl mb-2">
        <h4 className="text-base sm:text-lg font-semibold text-blue-900 mb-2 sm:mb-3">Institution</h4>
        <p className="font-medium text-blue-900 text-sm sm:text-base">{meeting.Institution}</p>
      </div>
      <div className="bg-blue-50/50 p-3 sm:p-4 rounded-xl mb-2">
        <h4 className="text-base sm:text-lg font-semibold text-blue-900 mb-2 sm:mb-3">Field of Study</h4>
        <p className="font-medium text-blue-900 text-sm sm:text-base">{meeting.fieldOfStudy}</p>
      </div>
      <div className="bg-blue-50/50 p-3 sm:p-4 rounded-xl mb-2">
        <h4 className="text-base sm:text-lg font-semibold text-blue-900 mb-2 sm:mb-3">Scheduled Time</h4>
        <p className="font-medium text-blue-900 text-sm sm:text-base">{meeting.Scheduled_time=="Not Scheduled"?"Not Scheduled":timeFormatConverter(meeting.Scheduled_time)}</p>
      </div>
      {meeting.status === 'ongoing' && (
      <div className="bg-blue-50/50 p-3 sm:p-4 rounded-xl mb-2">
          <div className="flex flex-col items-center justify-center">
            <h4 className="text-base sm:text-lg font-semibold text-blue-900 mb-2 sm:mb-3">Join Meeting</h4>
            <a
              href={`${process.env.NEXT_PUBLIC_Base_Url}/homepage/meeting/${param}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors text-lg font-semibold"
            >
              <FaVideo className="text-2xl" />
              <span>Join Now</span>
            </a>
          </div>
      </div>
      )}
      <div onClick={() => settoggleHeading_Details(!toggleHeading_Details)} className='lg:hidden absolute right-5 top-5 h-8 w-8 ring-2 flex items-center justify-center ring-black cursor-pointer hover:ring-blue-500 rounded-xl'>
        <IoIosArrowBack color='black' />
      </div>
    </div>
  );
};

const ScheduledMeetings = () => {
  const [Meetings, setMeetings] = useState<MeetingDetails[]>([]);
  const [selectedMeeting, setSelectedMeeting] = useState<MeetingDetails | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [loading, setloading] = useState(false);
  const [toggleHeading_Details, settoggleHeading_Details] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [Filter, setFilter] = useState('all');
  const [rerender, setrerender] = useState(false);
  const [clickedIdx, setclickedIdx] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setloading(true);
      const res = await call_fetch_meeting_requests_for_student();
      
      setloading(false);
      // Compute status for each meeting
      const now = new Date();
      const meetingsWithStatus = res.data.reverse().map((item: MeetingDetails) => {
        let status = '';
        if (item.Scheduled_time === 'Not Scheduled') {
          status = 'not scheduled';
        } else {
          const startTime = new Date(item.Scheduled_time);
          if (now < startTime) {
            status = 'upcoming';
          } else {
            status = 'ongoing';
          }
        }
        return { ...item, status };
      });
      setMeetings(meetingsWithStatus);
      setSelectedMeeting(meetingsWithStatus[clickedIdx]);
    };
    fetchData();
  }, [rerender]);

  // Filtering logic (adjust as needed)
  const filteredMeetings = Meetings.filter(meeting => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const meetingTopic = (meeting.meeting_topic ?? '').toLowerCase();
    const institution = (meeting.Institution ?? '').toLowerCase();
    const field = (meeting.fieldOfStudy ?? '').toLowerCase();
    const student = (meeting.student_full_name ?? '').toLowerCase();
    // Filter by status if not 'all'
    return (
      (Filter === 'all' || meeting.status === Filter) &&
      (meetingTopic.includes(lowerCaseSearchTerm) ||
        institution.includes(lowerCaseSearchTerm) ||
        field.includes(lowerCaseSearchTerm) ||
        student.includes(lowerCaseSearchTerm))
    );
  });

  return (
    <div className="w-full h-full overflow-hidden md:h-[calc(100vh-4rem)]">
      <div className="w-full h-[calc(100vh-4rem)] animate-fadeIn grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 p-3 sm:p-6">
        {/* Meetings List */}
        <div className={`bg-white/20 ${toggleHeading_Details ? '' : 'hidden lg:block '} backdrop-blur-md rounded-xl shadow-lg overflow-hidden`}>
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b bg-white/50 backdrop-blur-sm flex flex-col sm:flex-row justify-between items-center gap-3">
            <h2 className="text-lg sm:text-xl font-bold text-blue-900">Scheduled Meetings</h2>
            <div className='h-20 w-fit flex flex-col justify-between'>
              <div className="flex gap-2">
                {(['all', 'not scheduled', 'upcoming', 'ongoing'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilter(type)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${Filter === type ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {type=="not scheduled"?"Requested":type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
              <input
                type="text"
                placeholder="Search meetings..."
                className="w-full sm:w-auto px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="p-3 sm:p-4 h-[calc(100%-3.5rem)] overflow-y-auto custom-scrollbar">
            <div className="space-y-3 sm:space-y-4 mb-24">
              {loading ? <LoadingSpinner /> : filteredMeetings.length === 0 ? (
                <div className="text-center text-gray-500 text-sm sm:text-base">No Meetings found.</div>
              ) : filteredMeetings.map((meeting: MeetingDetails, idx) => (
                <MeetingCard
                  key={meeting._id}
                  meeting={meeting}
                  isSelected={selectedMeeting?._id === meeting._id}
                  onClick={() => {
                    setclickedIdx(idx);
                    setSelectedMeeting(meeting);
                    settoggleHeading_Details(!toggleHeading_Details);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Meeting Details */}
        <div className="h-full">
          {selectedMeeting ? (
            <div className={`h-full ${!toggleHeading_Details ? '' : 'hidden lg:block'} custom-scrollbar pl-2`}>
              <MeetingDetailsPanel
                meeting={selectedMeeting}
                settoggleHeading_Details={settoggleHeading_Details}
                toggleHeading_Details={toggleHeading_Details}
              />
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500 text-sm sm:text-base">
              <p>Select a meeting to view details</p>
            </div>
          )}
        </div>
      </div>
      {/* Toast Notification */}
      {showToast && (
        <Toast
          type="success"
          message="Successfully registered for the meeting!"
        />
      )}
    </div>
  );
};

export default ScheduledMeetings;

