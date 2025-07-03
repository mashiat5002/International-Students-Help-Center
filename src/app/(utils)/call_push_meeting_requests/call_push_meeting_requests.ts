
type details={expert_id: string;
  Institution: string;
  fieldOfStudy: string;
  ApplyingOn: string;
  meeting_topic: string;}
export async function call_push_meeting_requests(details:details,jouney_id:string| null | undefined) {
    
    
    const res= await fetch(`${process.env.NEXT_PUBLIC_Base_Url}/api/push_meeting_requests`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({"MeetingRequestDetails":details,"jouney_id":jouney_id})
        
        
    })
    const final_res= await res.json()
    return final_res;
   
}
