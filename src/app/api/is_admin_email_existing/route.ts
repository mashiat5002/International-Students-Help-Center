import { connectToDatabase } from "@/app/(utils)/connect_mongodb/route";
import Admin from "@/app/models/admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try{
        const body= await request.json();
       

    const email= body.email;
   
  
    await connectToDatabase()
 

    const result= await Admin.findOne({email:email})
    console.log(result)
    console.log(result== null)
    if(result== null){
        return NextResponse.json({"status":"You are not registered. Please register with your email first."})
    }else{
        return NextResponse.json({"status":"email found"})

    }
    }catch(err){
        console.log(err)
        return NextResponse.json({"status":err})

    }

}