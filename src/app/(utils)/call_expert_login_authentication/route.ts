export async function call_expert_login_authentication(email:string,password:string) {
    
    const res= await fetch("../../api/expert_login_authentication",{  
        method:"POST",
        body:JSON.stringify({
            email:email,
            password:password
        })

    })
    const final_res= await res.json()
    console.log(final_res)
    return final_res;
   
}
