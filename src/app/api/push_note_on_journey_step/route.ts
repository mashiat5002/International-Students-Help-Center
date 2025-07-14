import Journey from "@/app/models/journey";
import MeetingRequests from "@/app/models/meeting_requests";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
  const body= await request.json()
  try{
   
  const resp= await MeetingRequests.find({_id: body.roomId,},{journey_id:1});
  

  

    const res=await Journey.updateOne(
      { _id: resp[0].journey_id },
      { $set: { [`steps.${body.idx}.note`]: body.noteInput } }  // dynamically set the path
    );



  if(!res){
    console.log("No data found")
    return NextResponse.json({ message: "No data found" }, { status: 404 });}
  else{
    console.log("Data pushed successfully")
    return NextResponse.json({ message: "Data pushed successfully", data: res }, { status: 200 });
  }

  }catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
 
  

      
}
