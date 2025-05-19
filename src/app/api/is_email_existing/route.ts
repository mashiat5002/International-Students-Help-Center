import { connectToDatabase } from "@/app/(utils)/connect_mongodb/route";
import User from "@/app/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try{
        const body= await request.json();

    const email= body.email;
   
  
    await connectToDatabase()
    const result= await User.findOne({email:email,active_status:"active"})
    if(result== null){
        return NextResponse.json({"status":"You are not registered. Please register with your email first."})
    }else{
        return NextResponse.json({"status":"email found"})

    }
    }catch(err){
        return NextResponse.json({"status":err})

    }

}