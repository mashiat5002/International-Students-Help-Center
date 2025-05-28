import React, { ReactHTMLElement, useEffect, useState } from 'react';
import { MdOutlineClose } from "react-icons/md";
import Toast from './common/Toast';
import SelectedExpartCard from './SelectedExpartCard';
import { call_fetch_an_experts_seminars } from '../(utils)/call_fetch_an_experts_seminars/route';
import LoadingSpinner from './common/LoadingSpinner';
import Seminar_Registration_Modal from './Seminar_Registration_Modal';
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
type seminar={
     _id: string;
  speaker: string;
  expert_id: string;
  description: string;
  meeting_topic: string;
  Creation_time: string;
  Scheduled_time: string;
  max_Participants: string;
  topics: string[];
  registed_participants: string;
  duration: string;
  isregistered: boolean;
}
const SeminarRegistrationForm  = ({setIsexpertSelected,selected_expert}:
  {setIsexpertSelected:React.Dispatch<React.SetStateAction<boolean>>,
   selected_expert: profiles

  }
 

) => {
  const [seminars, setseminars] = useState<seminar[]>([]); 
  const [selectedSemnar, setselectedSemnar] = useState({
    _id: "",
    speaker: "",
    expert_id: "",
    description: "",
    meeting_topic: "",
    Creation_time: "",
    Scheduled_time: "",
    max_Participants: "",
    topics: [""],
    registed_participants: "",
    duration: "",
    isregistered: false,
  }); 
  const [isLoading, setIsLoading] = useState(false); 
  const [rerender, setrerender] = useState(false); 
  const [showform, setshowform] = useState(false); 
  const [showToast, setShowToast] = useState(false);
  const [toastType, settoastType] = useState("");
  const [toastMessage, setToastMessage] = useState('');

  
  const setSelectedSeminar = (idx: number) => {
    setselectedSemnar(seminars[idx]);
  }
  useEffect(()=>{
    const fetchData=async()=>{
      setIsLoading(true)
      const res= await call_fetch_an_experts_seminars(selected_expert._id);
      console.log(res)
      setseminars(res.data )
      setIsLoading(false)
    }
    fetchData()
  },[rerender])
  return (
    <>
      <div className=" rounded-2xl mt-5   flex items-center justify-center ">
        <div className="bg-white rounded-2xl shadow-xl flex flex-col-reverse md:min-h-[600px] md:mt-5 lg:flex-row w-full max-w-5xl overflow-hidden border border-gray-200">
          {/* Left: Checkout Form */}
          <div className={`${seminars.length>1?"md:overflow-scroll md:overflow-x-hidden custom-scrollbar":""} flex-1 p-8 flex flex-col min-w-[340px] md:max-h-[600px] `}>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <span className="font-semibold text-lg">ISHC</span>
            </div>
            {/* Form */}
            <form className="space-y-3  ">
              <h2 className="text-xl  font-bold mb-4">
                Upcoming Seminars By {selected_expert.full_name}
              </h2>

             {isLoading?<div className='h-[300px] w-full  flex items-center justify-center'><LoadingSpinner/></div>:
             seminars.length==0?<div className='h-[300px] w-full  flex items-center justify-center font-semibold text-black'>No Upcoming Seminars</div>:
              seminars.map((item,idx)=>
               <ul key={item._id.toString()} className="gap-4">
                  <li className="flex w-full flex-col md:flex-row md:items-center justify-between bg-[#dce5e6c8] rounded-xl p-4 border border-white/10">
                    <div className="flex-1">
                      <div className="text-lg font-semibold text-black mb-1">
                        {item.meeting_topic}
                      </div>
                      
                      <div className="text-black/80 text-sm mb-1">
                        Duration: {item.duration} Minutes
                      </div>
                      <div className="text-black/80 text-sm mb-1">
                        Maximum Allowed Participants: {item.max_Participants}
                      </div>
                      <div className="text-black/80 text-sm mb-1">
                        Registered Participants: {item.registed_participants}
                      </div>
                      <div className="text-black/60 text-xs mb-1">
                        Scheduled on:{" "}
                        {new Date(item.Scheduled_time).toLocaleString()}
                      </div>
                      <div className="text-black/60 text-xs mb-1">
                        Creation time:{" "}
                        {new Date(item.Creation_time).toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <button
                      disabled={item.isregistered}
                      type="button"
                      // onSubmit={(e)=>{e.preventDefault();setShowRegistrationModal(true)}}
                        onClick={()=>{setshowform(true),setSelectedSeminar(idx)}}
                        className={`px-6 py-3 ${item.isregistered?"bg-green-300 cursor-default text-black":item.max_Participants<=item.registed_participants?"bg-red-300 cursor-default text-blue-900":"hover:bg-blue-900 hover:text-[#f6f5f5]"}  text-[#000]  font-semibold rounded-2xl shadow-md from-[#1111] to-[333446] transition duration-300 ease-in-out`}
                      >
                        {item.isregistered?"You Are Registered":item.max_Participants<=item.registed_participants?"Fully Booked":"Register Now"}
                      </button>
                    </div>
                  </li>
                </ul>
              )
             }


            </form>
          </div>
          {/* Right */}
          <div className="flex-1 relative min-w-[340px] flex  items-center justify-center  bg-[#dce5e6c8]">
            <div className="relative w-full lg:h-full flex h-[550px] ">
              <div className="relative  w-full h-[420px] md:h-fit   flex justify-center">
                <div
                  onClick={() => setIsexpertSelected(false)}
                  className="h-5 w-5 absolute right-7 z-50 top-2 hover:text-rose-300 cursor-pointer"
                >
                  <MdOutlineClose size={"25px"} />
                </div>
                <SelectedExpartCard selected_expert={selected_expert} />
              </div>
              <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col gap-2 bg-gradient-to-t from-[#e5e1de] via-[#e5e1de]/80 to-transparent rounded-b-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Register For Seminar
                    </h3>
                    {/* <div className="text-gray-700 mt-1">$148</div> */}
                    <div className="text-gray-500 text-sm">
                      Get Expert Consultation
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                
                </div>
              </div>
            </div>
          </div>
        </div>
        {showform?<Seminar_Registration_Modal
          setrerender={setrerender}
          rerender={rerender}
          seminar={selectedSemnar}
          onClose={() => setshowform(false)}
        />:null}
      </div>
      {showToast && <Toast type={toastType} message={toastMessage} />}
    </>
  );
};

export default SeminarRegistrationForm ; 