export async function call_fetch_slider_images() {
    
    const res= await fetch(`${process.env.NEXT_PUBLIC_Base_Url}/api/fetch_slider_images`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        
        
        
    })
    const final_res= await res.json()
    return final_res;
   
}
