import { call_fetch_expert_logged_id_info } from "../call_fetch_expert_logged_id_info/route"

type details={
 
  email: string,
  full_name: string,
  about: string,
  img: string,
  social_media_link: string,
  profession: string,
  institution: string,
  country: string

}

export async function call_update_expert_profile_info(details:details) {
    const logged_info= await call_fetch_expert_logged_id_info()
    console.log(logged_info)
    
    const res= await fetch(`${process.env.NEXT_PUBLIC_Base_Url}/api/update_expert_profile_info`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({"id":logged_info._id,"details":details,"email":logged_info.email})
        
        
    })
    const final_res= await res.json()

    return final_res.res;
   
}
