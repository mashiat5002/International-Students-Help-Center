export async function call_logout() {
    
    const res= await fetch("../../api/logout",{  
        method:"POST",

    })
    const final_res= await res.json()
    console.log(final_res)
    return final_res;
   
}
