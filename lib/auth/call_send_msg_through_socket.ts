

export async function call_send_msg_through_socket(message: string, roomId: string) {

    const res= await fetch(`${process.env.NEXT_PUBLIC_Base_Url}/api/send_msg_through_socket`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: message,
            roomId: roomId
        })
    
        
    })
    const final_res= await res.json()
    return final_res.message;
   
}
