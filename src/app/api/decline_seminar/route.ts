
import ScheduledSeminars from "@/app/models/scheduled_seminars";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const {id}= await request.json()
  
  const _id= new mongoose.Types.ObjectId(id)
  
  try{
    
  const res= await ScheduledSeminars.updateOne({_id:_id},{$set:{status:"cancelled"}});
  
  if(!res){
    console.log("No data found")
    return NextResponse.json({ message: "Failed to Declined the seminar" }, { status: 404 });}
  else{
    console.log("Declined the seminar successfully")
    return NextResponse.json({ message: "Declined the seminar successfully", data: res }, { status: 200 });
  }

  }catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
 
  

      
}
