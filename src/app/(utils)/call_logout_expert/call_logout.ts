export async function call_logout_expert() {
    
    const res= await fetch("../../api/logout_expert",{  
        method:"POST",

    })
    const final_res= await res.json()
    console.log(final_res)
    return final_res;
   
}
