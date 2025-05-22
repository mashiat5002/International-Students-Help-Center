import { call_fetch_expert_logged_id_info } from "../call_fetch_expert_logged_id_info/route";

export async function call_fetch_scheduled_seminars() {
    const info= await call_fetch_expert_logged_id_info();
   
    const res= await fetch(`${process.env.NEXT_PUBLIC_Base_Url}/api/fetch_scheduled_seminars`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({"expert_id":info._id})
        
        
    })
    const final_res= await res.json()
    return final_res;
   
}
