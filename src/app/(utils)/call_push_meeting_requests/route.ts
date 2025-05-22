import { call_fetch_logged_id_info } from "../call_fetch_logged_id_info/route";

type details={expert_id: string;
  Institution: string;
  fieldOfStudy: string;
  ApplyingOn: string;
  meeting_topic: string;}
export async function call_push_meeting_requests(details:details) {
    const studentDetails= await call_fetch_logged_id_info()
    
    const res= await fetch(`${process.env.NEXT_PUBLIC_Base_Url}/api/push_meeting_requests`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({"MeetingRequestDetails":details,"studentDetails":studentDetails})
        
        
    })
    const final_res= await res.json()
    return final_res;
   
}
