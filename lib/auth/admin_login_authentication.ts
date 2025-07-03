


export async function call_admin_login_authentication(email:string,password:string) {
    
    const res= await fetch(`${process.env.NEXT_PUBLIC_Base_Url}/api/admin_login_authentication`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({"email":email,"password":password})
        
        
    })
    const final_res= await res.json()
   
    return final_res;
   
}
