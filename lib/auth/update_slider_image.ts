


export async function call_update_slider_image(img:string,img_name:string,_id:string) {
    
    const res= await fetch(`${process.env.NEXT_PUBLIC_Base_Url}/api/update_slider_image`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({"img":img,"img_name":img_name,"_id":_id})
        
        
    })
    const final_res= await res.json()
   
    return final_res;
   
}
