import { connectToDatabase } from "@/app/(utils)/connect_mongodb/connect_mongodb";
import User from "@/app/models/user";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
      const {email,status}=await request.json();
      
      
      await connectToDatabase()
    
      try{
        const res = await User.updateOne(
          { email: email },
          { $set: { status: status } }
        );
        console.log(res)
        return NextResponse.json({"res":"successfully updated details"})
      }catch(err){

        return NextResponse.json({"res":"could't not update details"})
      }
      
   
}
