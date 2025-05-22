import React, { useState } from 'react'
import { IoCheckmarkDoneCircleOutline } from 'react-icons/io5';
const demoProfile={
    name: 'Tobias Whetton',
    id: '1',
    username: 'tobias',
    description: 'Engineer, designer & developer that can be found inhabiting coffee houses',
    points: 321,
    friends: 30,
    joined: 'Apr 2020',
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
  }
type prof={
      email: string;
    full_name: string;
    address: string;
    city: string;
    state: string;
    postal: string;
    dob: string;
    password: string;
    phone: string;
    varification_key: string;
    varify_timeout: string;
    active_status: string;
}
type profiles = 
    {email: string;
    full_name: string;
    img: string;
    social_media_link: string;
    profession: string;
    institution: string;
    country: string;
    about: string;
    rating: string;
    joined: string;}


const SelectedExpartCard=({selected_expert}:{selected_expert:profiles})=> {
   const [details, setdetails] = useState<profiles>({email: "",
    full_name: "",
    img: "",
    social_media_link: "",
    profession: "",
    institution: "",
    country: "",
    about: "",
    rating: "",
    joined: ""})
  return (
    <>
      <div
              // finding element selected
                    key={demoProfile.id}
                    className="bg-white rounded-2xl shadow-md p-6 mt-10 flex flex-col items-center relative max-w-xs mx-auto"
                  >
                    <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                      // onClick={() => setIsexpertSelected(true)}
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
                    src={selected_expert.img}
                    // alt={selected_expert.name}
                    className="w-30 h-30 rounded-full object-cover border-4 border-white shadow mb-4"
                  />
                  {/* Name and username */}
                  <h2 className="text-xl font-bold text-gray-900 text-center">
                    {selected_expert.full_name}
                  </h2>
                  {/* {selected_expert.social_media_link!="Not Provided"?<div className="text-gray-600 text-center mb-4 text-sm">{selected_expert.social_media_link}</div>:null} */}
                  <div className="text-gray-400 text-sm mb-2 text-center">
                    {selected_expert.email}
                  </div>
                  {/* Description */}
                  {selected_expert.profession != "Not Provided" ? (
                    <div className="text-gray-600 text-center mb-1 text-sm">
                      {selected_expert.profession}
                    </div>
                  ) : null}
                  {selected_expert.institution != "Not Provided" ? (
                    <div className="text-gray-600 text-center mb-1 text-sm">
                      {selected_expert.institution}
                    </div>
                  ) : null}
                  {selected_expert.about != "Not Provided" ? (
                    <div className="text-gray-600  text-center  text-pretty  mb-2 text-sm">
                      {selected_expert.about}
                    </div>
                  ) : null}

                  {/* Stats */}
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-700 mt-auto">
                    <div>
                      Rating <span className="font-bold">{selected_expert.rating}</span>{" "}
                    </div>
                    <div className="text-gray-400">Joined {selected_expert.joined}</div>
                  </div>
                  </div>
    </>
  )
}
export default SelectedExpartCard;