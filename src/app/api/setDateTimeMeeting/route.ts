
import { call_nodemailer_for_meeting_confirmation } from "@/app/(utils)/call_nodemailer_for_meeting_confirmation/call_nodemailer_for_meeting_confirmation";
import MeetingRequests from "@/app/models/meeting_requests";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const {id,date_time}= await request.json()
 
  const _id= new mongoose.Types.ObjectId(id)
 
  if(!date_time){
    return NextResponse.json({ message: "Must Provide Date-time!!" }, { status: 404 });}
    
  
  try{
    
  const res= await MeetingRequests.updateOne({_id:_id},{$set:{Scheduled_time:date_time}});
  const meeting_data=await MeetingRequests.findOne({_id:_id})
  call_nodemailer_for_meeting_confirmation(meeting_data.student_email,date_time,meeting_data.expert_full_name)
  if(!res){
    console.log("No data found")
    return NextResponse.json({ message: "Failed to set date_time" }, { status: 404 });}
  else{
    console.log("Date-time Set Successful")
    return NextResponse.json({ message: "Date-time Set Successful", data: res }, { status: 200 });
  }

  }catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
 
  

      
}
