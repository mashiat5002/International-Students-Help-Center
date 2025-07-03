export async function call_push_journey(object:any,email:string) {
    
    const res= await fetch(`${process.env.NEXT_PUBLIC_Base_Url}/api/push_journey`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({"object":object,"email":email})
    
        
    })
    const final_res= await res.json()
    return final_res.message;
   
}
