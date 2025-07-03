import { connectToDatabase } from "@/app/(utils)/connect_mongodb/connect_mongodb";
import Expert from "@/app/models/expert";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
      const {id,details,email}=await request.json();
      if(details.about.length>100){
        return NextResponse.json({"res":"About Section Can't be more than 100 chars long!!"})

      }
      
      await connectToDatabase()
      console.log(id)
      console.log(details)
      try{
        const res = await Expert.replaceOne(
          { _id: id },
          {...details,_id:id,email:email,active_status:"active"}
        );
        console.log(res)
        return NextResponse.json({"res":"successfully updated details"})
      }catch(err){

        return NextResponse.json({"res":"could't not update details"})
      }
      
   
}
