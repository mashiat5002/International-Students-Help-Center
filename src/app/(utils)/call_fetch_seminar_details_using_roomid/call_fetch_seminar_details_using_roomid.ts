
export async function call_fetch_seminar_details_using_roomid(roomId:string) {
    
   
    const res= await fetch(`${process.env.NEXT_PUBLIC_Base_Url}/api/fetch_seminar_details_using_roomid`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        
        body:JSON.stringify({"roomId":roomId})
        
    })
   
    const final_res= await res.json()
    return final_res;
   
}
