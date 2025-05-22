import { call_fetch_expert_logged_id_info } from "../call_fetch_expert_logged_id_info/route";


export async function call_schedule_seminar(seminarTopic:string,selected:Date,seminarDuration:string,maxParticipants:string) {
   
    try{
        const expert_id= await call_fetch_expert_logged_id_info()
      

        const res= await fetch(`${process.env.NEXT_PUBLIC_Base_Url}/api/schedule_seminar`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "seminarTopic":seminarTopic,
                "date_time":selected,
                "seminarDuration":seminarDuration,
                "maxParticipants":maxParticipants,
                "expert_id":expert_id._id
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
