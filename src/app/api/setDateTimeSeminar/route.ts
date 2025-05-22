
import ScheduledSeminars from "@/app/models/scheduled_seminars";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const {id,date_time}= await request.json()
  
  const _id= new mongoose.Types.ObjectId(id)
  console.log(_id)
  if(!date_time){
    return NextResponse.json({ message: "Must Provide Date-time!!" }, { status: 404 });}
    
  
  try{
    
  const res= await ScheduledSeminars.updateOne({_id:_id},{$set:{Scheduled_time:date_time}});
  
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
