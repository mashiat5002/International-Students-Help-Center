type MeetingRequestDetails = {
  expert_id: string;
  Institution: string;
  fieldOfStudy: string;
  ApplyingOn: string;
  meeting_topic: string;
}

export async function call_push_meeting_requests(MeetingRequestDetails:MeetingRequestDetails) {
   
    try{

        const res= await fetch(`${process.env.NEXT_PUBLIC_Base_Url}/api/push_meeting_requests`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(MeetingRequestDetails),
            
            
        })
        return res;
    }catch(err){
        console.log(err)
        return new Response(JSON.stringify({res:"error during registration"}));
    }
    
 
     
   
}
