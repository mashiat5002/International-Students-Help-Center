import { connectToDatabase } from "@/app/(utils)/connect_mongodb/connect_mongodb";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    try{
       
        await connectToDatabase()


    
     const response = await fetch("https://ishc-socketio-server-production.up.railway.app/send-note", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Optional: secure with a token
    },
    body: JSON.stringify({roomId: body.roomId, message: body.message }),
  });
  console.log(response)

  return NextResponse.json({"status":"Message sent successfully"})


    }catch(err){
        return NextResponse.json({"status":err})

    }

}