import { connectToDatabase } from "@/app/(utils)/connect_mongodb/route";
import Expert from "@/app/models/expert";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
      const {email,status}=await request.json();
      
      
      await connectToDatabase()
    
      try{
        const res = await Expert.updateOne(
          { email: email },
          { $set: { status: status } }
        );
        console.log(res)
        return NextResponse.json({"res":"successfully updated details"})
      }catch(err){

        return NextResponse.json({"res":"could't not update details"})
      }
      
   
}
