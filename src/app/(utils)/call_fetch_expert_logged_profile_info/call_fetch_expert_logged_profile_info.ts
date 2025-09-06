


export async function call_fetch_expert_logged_profile_info() {
    
    const res= await fetch(`${process.env.NEXT_PUBLIC_Base_Url}/api/fetch_expert_logged_profile_info`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
            // 'X-Caller-Path': window.location.pathname
        },
        
        
        
    })
    const final_res= await res.json()
   
    return final_res.data[0];
   
}
