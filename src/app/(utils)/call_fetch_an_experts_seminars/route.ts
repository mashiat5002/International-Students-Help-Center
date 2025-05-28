import { call_fetch_logged_id_info } from "../call_fetch_logged_id_info/route";

export async function call_fetch_an_experts_seminars(id:string) {
   
    const loginDetails= await call_fetch_logged_id_info()
    const res= await fetch(`${process.env.NEXT_PUBLIC_Base_Url}/api/fetch_an_experts_seminars`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({"expert_id":id,"email":loginDetails.email})
        
        
        
    })
    const final_res= await res.json()
    return final_res;
   
}
