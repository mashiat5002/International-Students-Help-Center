import { ObjectId } from 'mongoose';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Toast from '../common/Toast';
import LoadingSpinner from '../common/LoadingSpinner';
import { call_fetch_scheduled_seminars } from '@/app/(utils)/call_fetch_scheduled_seminars/call_fetch_scheduled_seminars';
import { call_setDateTimeSeminar } from '@/app/(utils)/call_setDateTimeSeminar/call_setDateTimeSeminar';
import { call_decline_seminar } from '@/app/(utils)/call_decline_seminar/call_decline_seminar';
import { FaVideo } from 'react-icons/fa';
import { SeminarDetails } from './Seminar_Details';


type details={
    _id: ObjectId,
    expert_id: string,
    Institution: string,
    registed_participants: string,
    duration: string,
    meeting_topic: string,
    max_Participants: string,
    student_full_name: string,
    status: string,
    Scheduled_time: string,
    Creation_time: string,
    __v: Number
}
const UpcomingSeminars = () => {
  const [keyClicked, setkeyClicked] = useState(-1);
  const [isChangeTimeClicked, setisChangeTimeClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rerender, setrerender] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [IsDate_Time_given, setIsDate_Time_given] = useState(true);
  const [toastType, settoastType] = useState("");
  const [toastMessage, setToastMessage] = useState('');
  const [details,setDetails]= useState<details[]>([])
  const [selectedDateTimes, setSelectedDateTimes] = useState<{[key: string]: Date | null}>({});
  const [param,setPeram] = useState<string>("");

   




  useEffect(()=>{
    const fetch_data= async()=>{
      setIsLoading(true)
      setisChangeTimeClicked(false)
      const response= await call_fetch_scheduled_seminars();
      setIsLoading(false)
      // const final_data= response.data.filter((item:details)=> item.Scheduled_time!="Not Scheduled")
      setDetails(response.data)
      console.log(response.data.reverse())
     
    }
    fetch_data()
  },[rerender])
  

  const handleDateTimeChange = (id: string, value: Date | null) => {
    setSelectedDateTimes(prev => ({ ...prev, [id]: value }));
  };

  const handleConfirm = async(id: string) => {
    const selected = selectedDateTimes[id];
    console.log(`Confirmed for ${id}: ${selected}`);
    if(!selected){
      console.log(`no time selected`);
      setIsDate_Time_given(false)
      return

    }else{
      setIsDate_Time_given(true)
    }
    const res= await call_setDateTimeSeminar(id,selected);
    
    
    setIsLoading(false);
    if( res.message=="Date-time Set Successful"){
      setrerender(!rerender)
      settoastType("success")
        setToastMessage("Seminar Is Scheduled");
        setShowToast(true);
        setTimeout(() => {setShowToast(false);}, 3000);
    }
    else if( res.message!="Must Provide Date-time!!"){
      setIsDate_Time_given(false)
      settoastType("failed")
      setToastMessage(res.message);
      setShowToast(true);
      setTimeout(() => {setShowToast(false);}, 3000);
    }
    else if( res.message!="Date-time Set Successful"){
      settoastType("failed")
      setToastMessage(res.message);
      setShowToast(true);
      setTimeout(() => {setShowToast(false);}, 3000);
    }
    // You can add your API call or logic here
  };
  const handleDecline= async(id: string) => {
    const res= await call_decline_seminar(id);
    setIsLoading(false);
    if( res.message=="Declined the seminar successfully"){
      setrerender(!rerender)
      settoastType("success")
        setToastMessage("Seminar had been Cancelled");
        setShowToast(true);
        setTimeout(() => {setShowToast(false);}, 3000);
    }
    
    else {
      settoastType("failed")
      setToastMessage(res.message);
      setShowToast(true);
      setTimeout(() => {setShowToast(false);}, 3000);
    }
    // You can add your API call or logic here
  };

  return (
    <>
    <div className={`h-[600px]  custom-scrollbar  w-full max-w-2xl mx-auto mt-10 p-6 bg-[#393E46] rounded-2xl shadow-lg backdrop-blur-md`}>
      <h2 className="text-2xl font-bold text-white mb-6">Upcoming Seminars</h2>
      {isLoading?<LoadingSpinner />:details.length==0?
      <div className='h-full w-full flex items-center justify-center text-white mt-10'>No Meetings Upcoming</div>:<>
      <ul className={`space-y-4  h-[500px] overflow-x-hidden mb-16`}>
        {details.map((item,k) => (
         <SeminarDetails 
           key={k}
           k={k}
           seminar={item}
           isChangeTimeClicked={isChangeTimeClicked}
           IsDate_Time_given={IsDate_Time_given}
           keyClicked={keyClicked}
           handleDecline={handleDecline}
           handleConfirm={handleConfirm}
           setkeyClicked={setkeyClicked}
           setisChangeTimeClicked={setisChangeTimeClicked}
           selectedDateTimes={selectedDateTimes}
           handleDateTimeChange={handleDateTimeChange}
         />
        ))}
      </ul></>}
     
    </div>
      {showToast&&<Toast
          type={toastType}
          message={toastMessage}
        />}
    </>
  );
};

export default UpcomingSeminars; 