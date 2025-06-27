
export async function call_fetch_meeting_requests_for_student() {
    
   
    const res= await fetch(`${process.env.NEXT_PUBLIC_Base_Url}/api/fetch_meeting_requests_for_student`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        
        
        
    })
    const final_res= await res.json()
    return final_res;
   
}
