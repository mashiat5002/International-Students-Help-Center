export async function call_fetch_journey_db(user_id:string) {
    
    const res= await fetch(`${process.env.NEXT_PUBLIC_Base_Url}/api/fetch_journey_db`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({"user_id":user_id})
        
        
    })
    const final_res= await res.json()
    return final_res;
   
}
