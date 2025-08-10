import { connectToDatabase } from "@/app/(utils)/connect_mongodb/connect_mongodb";
import { decrypt } from "@/app/(utils)/jwt_encrypt_decrypt";
import User from "@/app/models/user";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    try{
       
        await connectToDatabase()



      // fetching email of logged in user
            const session = cookies().get("expert-session")?.value;
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
              expires: string;
              Password: string;
              iat: number;
              exp: number;
            };
            // getting more details of the user from the database
            var final_details= await User.find({email: details.Email},{ email: 1, _id:0, full_name: 1 })

            console.log("Final details:", final_details);

    if(final_details== null){
        return NextResponse.json({"status":"You are not logged in"})
    }

  


    
     const response = await fetch("https://ishc-socket-io-server-1.onrender.com/join", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Optional: secure with a token
    },
    body: JSON.stringify({roomId: body.roomId, user_name: final_details[0].full_name, socketId: body.socketId}),
  });
  console.log(response)

  return NextResponse.json({"status":"Message sent successfully"})


    }catch(err){
        return NextResponse.json({"status":err})

    }

}