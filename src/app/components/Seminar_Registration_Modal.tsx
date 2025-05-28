import { useEffect, useState } from "react";
import { call_register_to_seminar } from "../(utils)/call_register_to_seminar/route";
import Toast from "./common/Toast";
type seminarDetails = {
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
};
interface RegistrationModalProps {
  seminar: seminarDetails;
  onClose: () => void;
  setrerender:React.Dispatch<React.SetStateAction<boolean>>;
  rerender: boolean
  
}
const Seminar_Registration_Modal = ({ seminar, onClose,setrerender,rerender }: RegistrationModalProps) => {
  const [purpose, setPurpose] = useState('');
  const [isloading,setisloading]= useState(false)
  const [showToast, setShowToast] = useState(false);
  const [toastType, settoastType] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    console.log("Purpose for attending seminar:", purpose);
    setisloading(true)
    const res= await call_register_to_seminar(seminar._id, purpose);
    setisloading(false)
    console.log(res)
    
     if( res.message=="Registered Successfully"){
  
      settoastType("success")
        setToastMessage(res.message);
        setShowToast(true);
        setTimeout(() => {setShowToast(false);}, 3000);
        setrerender(!rerender)
        onClose()
       
    }
    else {
 
      settoastType("failed")
      setrerender(!rerender)
      setToastMessage(res.message);
      setShowToast(true);
      setTimeout(() => {setShowToast(false);}, 3000);
      
    }
  };
useEffect(()=>{
  console.log(seminar)
},[])
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 m-auto">
        <div className="flex justify-between items-center mb-4 relative ">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div>
          <h3 className="text-lg font-bold text-blue-900">Topic: {seminar.meeting_topic}</h3>
          <h3 className="text-base font-bold text-blue-900">Speaker: {seminar.speaker}</h3>
          <h3 className="text-base font-bold text-blue-900">On: {new Date(seminar.Scheduled_time).toLocaleString()}</h3>
          <h3 className="text-base font-bold text-blue-900">Duration: {seminar.duration} Minutes</h3>

          </div>
          
         
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
         
          <div>
            <label className="block text-base font-bold text-blue-900 mb-1">
            Purpose
            </label>
            <input
              type="text"
              // required
              value={purpose}
              maxLength={100}
              onChange={(e) => setPurpose(e.target.value)}
              className={`${toastMessage=="Must Provide Purpose!!!"?"ring-2 ring-red-500":""} w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
              placeholder="Provide your purpose for attending"
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
             disabled={isloading}
              type="submit"
              className={`px-4 py-2 text-sm ${seminar.isregistered?"bg-green-600 cursor-default":"bg-blue-600 hover:bg-blue-700 "}  text-white rounded-lg `}
            >
              {seminar.isregistered?"You Are Registed":isloading?"Processing.." :"Register"}
            </button>
          </div>
        </form>
      </div>
      {showToast&&<Toast
        type={toastType}
        message={toastMessage}
      />}
    </div>
  );
};
export default Seminar_Registration_Modal;