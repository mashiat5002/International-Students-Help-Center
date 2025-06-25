export async function call_push_application_links(object:any) {
    
    const res= await fetch(`${process.env.NEXT_PUBLIC_Base_Url}/api/push_application_links`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({"object":object})
        
        
    })
    const final_res= await res.json()
    return final_res.message;
   
}
