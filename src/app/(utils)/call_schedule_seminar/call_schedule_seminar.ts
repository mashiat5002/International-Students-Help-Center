import { call_fetch_expert_logged_id_info } from "../call_fetch_expert_logged_id_info/call_fetch_expert_logged_id_info";

type seminarData={
     topic: string,
     description: string,
      dateTime: Date,
      duration: string,
      maxParticipants: string,
      topics: string[]
}
export async function call_schedule_seminar(seminarData:seminarData) {
   
    try{

        const res= await fetch(`${process.env.NEXT_PUBLIC_Base_Url}/api/schedule_seminar`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "seminarTopic":seminarData.topic,
                "description":seminarData.description,
                "date_time":seminarData.dateTime,
                "seminarDuration":seminarData.duration,
                "maxParticipants":seminarData.maxParticipants,
                "topics":seminarData.topics
            }),
            
            
        })
        const final_res= await res.json()
        return final_res;
    }catch(err){
        console.log(err)
        //the api returns a Response type, so we need to return a Response type for consistency
        return new Response(JSON.stringify({res:"error during scheduling seminar"}));
    }
    
 
     
   
}
