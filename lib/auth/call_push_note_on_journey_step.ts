


export async function call_push_note_on_journey_step(roomId:string,idx:string | undefined, noteInput:string) {
    
    const res= await fetch(`${process.env.NEXT_PUBLIC_Base_Url}/api/push_note_on_journey_step`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({"roomId":roomId,"idx":idx,"noteInput":noteInput})
       
        
        
    })
    const final_res= await res.json()
   
    return final_res;
   
}
