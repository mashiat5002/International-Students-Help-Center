import React, { useEffect, useState } from 'react';
import SeminarRegistrationForm from './SeminarRegistrationForm';
import { call_fetch_all_experts } from '../(utils)/call_fetch_all_experts/route';

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



const ExpertsProfilesCardsList = () => {
  const [search, setSearch] = useState('');
  const [IsexpertSelected, setIsexpertSelected] = useState(false);
  const [details, setdetails] = useState<profiles[]>([]);
  const [selected_expert, setselected_expert] = useState<profiles>({email: "",
    _id: "",
    full_name: "",
    img: "",
    social_media_link: "",
    profession: "",
    institution: "",
    country: "",
    about: "",
    rating: "",
    joined: ""})
  

    const finterSelectedExpert=(id:string)=>{
      console.log("id selected:"+id)
      const selected_profile_arr=details.filter(profile=>profile._id==id)
      setselected_expert(selected_profile_arr[0])
      setIsexpertSelected(true)

    }
  const filteredProfiles = details.filter(profile =>
    profile.full_name.toLowerCase().includes(search.toLowerCase()) ||
    profile.email.toLowerCase().includes(search.toLowerCase()) ||
    profile.about.toLowerCase().includes(search.toLowerCase()) ||
    profile.institution.toLowerCase().includes(search.toLowerCase()) ||
    profile.profession.toLowerCase().includes(search.toLowerCase())
  );
useEffect(()=>{
  const fetchData=async()=>{
    const res= await call_fetch_all_experts()
    console.log(res.data)
    setdetails(res.data)
  }
  fetchData()
},[])
  return (
    <>
      {IsexpertSelected ? (
        <SeminarRegistrationForm setIsexpertSelected={setIsexpertSelected} selected_expert={selected_expert}/>
      ) : (
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-md mx-auto mb-6">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search profiles..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfiles.length > 0 ? (
              filteredProfiles.map((profile, idx) => (
                <div
                  key={idx}
                  className="bg-white w-[300px] rounded-2xl shadow-md p-6 flex flex-col items-center relative max-w-xs mx-auto"
                >
                  {/* Top-right icons */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                      onClick={() => {finterSelectedExpert(profile._id)}}
                      className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded-full"
                    >
                      <svg
                        width="18"
                        height="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                  {/* Profile image */}
                  <img
                    src={profile.img}
                    // alt={profile.name}
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
              <div className="col-span-full text-center text-gray-400">
                No profiles found.
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ExpertsProfilesCardsList; 