
import MeetingRequests from "@/app/models/meeting_requests";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const {id}= await request.json()
  
  const _id= new mongoose.Types.ObjectId(id)
  
  try{
    
  const res= await MeetingRequests.updateOne({_id:_id},{$set:{Scheduled_time:"declined"}});
  
  if(!res){
    console.log("No data found")
    return NextResponse.json({ message: "Failed to Declined the meeting" }, { status: 404 });}
  else{
    console.log("Declined the meeting successfully")
    return NextResponse.json({ message: "Declined the meeting successfully", data: res }, { status: 200 });
  }

  }catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
 
  

      
}
