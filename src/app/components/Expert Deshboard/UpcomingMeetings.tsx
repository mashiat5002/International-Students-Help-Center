import React from 'react';

// Mock data for upcoming meetings
const meetings = [
  {
    id: 1,
    title: 'Consultation with John Doe',
    date: '2024-06-10',
    time: '10:00 AM',
    platform: 'Zoom',
    link: '#',
  },
  {
    id: 2,
    title: 'Follow-up with Jane Smith',
    date: '2024-06-12',
    time: '2:00 PM',
    platform: 'Google Meet',
    link: '#',
  },
  {
    id: 3,
    title: 'Strategy Session with Alex Lee',
    date: '2024-06-15',
    time: '4:30 PM',
    platform: 'Microsoft Teams',
    link: '#',
  },
];

const UpcomingMeetings = () => {
  return (
    <div className="w-full max-w-2xl mx-auto mt-10 p-6 bg-white/10 rounded-2xl shadow-lg backdrop-blur-md">
      <h2 className="text-2xl font-bold text-white mb-6">Upcoming Online Meetings</h2>
      <ul className="space-y-4">
        {meetings.map((meeting) => (
          <li key={meeting.id} className="flex flex-col md:flex-row md:items-center justify-between bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex-1">
              <div className="text-lg font-semibold text-white mb-1">{meeting.title}</div>
              <div className="text-white/80 text-sm mb-1">{meeting.date} at {meeting.time}</div>
              <div className="text-white/60 text-xs">Platform: {meeting.platform}</div>
            </div>
            <div className="mt-4 md:mt-0 md:ml-6">
              <a
                href={meeting.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-5 py-2 bg-blue-600 text-white rounded-full font-medium shadow hover:bg-blue-700 transition"
              >
                Start Meeting
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingMeetings; 