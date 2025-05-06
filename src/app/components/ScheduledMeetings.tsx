'use client';

import React, { useState, useEffect } from 'react';

interface ScheduledMeeting {
  id: string;
  title: string;
  institution: string;
  date: string;
  time: string;
  duration: string;
  type: 'seminar' | 'meeting';
  status: 'upcoming' | 'completed' | 'cancelled';
  joinUrl?: string;
  speaker?: {
    name: string;
    title: string;
    institution: string;
  };
  registrationDate: string;
  reminderSet: boolean;
}

const MeetingCard = React.memo(({ 
  meeting,
  isSelected,
  onClick,
  onSetReminder,
  onCancel
}: { 
  meeting: ScheduledMeeting;
  isSelected: boolean;
  onClick: () => void;
  onSetReminder: () => void;
  onCancel: () => void;
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const isUpcoming = meeting.status === 'upcoming';
  const meetingDate = new Date(meeting.date + ' ' + meeting.time);
  const today = new Date();
  const isToday = meetingDate.toDateString() === today.toDateString();

  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-xl shadow-lg overflow-hidden border 
        transition-all duration-300 cursor-pointer
        ${isSelected 
          ? 'border-blue-500 shadow-blue-100 scale-[1.02]' 
          : 'border-gray-100 hover:border-blue-300'}`}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold text-blue-900 mb-1">{meeting.title}</h3>
            <p className="text-sm text-gray-600">{meeting.institution}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(meeting.status)}`}>
            {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
          </span>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Date:</span> {meeting.date} 
            {isToday && <span className="ml-2 text-green-600 font-medium">Today!</span>}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Time:</span> {meeting.time}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Duration:</span> {meeting.duration}
          </p>
        </div>
        {isUpcoming && (
          <div className="mt-4 flex gap-2">
            {!meeting.reminderSet && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSetReminder();
                }}
                className="text-sm bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg 
                  hover:bg-blue-200 transition-colors flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                Set Reminder
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCancel();
              }}
              className="text-sm bg-red-100 text-red-700 px-3 py-1.5 rounded-lg 
                hover:bg-red-200 transition-colors flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

const MeetingDetails = React.memo(({ meeting }: { meeting: ScheduledMeeting }) => (
  <div className="space-y-6">
    {/* Header Section */}
    <div className="bg-blue-50/50 p-4 rounded-xl">
      <h2 className="text-xl font-bold text-blue-900 mb-2">{meeting.title}</h2>
      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Type:</span> {meeting.type.charAt(0).toUpperCase() + meeting.type.slice(1)}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Registration Date:</span> {meeting.registrationDate}
        </p>
      </div>
    </div>

    {/* Meeting Time */}
    <div className="bg-blue-50/50 p-4 rounded-xl">
      <h4 className="text-lg font-semibold text-blue-900 mb-3">Schedule</h4>
      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Date:</span> {meeting.date}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Time:</span> {meeting.time}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Duration:</span> {meeting.duration}
        </p>
      </div>
    </div>

    {/* Join Information */}
    {meeting.status === 'upcoming' && meeting.joinUrl && (
      <div className="bg-blue-50/50 p-4 rounded-xl">
        <h4 className="text-lg font-semibold text-blue-900 mb-3">Join Meeting</h4>
        <a 
          href={meeting.joinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Join Now
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </a>
      </div>
    )}

    {/* Speaker Information */}
    {meeting.speaker && (
      <div className="bg-blue-50/50 p-4 rounded-xl">
        <h4 className="text-lg font-semibold text-blue-900 mb-3">Speaker</h4>
        <div className="space-y-2">
          <p className="font-medium text-blue-900">{meeting.speaker.name}</p>
          <p className="text-sm text-gray-600">{meeting.speaker.title}</p>
          <p className="text-sm text-gray-600">{meeting.speaker.institution}</p>
        </div>
      </div>
    )}

    {/* Reminder Status */}
    <div className="bg-blue-50/50 p-4 rounded-xl">
      <h4 className="text-lg font-semibold text-blue-900 mb-3">Reminder Status</h4>
      <p className="text-sm text-gray-600">
        {meeting.reminderSet ? (
          <span className="flex items-center gap-2 text-green-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Reminder is set
          </span>
        ) : (
          <span className="flex items-center gap-2 text-gray-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            No reminder set
          </span>
        )}
      </p>
    </div>
  </div>
));

const ScheduledMeetings = () => {
  localStorage.removeItem('scheduledMeetings');

  const [meetings, setMeetings] = useState<ScheduledMeeting[]>([
    {
      id: '1',
      title: 'Personal Statement Writing Workshop',
      institution: 'Stanford University',
      date: '2024-03-25',
      time: '14:00 GMT',
      duration: '1 hour',
      type: 'seminar',
      status: 'upcoming',
      joinUrl: 'https://stanford.zoom.us/j/123456789',
      speaker: {
        name: 'Dr. Sarah Johnson',
        title: 'Senior Admissions Officer',
        institution: 'Stanford University'
      },
      registrationDate: '2024-02-15',
      reminderSet: true
    },
    {
      id: '2',
      title: 'Understanding University Requirements',
      institution: 'MIT',
      date: '2024-03-20',
      time: '18:00 GMT',
      duration: '1.5 hours',
      type: 'seminar',
      status: 'upcoming',
      joinUrl: 'https://mit.zoom.us/j/987654321',
      speaker: {
        name: 'Prof. Michael Chen',
        title: 'International Student Advisor',
        institution: 'MIT'
      },
      registrationDate: '2024-02-10',
      reminderSet: false
    },
    {
      id: '3',
      title: 'Student Visa Application Process',
      institution: 'Carnegie Mellon University',
      date: '2024-02-15',
      time: '15:00 GMT',
      duration: '2 hours',
      type: 'seminar',
      status: 'completed',
      joinUrl: 'https://cmu.zoom.us/j/456789123',
      speaker: {
        name: 'Dr. Alex Thompson',
        title: 'International Student Services Director',
        institution: 'CMU'
      },
      registrationDate: '2024-01-20',
      reminderSet: true
    },
    {
      id: '4',
      title: 'Admission Interview Preparation',
      institution: 'Harvard University',
      date: '2024-04-05',
      time: '16:00 GMT',
      duration: '45 minutes',
      type: 'meeting',
      status: 'upcoming',
      joinUrl: 'https://harvard.zoom.us/j/789123456',
      speaker: {
        name: 'Prof. Emily White',
        title: 'Graduate Admissions Counselor',
        institution: 'Harvard University'
      },
      registrationDate: '2024-02-28',
      reminderSet: false
    },
    {
      id: '5',
      title: 'Funding and Scholarship Guidance',
      institution: 'Caltech',
      date: '2024-03-10',
      time: '19:00 GMT',
      duration: '1.5 hours',
      type: 'seminar',
      status: 'cancelled',
      joinUrl: 'https://caltech.zoom.us/j/321654987',
      speaker: {
        name: 'Dr. Robert Brown',
        title: 'Financial Aid Advisor',
        institution: 'Caltech'
      },
      registrationDate: '2024-02-01',
      reminderSet: true
    }
  ]);
  const [selectedMeeting, setSelectedMeeting] = useState<ScheduledMeeting | null>(null);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('all');

  useEffect(() => {
    // Load meetings from localStorage
    const loadMeetings = () => {
      const storedMeetings = localStorage.getItem('scheduledMeetings');
      if (storedMeetings) {
        setMeetings(JSON.parse(storedMeetings));
      }
    };

    loadMeetings();
    // Set up event listener for storage changes
    window.addEventListener('storage', loadMeetings);
    return () => window.removeEventListener('storage', loadMeetings);
  }, []);

  const setReminder = (meetingId: string) => {
    const updatedMeetings = meetings.map(meeting =>
      meeting.id === meetingId ? { ...meeting, reminderSet: true } : meeting
    );
    setMeetings(updatedMeetings);
    localStorage.setItem('scheduledMeetings', JSON.stringify(updatedMeetings));
  };

  const cancelMeeting = (meetingId: string) => {
    const updatedMeetings = meetings.map(meeting =>
      meeting.id === meetingId ? { ...meeting, status: 'cancelled' } : meeting
    );
    setMeetings(updatedMeetings);
    localStorage.setItem('scheduledMeetings', JSON.stringify(updatedMeetings));
  };

  const filteredMeetings = meetings.filter(
    meeting => filter === 'all' || meeting.status === filter
  );

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="w-full h-[calc(100vh-4rem)] animate-fadeIn grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {/* Meetings List */}
        <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b bg-white/50 backdrop-blur-sm">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-blue-900">Scheduled Meetings</h2>
              <div className="flex gap-2">
                {(['all', 'upcoming', 'completed', 'cancelled'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilter(type)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors
                      ${filter === type
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="p-4 h-[calc(100%-4rem)] overflow-y-auto custom-scrollbar">
            {filteredMeetings.length > 0 ? (
              <div className="space-y-4">
                {filteredMeetings.map(meeting => (
                  <MeetingCard
                    key={meeting.id}
                    meeting={meeting}
                    isSelected={selectedMeeting?.id === meeting.id}
                    onClick={() => setSelectedMeeting(meeting)}
                    onSetReminder={() => setReminder(meeting.id)}
                    onCancel={() => cancelMeeting(meeting.id)}
                  />
                ))} 
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                <p>No scheduled meetings found</p>
              </div>
            )}
          </div>
        </div>

        {/* Meeting Details */}
        <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg overflow-hidden">
          <div className="h-full">
            {selectedMeeting ? (
              <div className="h-full overflow-y-auto custom-scrollbar p-6">
                <MeetingDetails meeting={selectedMeeting} />
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                <p>Select a meeting to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduledMeetings; 