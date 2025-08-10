import { connectToDatabase } from "@/app/(utils)/connect_mongodb/connect_mongodb";
import { decrypt } from "@/app/(utils)/jwt_encrypt_decrypt";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    console.log("POST request received at /api/send_msg_through_socket");
    const body = await request.json();
    console.log("POST request received at /api/send_msg_through_socket",body.message, body.roomId);
    try{
       
        await connectToDatabase()



      // fetching email of logged in user
            const session = cookies().get("student-session")?.value;
            if (!session) {
              console.log("Session not found");
              return NextResponse.json(
                { message: "Session not found" },
                { status: 404 }
              );
            }
      
      
            // decrypting the session to get user details cannot be done in the server side as it is not secure
            const details = (await decrypt(session)) as {
              Email: string;
              full_name:string;
              expires: string;
              Password: string;
              iat: number;
              exp: number;
            };

    const detailed_Message ={
      name: details.full_name,
      message: body.message,
    }
 
    
    
    
     const response = await fetch("https://ishc-socketio-server-production.up.railway.app/emit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Optional: secure with a token
    },
    body: JSON.stringify({roomId: body.roomId, detailed_Message: detailed_Message }),
  });
  console.log(response)

  return NextResponse.json({"status":"Message sent successfully"})


    }catch(err){
        return NextResponse.json({"status":err})

    }

}