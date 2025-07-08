

export async function call_join_room_to_socket( roomId: string, socketId: string) {

    const res= await fetch(`${process.env.NEXT_PUBLIC_Base_Url}/api/join_room_to_socket`,{
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
