


export async function call_fetch_students_for_admin() {
    
    const res= await fetch(`${process.env.NEXT_PUBLIC_Base_Url}/api/fetch_students_for_admin`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
       
        
        
    })
    const final_res= await res.json()
   
    return final_res;
   
}
