import ScheduledSeminars from "@/app/models/scheduled_seminars";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body= await request.json()
  
  try{
  const res= await ScheduledSeminars.find({_id:body.roomId},{status:0,expert_id:0});

        return NextResponse.json({ message: "Data fetched successfully", data: res }, { status: 200 });


  }catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
 
  

      
}
