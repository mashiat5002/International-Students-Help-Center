import React, { useEffect, useState } from 'react';
import { call_fetch_logged_id_info } from '../(utils)/call_fetch_logged_id_info/route';

const profiles = [
  {
    name: 'Tobias Whetton',
    username: 'tobias',
    description: 'Engineer, designer & developer that can be found inhabiting coffee houses',
    points: 321,
    friends: 30,
    joined: 'Apr 2020',
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
    id: '1'
  },
  {
    name: 'Jane Doe',
    username: 'jane',
    description: 'Product manager & coffee enthusiast',
    points: 210,
    friends: 45,
    joined: 'Jan 2021',
    img: 'https://randomuser.me/api/portraits/women/44.jpg',
    id: '2'
  },
  {
    name: 'Oliver Noah',
    username: 'oliver',
    description: 'Full-stack developer and open source lover',
    points: 150,
    friends: 22,
    joined: 'Jul 2019',
    img: 'https://randomuser.me/api/portraits/men/12.jpg',
    id: '3'
  },
  {
    name: 'Niki Andini',
    username: 'niki',
    description: 'UI/UX designer, traveler, and bookworm',
    points: 400,
    friends: 60,
    joined: 'Oct 2018',
    img: 'https://randomuser.me/api/portraits/women/65.jpg',
    id: '4'
  },
];
type MeetingRequestDetails = {
  expert_id: string;
  Institution: string;
  fieldOfStudy: string;
  ApplyingOn: string;
  meeting_topic: string;
}
const Choose_expert_for_meeting = ({setMeetingRequestDetails}:{setMeetingRequestDetails:React.Dispatch<React.SetStateAction<MeetingRequestDetails>>}) => {
  const [search, setSearch] = useState('');
  const [onlyDisplay, setonlyDisplay] = useState(false);
  
  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(search.toLowerCase()) ||
    profile.username.toLowerCase().includes(search.toLowerCase()) ||
    profile.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-h-[400px] w-full overflow-scroll custom-scrollbar overflow-x-hidden   md:mb-48  rounded-lg   p-6">
      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search profiles..."
          className="w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
        {onlyDisplay? <div
              key={profiles[0].id}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center relative max-w-xs mx-auto"
            >
              {/* Top-right icons */}
              <div className="absolute top-4 right-4 flex space-x-2">
                <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
                </button>
                <button onClick={()=>setMeetingRequestDetails((prev)=>({...prev,expert_id:profile.id}))} className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded-full">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" /></svg>
                </button>
              </div>
              {/* Profile image */}
              <img
                src={profile.img}
                alt={profile.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow mb-4"
              />
              {/* Name and username */}
              <h2 className="text-xl font-bold text-gray-900 text-center">{profile.name}</h2>
              <div className="text-gray-400 text-sm mb-2 text-center">@{profile.username}</div>
              {/* Description */}
              <div className="text-gray-600 text-center mb-4 text-sm">{profile.description}</div>
              {/* Stats */}
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-700 mt-auto">
                <div><span className="font-bold">{profile.points}</span> Points</div>
                <div><span className="font-bold">{profile.friends}</span> Friends</div>
                <div className="text-gray-400">Joined {profile.joined}</div>
              </div>
            </div>: filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile, idx) => (
            <div
              key={profile.id}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center relative max-w-xs mx-auto"
            >
              {/* Top-right icons */}
              <div className="absolute top-4 right-4 flex space-x-2">
                <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
                </button>
                <button onClick={()=>setMeetingRequestDetails((prev)=>({...prev,expert_id:profile.id}))} className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded-full">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" /></svg>
                </button>
              </div>
              {/* Profile image */}
              <img
                src={profile.img}
                alt={profile.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow mb-4"
              />
              {/* Name and username */}
              <h2 className="text-xl font-bold text-gray-900 text-center">{profile.name}</h2>
              <div className="text-gray-400 text-sm mb-2 text-center">@{profile.username}</div>
              {/* Description */}
              <div className="text-gray-600 text-center mb-4 text-sm">{profile.description}</div>
              {/* Stats */}
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-700 mt-auto">
                <div><span className="font-bold">{profile.points}</span> Points</div>
                <div><span className="font-bold">{profile.friends}</span> Friends</div>
                <div className="text-gray-400">Joined {profile.joined}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400">No profiles found.</div>
        )}
      </div>
    </div>
  );
};

export default Choose_expert_for_meeting; 