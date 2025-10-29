import { call_fetch_expert_logged_id_info } from '@/app/(utils)/call_fetch_expert_logged_id_info/call_fetch_expert_logged_id_info';
import { encrypt } from '@/app/(utils)/jwt_encrypt_decrypt';
import { ObjectId } from 'mongoose';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaVideo } from 'react-icons/fa';

type SeminarDetailsProps ={
    k:number;
    seminar:details;
    isChangeTimeClicked:boolean;
    IsDate_Time_given:boolean;
    keyClicked:number;
    handleDecline:(id:string)=>void;
    handleConfirm:(id:string)=>void;
    setkeyClicked:(k:number)=>void;
    setisChangeTimeClicked:(value:boolean)=>void;
    selectedDateTimes:{[key: string]: Date | null};
    handleDateTimeChange:(id: string, value: Date | null) => void;
}
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
export const SeminarDetails:React.FC<SeminarDetailsProps>=({k,seminar,handleDecline,IsDate_Time_given,isChangeTimeClicked,keyClicked,handleConfirm,setkeyClicked,setisChangeTimeClicked,selectedDateTimes,handleDateTimeChange})=>{
    const [param,setPeram] = useState<string>("");
          useEffect(() => {
            const getEncryptedparam=async()=>{
              const loggedInfo= await call_fetch_expert_logged_id_info()
              console.log("seminar._id:", seminar)
              const encryptedParam = await encrypt({meeting_id: seminar._id, id: loggedInfo.id ,full_name:loggedInfo.full_name});
      
              setPeram(encryptedParam);
            }
            getEncryptedparam()
          
          }, []);
    return (
            <li key={k} className="flex   flex-col md:flex-row md:seminars-center justify-between bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex-1">
              <div className="text-lg font-semibold text-white mb-1">{seminar.student_full_name}</div>
              <div className="text-white/80 text-sm mb-1">Topic: {seminar.meeting_topic} </div>
              <div className="text-white/80 text-sm mb-1">Duration: {seminar.duration} Minutes </div>
              <div className="text-white/80 text-sm mb-1">Maximum Allowed Participants: {seminar.max_Participants}  </div>
              <div className="text-white/80 text-sm mb-1">Registered Participants: {seminar.registed_participants}  </div>
              <div className="text-white/60 text-xs mb-1">Creation time: {new Date(seminar.Creation_time).toLocaleString()} </div>
            </div>
            <div className="mt-4 md:mt-0 md:ml-6 flex flex-col gap-2 seminars-end">
              {(isChangeTimeClicked&&keyClicked==k)?<DatePicker
                selected={selectedDateTimes[String(seminar._id)] || null}
                onChange={date => handleDateTimeChange(String(seminar._id), date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText="Select date & time"
                className={`${seminar.status=="cancelled"?"hidden":""} rounded-lg ring-2 ${!IsDate_Time_given&&keyClicked==k?"ring-red-400":"ring-blue-500"} px-3 py-2 text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow`}
                calendarClassName="!bg-white !rounded-xl !shadow-lg !border !border-gray-200"
                popperPlacement="bottom-end"
                minDate={new Date()}
                minTime={
                  (!selectedDateTimes[String(seminar._id)] ||
                    selectedDateTimes[String(seminar._id)]?.toDateString() === new Date().toDateString())
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
              />:<p className='text-white'>{seminar.status!="cancelled"?`Scheduled on ${new Date(seminar.Scheduled_time).toLocaleString()}`:"Seminar had been cancelled"}</p>}
              <div className='w-full h-fit flex '>

              <button
                className={`${seminar.status=="cancelled"?"hidden":""} mt-2 px-5 py-2 hover:bg-red-400 text-white rounded-full font-medium shadow  transition`}
                onClick={() => handleDecline(String(seminar._id))}
              >
                Cancel Meeting
              </button>
              {seminar.status=="cancelled" ? <div></div> : (isChangeTimeClicked&&keyClicked==k) ? (
                <button
                  className={ ` mt-2 ml-4 px-5 py-2 ${seminar.status=="cancelled"?"bg-blue-600":"bg-orange-500"} text-white rounded-full font-medium shadow hover:bg-blue-700 transition`}
                  onClick={() => {setkeyClicked(k);handleConfirm(String(seminar._id))}}
                >
                  Confirm
                </button>
              ) : (
                new Date(seminar.Scheduled_time) <= new Date() ? (
                  <a
                    href={`${process.env.NEXT_PUBLIC_Base_Url}/expert-dashboard/seminar/${param}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex seminars-center gap-2 mt-2 ml-4 px-5 py-2 bg-blue-600 text-white rounded-full font-medium shadow hover:bg-blue-700 transition text-base"
                  >
                    <FaVideo className="text-xl" />
                    <span>Join Seminar</span>
                  </a>
                ) : (
                  <button
                    className={`${seminar.status=="cancelled"?"hidden":""} mt-2 ml-4 px-5 py-2 ${seminar.status=="cancelled"?"bg-blue-600":"bg-orange-500"} text-white rounded-full font-medium shadow hover:bg-blue-700 transition`}
                    onClick={() => {setkeyClicked(k);setisChangeTimeClicked(true)}}
                  >
                    Change Time
                  </button>
                )
              )}
              </div>
            </div>
          </li>
    )

}