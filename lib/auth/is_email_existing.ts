


export async function call_is_expert_email_existing(email:string) {
    
    const res= await fetch(`${process.env.NEXT_PUBLIC_Base_Url}/api/is_exper_email_existing`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({"email":email})
        
        
    })
    const final_res= await res.json()
   
    return final_res;
   
}
