


export async function call_update_student_block_status(email:string,status:string) {
    
    const res= await fetch(`${process.env.NEXT_PUBLIC_Base_Url}/api/update_student_block_status`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({"email":email,"status":status})
        
        
    })
    const final_res= await res.json()
   
    return final_res;
   
}
