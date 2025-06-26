import React, { useState } from 'react';
import Choose_expert_for_meeting from './Choose_expert_for_meeting';
import Toast from './common/Toast';
import { call_push_meeting_requests } from '../(utils)/call_push_meeting_requests/route';
interface data{
  data: Buffer
  type: string
}
interface Journey {
  _id: string;
  title: string;
  description: string;
  totalSteps: number;
  currentStep: number;
  lastUpdated: string;
  institution: string;
  program: string;
  deadline: string;
  steps: {
    title: string;
    description: string;
    status: 'completed' | 'in-progress' | 'not-started';
    document?: data;
    doc_name?: string;
    uploadDate?: string;
  }[];
}

type MeetingRequestDetails = {
  expert_id: string;
  Institution: string;
  fieldOfStudy: string;
  ApplyingOn: string;
  meeting_topic: string;
  
}
const MeetingSchedulingForm = (
  {setisMeetingFormDisplayed,setMeetingRequestDetails,MeetingRequestDetails,selectedJourney}:{setisMeetingFormDisplayed: React.Dispatch<React.SetStateAction<boolean>>,
  setMeetingRequestDetails:React.Dispatch<React.SetStateAction<MeetingRequestDetails>>,
  MeetingRequestDetails:MeetingRequestDetails,
  selectedJourney: Journey | null | undefined,


}

) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastType, settoastType] = useState("");
  const [toastMessage, setToastMessage] = useState('');

  const callSubmit=async ()=>{
   
    setIsLoading(true);
    console.log(selectedJourney?._id)
    const res= await call_push_meeting_requests(MeetingRequestDetails,selectedJourney?._id)
  
  
    console.log(res.res)
    setIsLoading(false);
    if( res.res=="Request Sent Successfully"){
      settoastType("success")
        setToastMessage(res.res);
        setShowToast(true);
        setTimeout(() => {setShowToast(false);}, 3000);
    }
    else if( res.res!="Request Sent Successfully"){
      settoastType("failed")
      setToastMessage(res.res);
      setShowToast(true);
      setTimeout(() => {setShowToast(false);}, 3000);
    }
  }
  return (
    <>
    <div className=" rounded-2xl mt-5  bg-gray-100 flex items-center justify-center ">
      
      <div className="bg-white rounded-2xl shadow-xl flex flex-col-reverse lg:flex-row w-full max-w-5xl overflow-hidden border border-gray-200">
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
              <input onChange={(e)=>setMeetingRequestDetails((prev)=>({...prev,Institution:e.target.value}))}  type="text" defaultValue={selectedJourney?.institution} className={`w-full border ${MeetingRequestDetails.Institution=="" && toastMessage=="Must select intended institution to study!!"?"border-red-500":"border-gray-300"} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black`} />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Field of Study</label>
                <input onChange={(e)=>setMeetingRequestDetails((prev)=>({...prev,fieldOfStudy:e.target.value}))} type="text" defaultValue={selectedJourney?.description} className={`w-full border ${MeetingRequestDetails.fieldOfStudy=="" && toastMessage=="Must select your intended field of study !!"?"border-red-500":"border-gray-300"}  rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black`} />
              </div>
             
            </div>
            <div>
              <label className="block text-sm font-medium mb{`">Applying On</label> 
              <div className="relative">
                <select onChange={(e)=>setMeetingRequestDetails((prev)=>({...prev,ApplyingOn:e.target.value}))} className={`w-full border ${MeetingRequestDetails.ApplyingOn=="" && toastMessage=="Must select your intended field of study !!"?"border-red-500":"border-gray-300"} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black appearance-none`}>
                  <option value={selectedJourney?.institution}>{selectedJourney?.program}</option>
                  <option value={"Masters"}>Masters</option>
                  <option value={"Bachelors"}>Bachelors</option>
                  <option value={"Other"}>Other</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Topic of Meeting</label>
              <div className={`flex items-center border ${MeetingRequestDetails.meeting_topic=="" && toastMessage=="Must provide meeting topic !!"?"border-red-500":"border-gray-300"}  rounded-lg px-3 py-2 bg-gray-50`}>
                <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12l-4-4-4 4m8 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6" /></svg>
                <input onChange={(e)=>setMeetingRequestDetails((prev)=>({...prev,meeting_topic:e.target.value}))} type="text"  className={`h-20 ${MeetingRequestDetails.meeting_topic=="" && toastMessage=="Must provide meeting topic !!"?"border-red-500":"border-gray-300"}  w-full bg-transparent focus:outline-none`} />
              </div>
            </div>
            <div onClick={()=>{callSubmit(), setIsLoading(true)}} className="flex items-center justify-center cursor-pointer w-full bg-black text-white py-3 rounded-lg font-semibold text-lg mt-2 hover:bg-gray-900 transition">{isLoading?"Processing Request..":"Continue to Confirm"}</div>
          </form>
         
        </div>
        {/* Right: Product Card */}
        <div className="flex-1 relative min-w-[340px]  bg-[#dce5e6c8]">
          <div className=" w-full h-full  ">
            <div className=" w-full h-[590px] md:h-full ">
             
             <Choose_expert_for_meeting setisMeetingFormDisplayed={setisMeetingFormDisplayed} toastMessage={toastMessage} MeetingRequestDetails={MeetingRequestDetails}  setMeetingRequestDetails={setMeetingRequestDetails}/>
            </div>
            <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col gap-2 bg-gradient-to-t from-[#e5e1de] via-[#e5e1de]/80 to-transparent rounded-b-2xl">
              <div className="flex  items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Schedule Meeting</h3>
                  {/* <div className="text-gray-700 mt-1">$148</div> */}
                  <div className="text-gray-500 text-sm">Get Expert Review</div>
                </div>
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

export default MeetingSchedulingForm; 