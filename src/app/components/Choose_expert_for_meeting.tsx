import React, { useEffect, useState } from 'react';
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { call_fetch_all_experts } from '../(utils)/call_fetch_all_experts/call_fetch_all_experts';
import { MdOutlineClose } from 'react-icons/md';
import LoadingSpinner from './common/LoadingSpinner';

type profiles = 
    {email: string;
    _id: string;
    full_name: string;
    img: string;
    social_media_link: string;
    profession: string;
    institution: string;
    country: string;
    about: string;
    rating: string;
    joined: string;}
type MeetingRequestDetails = {
  expert_id: string;
  Institution: string;
  fieldOfStudy: string;
  ApplyingOn: string;
  meeting_topic: string;
}
const Choose_expert_for_meeting = 
({setMeetingRequestDetails,MeetingRequestDetails,toastMessage,setisMeetingFormDisplayed}:{setMeetingRequestDetails:React.Dispatch<React.SetStateAction<MeetingRequestDetails>>,
  MeetingRequestDetails:MeetingRequestDetails,
  toastMessage: string,
  setisMeetingFormDisplayed:React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [isloading, setisloading] = useState(false);
  const [search, setSearch] = useState('');
  const [onlyDisplay, setonlyDisplay] = useState(false);
  const [details, setDetails] = useState<profiles[]>([]);
  const [selected_profile, setselected_profile] = useState({email: "",
      _id: "",
      full_name: "",
      img: "",
      social_media_link: "",
      profession: "",
      institution: "",
      country: "",
      about: "",
      rating: "",
      joined: ""});
    useEffect(() => {
          const fetchData = async () => {
            try {
              setisloading(true)
              const response = await call_fetch_all_experts()
              setDetails(response.data)
              setisloading(false)
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

  const select_profile=(id:string)=>{
    console.log("selected"+id)
    const selection= details.filter(item=>item._id==id)
    console.log(selection)
    setselected_profile(selection[0])
    setonlyDisplay(true)

  
  }
  return (
    <div className={`max-h-[460px]  w-full overflow-scroll custom-scrollbar overflow-x-hidden ${onlyDisplay||filteredProfiles.length == 0?"overflow-y-hidden":""}    rounded-lg   `}>
      <div className={`${onlyDisplay?"hidden":""} max-w-full bg-[#dce5e6c8] h-16 flex items-center justify-center  mx-auto  top-0 rounded-xl sticky z-50`}>
         <div  className='h-5 w-5  absolute right-7 z-50 top-2 hover:text-rose-300 cursor-pointer'>
                        <MdOutlineClose onClick={()=>setisMeetingFormDisplayed(false)} size={"25px"}/>
                      </div>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search profile & Select"
          className={`w-fit px-4 py-2 border   text-center rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400`}
        />
      </div>
      {isloading?<div className=''><LoadingSpinner/></div>:<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 ">
        {onlyDisplay? <div
        // finding element selected
              key={details[details.findIndex(x=> x._id==MeetingRequestDetails.expert_id)]._id}
              className="bg-white w-[350px] h-[390px] rounded-2xl shadow-md p-6 flex flex-col items-center relative max-w-xs mx-auto mt-10 mb-2"
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
                    src={selected_profile.img}
                    // alt={selected_expert.name}
                    className="w-30 h-30 rounded-full object-cover border-4 border-white shadow mb-4"
                  />
                  {/* Name and username */}
                  <h2 className="text-xl font-bold text-gray-900 text-center">
                    {selected_profile.full_name}
                  </h2>
                  {/* {selected_profile.social_media_link!="Not Provided"?<div className="text-gray-600 text-center mb-4 text-sm">{selected_profile.social_media_link}</div>:null} */}
                  <div className="text-gray-400 text-sm mb-2 text-center">
                    {selected_profile.email}
                  </div>
                  {/* Description */}
                  {selected_profile.profession != "Not Provided" ? (
                    <div className="text-gray-600 text-center mb-1 text-sm">
                      {selected_profile.profession}
                    </div>
                  ) : null}
                  {selected_profile.institution != "Not Provided" ? (
                    <div className="text-gray-600 text-center mb-1 text-sm">
                      {selected_profile.institution}
                    </div>
                  ) : null}
                  {selected_profile.about != "Not Provided" ? (
                    <div className="text-gray-600  text-center  text-pretty  mb-2 text-sm">
                      {selected_profile.about}
                    </div>
                  ) : null}

              {/* Stats */}
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-700 mt-auto">
                    <div>
                      Rating <span className="font-bold">{selected_profile.rating}</span>{" "}
                    </div>
                    <div className="text-gray-400">Joined {selected_profile.joined}</div>
                  </div>
            </div>: filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile, idx) => (
            <div
              // finding element selected
                    key={profile._id}
                    className="bg-white w-[350px] h-[390px] rounded-2xl shadow-md p-6 flex flex-col items-center relative max-w-xs mx-auto mb-2"
                  >
              {/* Top-right icons */}
              <div className="absolute top-4 right-4 flex space-x-2">
                <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
                </button>
                <button onClick={()=>{select_profile(profile._id),setMeetingRequestDetails((prev)=>({...prev,expert_id:profile._id,expert_full_name:profile.full_name}))}} className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded-full">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" /></svg>
                </button>
              </div>
               {/* Profile image */}
                  <img
                    src={profile.img}
                    // alt={selected_expert.name}
                    className="w-30 h-30 rounded-full object-cover border-4 border-white shadow mb-4"
                  />
                  {/* Name and username */}
                  <h2 className="text-xl font-bold text-gray-900 text-center">
                    {profile.full_name}
                  </h2>
                  {/* {profile.social_media_link!="Not Provided"?<div className="text-gray-600 text-center mb-4 text-sm">{profile.social_media_link}</div>:null} */}
                  <div className="text-gray-400 text-sm mb-2 text-center">
                    {profile.email}
                  </div>
                  {/* Description */}
                  {profile.profession != "Not Provided" ? (
                    <div className="text-gray-600 text-center mb-1 text-sm">
                      {profile.profession}
                    </div>
                  ) : null}
                  {profile.institution != "Not Provided" ? (
                    <div className="text-gray-600 text-center mb-1 text-sm">
                      {profile.institution}
                    </div>
                  ) : null}
                  {profile.about != "Not Provided" ? (
                    <div className="text-gray-600  text-center  text-pretty  mb-2 text-sm">
                      {profile.about}
                    </div>
                  ) : null}

              {/* Stats */}
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-700 mt-auto">
                    <div>
                      Rating <span className="font-bold">{profile.rating}</span>{" "}
                    </div>
                    <div className="text-gray-400">Joined {profile.joined}</div>
                  </div>
            </div>
          ))
        ) : (
          <div className=" h-[300px] mt-10 text-center text-gray-400">No profiles found.</div>
        )}
      </div>}
    </div>
  );
};

export default Choose_expert_for_meeting; 