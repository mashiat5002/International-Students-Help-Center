import React, { useEffect, useState } from 'react';
import { MdOutlineClose } from "react-icons/md";
import Toast from './common/Toast';
import SelectedExpartCard from './SelectedExpartCard';
import { call_fetch_an_experts_seminars } from '../(utils)/call_fetch_an_experts_seminars/route';
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
const SeminarRegistrationForm  = ({setIsexpertSelected,selected_expert}:
  {setIsexpertSelected:React.Dispatch<React.SetStateAction<boolean>>,
   selected_expert: profiles

  }
 

) => {
  const [isLoading, setIsLoading] = useState(false); 
  const [showToast, setShowToast] = useState(false);
  const [toastType, settoastType] = useState("");
  const [toastMessage, setToastMessage] = useState('');

  const callSubmit=async ()=>{
    // console.log("called")
    // setIsLoading(true);
    // const res= await call_push_meeting_requests(MeetingRequestDetails)
  
    // console.log(res.res)
    // setIsLoading(false);
    // if( res.res=="Request Sent Successfully"){
    //   settoastType("success")
    //     setToastMessage(res.res);
    //     setShowToast(true);
    //     setTimeout(() => {setShowToast(false);}, 3000);
    // }
    // else if( res.res!="Request Sent Successfully"){
    //   settoastType("failed")
    //   setToastMessage(res.res);
    //   setShowToast(true);
    //   setTimeout(() => {setShowToast(false);}, 3000);
    // }
  }

  useEffect(()=>{
    const fetchData=async()=>{
      const res= await call_fetch_an_experts_seminars(selected_expert._id);
      console.log(res)
    }
    fetchData()
  },[])
  return (
    <>
    <div className=" rounded-2xl mt-5   flex items-center justify-center ">
      
      <div className="bg-white rounded-2xl shadow-xl flex flex-col-reverse  lg:flex-row w-full max-w-5xl overflow-hidden border border-gray-200">
        {/* Left: Checkout Form */}
        <div className="flex-1 p-8 flex flex-col justify-between min-w-[340px]">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <span className="font-semibold text-lg">ISHC</span>
          </div>
          {/* Form */}
          <form className="space-y-3">
            <h2 className="text-xl font-bold mb-4">Upcoming Seminars By {selected_expert.full_name}</h2>
        
            <div>
              <label className="block text-sm font-medium mb-1">University/College Name</label>
              <input   type="text" defaultValue="" className={`w-full border  rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black`} />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Field of Study</label>
                <input  type="text" defaultValue="" className={`w-full border   rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black`} />
              </div>
             
            </div>
            <div>
              <label className="block text-sm font-medium mb{`">Applying On</label>
              <div className="relative">
                <select  className={`w-full border  rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black appearance-none`}>
                  <option value={""}>Select One</option>
                  <option value={"Masters"}>Masters</option>
                  <option value={"Bachelors"}>Bachelors</option>
                  <option value={"Other"}>Other</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Topic of Meeting</label>
              <div className={`flex items-center border   rounded-lg px-3 py-2 bg-gray-50`}>
                <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12l-4-4-4 4m8 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6" /></svg>
                <input  type="text"  className={`h-20   w-full bg-transparent focus:outline-none`} />
              </div>
            </div>
            <div onClick={()=>{callSubmit(), setIsLoading(true)}} className="flex items-center justify-center cursor-pointer w-full bg-black text-white py-3 rounded-lg font-semibold text-lg mt-2 hover:bg-gray-900 transition">{isLoading?"Processing Request..":"Continue to Confirm"}</div>
          </form>
         
        </div>
        {/* Right */}
        <div className="flex-1 relative min-w-[340px] flex  items-center justify-center  bg-[#dce5e6c8]">
          <div className="relative w-full lg:h-full flex h-[550px] ">
            <div className="relative  w-full h-[420px] md:h-fit   flex justify-center">
              <div onClick={()=>setIsexpertSelected(false)} className='h-5 w-5 absolute right-7 z-50 top-2 hover:text-rose-300 cursor-pointer'>
                <MdOutlineClose  size={"25px"}/>
              </div>
              <SelectedExpartCard selected_expert={selected_expert}/>
            </div>
            <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col gap-2 bg-gradient-to-t from-[#e5e1de] via-[#e5e1de]/80 to-transparent rounded-b-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Schedule Meeting</h3>
                  {/* <div className="text-gray-700 mt-1">$148</div> */}
                  <div className="text-gray-500 text-sm">Get Expert Review</div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                {/* <div className="flex items-center text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" /></svg>
                  ))}
                </div> */}
                {/* <span className="text-gray-600 text-sm ml-2">4.8 reviews</span> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
     {showToast&&<Toast
      type={toastType}
      message={toastMessage}
    />}
    </>
  );
};

export default SeminarRegistrationForm ; 