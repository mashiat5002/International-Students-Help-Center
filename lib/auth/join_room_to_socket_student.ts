

export async function call_join_room_to_socket_student( roomId: string, socketId: string) {

    const res= await fetch(`${process.env.NEXT_PUBLIC_Base_Url}/api/join_room_to_socket_student`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          
            roomId: roomId,
            socketId: socketId
        })
    
        
    })
    const final_res= await res.json()
    return final_res.message;
   
}
