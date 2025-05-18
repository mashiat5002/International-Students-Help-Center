


export async function call_fetch_logged_id_info() {
    
    const res= await fetch(`${process.env.NEXT_PUBLIC_Base_Url}/api/fetch_logged_id_info`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        
        
        
    })
    const final_res= await res.json()
    console.log("final_res")
    console.log(final_res)
    return final_res;
   
}
