interface UserProfile {
  full_name: string;
  email: string;
  institution?: string;
  country?: string;
  preferred_field_of_study?: string;
  preferred_level_of_study?: string;
  bio?: string;
  enable_email: boolean;
}

export async function call_push_edited_profile(info:UserProfile) {
    
    const res= await fetch(`${process.env.NEXT_PUBLIC_Base_Url}/api/push_edited_profile`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({"info":info})
    
        
    })
    const final_res= await res.json()
    return final_res.res;
   
}
