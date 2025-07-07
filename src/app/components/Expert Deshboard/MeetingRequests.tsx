import { call_decline_meetingReq } from '@/app/(utils)/call_decline_meetingReq/call_decline_meetingReq';
import { ObjectId } from 'mongoose';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Toast from '../common/Toast';
import { call_setDateTimeMeeting } from '@/app/(utils)/call_setDateTimeMeeting/call_setDateTimeMeeting';
import LoadingSpinner from '../common/LoadingSpinner';
import { call_fetch_meeting_requests_for_expert } from '@/app/(utils)/call_fetch_meeting_requests_for_expert/call_fetch_meeting_requests_for_expert';


type details={
    _id: ObjectId,
    expert_id: string,
    Institution: string,
    fieldOfStudy: string,
    ApplyingOn: string,
    meeting_topic: string,
    student_email: string,
    student_full_name: string,
    Scheduled_time: string,
    Request_time: string,
    status: string,
    __v: Number
}
const MeetingRequests = () => {
  const [keyClicked, setkeyClicked] = useState(-1);
  const [isChangeTimeClicked, setisChangeTimeClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rerender, setrerender] = useState(false);
  const [IsDate_Time_given, setIsDate_Time_given] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastType, settoastType] = useState("");
  const [toastMessage, setToastMessage] = useState('');
  const [details,setDetails]= useState<details[]>([])
  const [selectedDateTimes, setSelectedDateTimes] = useState<{[key: string]: Date | null}>({});

  useEffect(()=>{
    const fetch_data= async()=>{
      setIsLoading(true)
      setisChangeTimeClicked(false)
      const response= await call_fetch_meeting_requests_for_expert();
      setIsLoading(false)
      console.log("rendered")
      setDetails(response.data.reverse())
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
    const res= await call_setDateTimeMeeting(id,selected);
    
    
    setIsLoading(false);
    if( res.message=="Date-time Set Successful"){
      setrerender(!rerender)
      settoastType("success")
        setToastMessage("Meeting Is Scheduled");
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
    const res= await call_decline_meetingReq(id);
    // setIsLoading(false);
    if( res.message=="Declined the meeting successfully"){
      setrerender(!rerender)
      settoastType("success")
        setToastMessage("Meeting Is Declined");
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
    <div className={`h-[600px]  custom-scrollbar  w-full max-w-2xl mx-auto mt-10 p-6 bg-white/10 rounded-2xl shadow-lg backdrop-blur-md`}>
      <h2 className="text-2xl font-bold text-white mb-6">Meeting Requests</h2>
        {isLoading?<LoadingSpinner />:details.length==0?
        <div className='h-full w-full flex items-center justify-center text-white mt-10'>No Meetings Upcoming</div>:<>     
         <ul className={`space-y-4  h-[500px] overflow-x-hidden mb-16`}>
        {details.map((item,k) => (
          <li key={k} className="flex   flex-col md:flex-row md:items-center justify-between bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex-1">
              <div className="text-lg font-semibold text-white mb-1">{item.student_full_name}</div>
              <div className="text-white/80 text-sm mb-1">Applying To: {item.Institution} {item.fieldOfStudy} </div>
              <div className="text-white/80 text-sm mb-1">Topic: {item.meeting_topic} </div>
              <div className="text-white/60 text-xs mb-1">Request time: {new Date(item.Request_time).toLocaleString()} </div>
            </div>
            <div className="mt-4 md:mt-0 md:ml-6 flex flex-col gap-2 items-end">
              {item.Scheduled_time=="Not Scheduled"||(isChangeTimeClicked&&keyClicked==k)?<DatePicker
                selected={selectedDateTimes[String(item._id)] || null}
                onChange={date => handleDateTimeChange(String(item._id), date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText="Select date & time"
                className={`${item.Scheduled_time=="declined"?"hidden":""} rounded-lg ring-2 ${!IsDate_Time_given&&keyClicked==k?"ring-red-400":"ring-blue-500"} px-3 py-2 text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow`}
                calendarClassName="!bg-white !rounded-xl !shadow-lg !border !border-gray-200"
                popperPlacement="bottom-end"
                minDate={new Date()}
                minTime={
                  (!selectedDateTimes[String(item._id)] ||
                    selectedDateTimes[String(item._id)]?.toDateString() === new Date().toDateString())
                    ? (() => {
                        const now = new Date();
                        now.setSeconds(0, 0);
                        const remainder = 15 - (now.getMinutes() % 15);
                        if (remainder !== 15) now.setMinutes(now.getMinutes() + remainder);
                        return now;
                      })()
                    : new Date(0, 0, 0, 0, 0)
                }
                maxTime={new Date(0, 0, 0, 23, 45)}
              />:<p className='text-white'>{item.Scheduled_time!="declined"?`Scheduled on ${new Date(item.Scheduled_time).toLocaleString()}`:"Meeting Request had been declined"}</p>}
              <div className='w-full h-fit flex '>

              <button
                className={`${item.Scheduled_time=="declined"?"hidden":""} mt-2 px-5 py-2 hover:bg-red-400 text-white rounded-full font-medium shadow  transition`}
                onClick={() => handleDecline(String(item._id))}
              >
                Decline
              </button>
              {item.Scheduled_time=="Not Scheduled"||(isChangeTimeClicked&&keyClicked==k)?<button
                className={ `${item.Scheduled_time=="declined"?"hidden":""} mt-2 ml-4 px-5 py-2 ${item.Scheduled_time=="Not Scheduled"?"bg-blue-600":"bg-orange-500"} text-white rounded-full font-medium shadow hover:bg-blue-700 transition`}
                onClick={() => {setkeyClicked(k),handleConfirm(String(item._id))}}
              >
                Confirm
              </button>:<button
                className={`${item.Scheduled_time=="declined"?"hidden":""} mt-2 ml-4 px-5 py-2 ${item.Scheduled_time=="Not Scheduled"?"bg-blue-600":"bg-orange-500"} text-white rounded-full font-medium shadow hover:bg-blue-700 transition`}
                onClick={() => {setkeyClicked(k),setisChangeTimeClicked(true)}}
              >
                Change Time
              </button>}
              </div>
            </div>
          </li>
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

export default MeetingRequests; 