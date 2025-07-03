export async function call_fetch_student_profile_info() {
    
    const res= await fetch(`${process.env.NEXT_PUBLIC_Base_Url}/api/fetch_student_profile_info`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        
        
        
    })
    const final_res= await res.json()
    return final_res;
   
}
