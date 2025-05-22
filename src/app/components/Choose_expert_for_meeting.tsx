import React, { useEffect, useState } from 'react';
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { call_fetch_expert_logged_id_info } from '../(utils)/call_fetch_expert_logged_id_info/route';
import { call_fetch_all_experts } from '../(utils)/call_fetch_all_experts/route';
import { ObjectId } from 'mongoose';

type details={
    id:  string;
    email: string;
    full_name: string;
    about: string;
    img: string;
    password: string;
    social_media_link1: string;
    social_media_link2: string;
    social_media_link3: string;
    profession: string;
    institution: string;
    country: string;
    varification_key: string;
    varify_timeout: string;
    active_status: string;
}
type MeetingRequestDetails = {
  expert_id: string;
  Institution: string;
  fieldOfStudy: string;
  ApplyingOn: string;
  meeting_topic: string;
}
const Choose_expert_for_meeting = 
({setMeetingRequestDetails,MeetingRequestDetails,toastMessage}:{setMeetingRequestDetails:React.Dispatch<React.SetStateAction<MeetingRequestDetails>>,
  MeetingRequestDetails:MeetingRequestDetails,
  toastMessage: string
}) => {
  const [search, setSearch] = useState('');
  const [onlyDisplay, setonlyDisplay] = useState(false);
    const [details, setDetails] = useState<details[]>([]);
    useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await call_fetch_all_experts()
              setDetails(response.data)
              console.log("response");
              console.log(response);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
      
          fetchData();
        }
       ,[])
  const filteredProfiles = details.filter(profile =>
    profile.full_name.toLowerCase().includes(search.toLowerCase()) ||
    profile.institution.toLowerCase().includes(search.toLowerCase()) ||
    profile.profession.toLowerCase().includes(search.toLowerCase())
  );

  
  return (
    <div className={`max-h-[400px]  w-full overflow-scroll custom-scrollbar overflow-x-hidden ${onlyDisplay||filteredProfiles.length == 0?"overflow-y-hidden":""}   md:mb-48  rounded-lg   p-6`}>
      <div className={`${onlyDisplay?"hidden":""} max-w-md mx-auto mb-6`}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search profiles & Select..."
          className={`w-full px-4 py-2 border ${MeetingRequestDetails.expert_id=="" && toastMessage=="Must Select an Expert who will conduct the meeting!!" ? "border-red-500":"border-gray-300"} rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400`}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
        {onlyDisplay? <div
        // finding element selected
              key={details[details.findIndex(x=> x.id==MeetingRequestDetails.expert_id)].id}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center relative max-w-xs mx-auto"
            >
              {/* Top-right icons */}
              <div className="absolute top-4 right-4 flex space-x-2">
                <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
                </button>
                <button onClick={()=>{setonlyDisplay(false),setMeetingRequestDetails((prev)=>({...prev,expert_id:""}))}} className="bg-green-300 hover:bg-red-400 text-blue-600 p-2 rounded-full">
                  <IoCheckmarkDoneCircleOutline color='green'/>
                </button>
              </div>
              {/* Profile image */}
              <img
                src={details[details.findIndex(x=> x.id==MeetingRequestDetails.expert_id)].img}
                alt={details[details.findIndex(x=> x.id==MeetingRequestDetails.expert_id)].full_name}
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow mb-4"
              />
              {/* Name and username */}
              <h2 className="text-xl font-bold text-gray-900 text-center">{details[details.findIndex(x=> x.id==MeetingRequestDetails.expert_id)].full_name}</h2>
              <div className="text-gray-400 text-sm mb-2 text-center">@{details[details.findIndex(x=> x.id==MeetingRequestDetails.expert_id)].about}</div>
              {/* Description */}
              <div className="text-gray-600 text-center mb-4 text-sm">{details[details.findIndex(x=> x.id==MeetingRequestDetails.expert_id)].institution}</div>
              {/* Stats */}
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-700 mt-auto">
                <div><span className="font-bold">{details[details.findIndex(x=> x.id==MeetingRequestDetails.expert_id)].social_media_link1}</span> Points</div>
                <div><span className="font-bold">{details[details.findIndex(x=> x.id==MeetingRequestDetails.expert_id)].social_media_link2}</span> Friends</div>
                <div className="text-gray-400">Joined {details[details.findIndex(x=> x.id==MeetingRequestDetails.expert_id)].social_media_link3}</div>
              </div>
            </div>: filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile, idx) => (
            <div
              key={profile.id}
              className="bg-white  rounded-2xl shadow-md p-6 flex flex-col items-center relative max-w-xs mx-auto"
            >
              {/* Top-right icons */}
              <div className="absolute top-4 right-4 flex space-x-2">
                <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
                </button>
                <button onClick={()=>{setMeetingRequestDetails((prev)=>({...prev,expert_id:profile.id})), setonlyDisplay(true)}} className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded-full">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" /></svg>
                </button>
              </div>
              {/* Profile image */}
              <img
                src={profile.img}
                // alt={profile.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow mb-4"
              />
              {/* Name and username */}
              <h2 className="text-xl font-bold text-gray-900 text-center">{profile.full_name}</h2>
              <div className="text-gray-400 text-sm mb-2 text-center">@{profile.email}</div>
              {/* Description */}
              <div className="text-gray-600 text-center mb-4 text-sm">{profile.about}</div>
              {/* Stats */}
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-700 mt-auto">
                <div><span className="font-bold">{profile.profession}</span> Points</div>
                <div><span className="font-bold">{profile.institution}</span> Friends</div>
   
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full h-[300px] text-center text-gray-400">No profiles found.</div>
        )}
      </div>
    </div>
  );
};

export default Choose_expert_for_meeting; 