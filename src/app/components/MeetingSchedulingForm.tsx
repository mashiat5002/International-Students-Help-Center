import React from 'react';
import Choose_expert_for_meeting from './Choose_expert_for_meeting';
import { MdOutlineClose } from "react-icons/md";
import { call_push_meeting_requests } from '../(utils)/call_push_meeting_requests/route';
type MeetingRequestDetails = {
  expert_id: string;
  Institution: string;
  fieldOfStudy: string;
  ApplyingOn: string;
  meeting_topic: string;
}
const MeetingSchedulingForm = (
  {setisMeetingFormDisplayed,setMeetingRequestDetails,MeetingRequestDetails}:{setisMeetingFormDisplayed: React.Dispatch<React.SetStateAction<boolean>>,
  setMeetingRequestDetails:React.Dispatch<React.SetStateAction<MeetingRequestDetails>>,
  MeetingRequestDetails:MeetingRequestDetails

}

) => {


  const callSubmit=async (e:React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault();
    call_push_meeting_requests(MeetingRequestDetails)
  }
  return (
    <div className=" rounded-2xl mt-5  bg-gray-100 flex items-center justify-center ">
      
      <div className="bg-white rounded-2xl shadow-xl flex flex-col lg:flex-row w-full max-w-5xl overflow-hidden border border-gray-200">
        {/* Left: Checkout Form */}
        <div className="flex-1 p-8 flex flex-col justify-between min-w-[340px]">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <span className="font-semibold text-lg">ISHC</span>
          </div>
          {/* Form */}
          <form className="space-y-3">
            <h2 className="text-2xl font-bold mb-4">Fill Information About Your Intended Study Destination</h2>
        
            <div>
              <label className="block text-sm font-medium mb-1">University/College Name</label>
              <input onChange={(e)=>setMeetingRequestDetails((prev)=>({...prev,Institution:e.target.value}))}  type="text" defaultValue="" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Field of Study</label>
                <input onChange={(e)=>setMeetingRequestDetails((prev)=>({...prev,fieldOfStudy:e.target.value}))} type="text" defaultValue="" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
              </div>
             
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Applying On</label>
              <div className="relative">
                <select onChange={(e)=>setMeetingRequestDetails((prev)=>({...prev,ApplyingOn:e.target.value}))} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black appearance-none">
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
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
                <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12l-4-4-4 4m8 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6" /></svg>
                <input onChange={(e)=>setMeetingRequestDetails((prev)=>({...prev,meeting_topic:e.target.value}))} type="text"  className="h-20 w-full bg-transparent focus:outline-none" />
              </div>
            </div>
            <button onClick={callSubmit} className="w-full bg-black text-white py-3 rounded-lg font-semibold text-lg mt-2 hover:bg-gray-900 transition">Continue to Confirm</button>
          </form>
         
        </div>
        {/* Right: Product Card */}
        <div className="flex-1 relative min-w-[340px] flex items-center justify-center bg-[#dce5e6c8]">
          <div className="relative w-full h-full flex flex-col justify-end">
            <div className="relative w-full h-[420px] md:h-full  flex items-center justify-center">
              <div  className='h-5 w-5 absolute right-7 z-50 top-2 hover:text-rose-300 cursor-pointer'>
                <MdOutlineClose onClick={()=>setisMeetingFormDisplayed(false)} size={"25px"}/>
              </div>
             <Choose_expert_for_meeting setMeetingRequestDetails={setMeetingRequestDetails}/>
            </div>
            <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col gap-2 bg-gradient-to-t from-[#e5e1de] via-[#e5e1de]/80 to-transparent rounded-b-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Schedule Meeting</h3>
                  {/* <div className="text-gray-700 mt-1">$148</div> */}
                  <div className="text-gray-500 text-sm">Get Expert Review</div>
                </div>
                <button className="bg-white border border-gray-300 rounded-lg px-4 py-2 font-semibold text-gray-900 shadow hover:bg-gray-50 transition">Confirm</button>
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
  );
};

export default MeetingSchedulingForm; 