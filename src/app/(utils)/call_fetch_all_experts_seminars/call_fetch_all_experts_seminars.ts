
export async function call_fetch_all_experts_seminars() {

   
    const res= await fetch(`${process.env.NEXT_PUBLIC_Base_Url}/api/fetch_all_experts_seminars`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        
        
        
    })
    const final_res= await res.json()
    return final_res;
   
}
