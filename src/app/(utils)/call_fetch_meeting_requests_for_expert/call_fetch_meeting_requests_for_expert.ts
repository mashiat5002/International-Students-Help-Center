
export async function call_fetch_meeting_requests_for_expert() {
    
   
    const res= await fetch(`${process.env.NEXT_PUBLIC_Base_Url}/api/fetch_meeting_requests_for_expert`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        
        
        
    })
    const final_res= await res.json()
    return final_res;
   
}
