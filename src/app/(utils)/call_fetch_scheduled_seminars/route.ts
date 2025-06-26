
export async function call_fetch_scheduled_seminars() {
    
   
    const res= await fetch(`${process.env.NEXT_PUBLIC_Base_Url}/api/fetch_scheduled_seminars`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
       
        
        
    })
    const final_res= await res.json()
    return final_res;
   
}
