import Journey from "@/app/models/journey";
import MeetingRequests from "@/app/models/meeting_requests";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
  const body= await request.json()
  try{
     


  const resp= await MeetingRequests.find({_id: body.roomId,},{journey_id:1,Institution:1,fieldOfStudy:1,ApplyingOn:1,meeting_topic:1,Scheduled_time:1});
  const res= await Journey.find({_id: resp[0].journey_id},{steps:1});
  if(!res){
    console.log("No data found")
    return NextResponse.json({ message: "No data found" }, { status: 404 });}
  else{
    console.log("Data fetched successfully")
    return NextResponse.json({ message: "Data fetched successfully", data: res , data2: resp}, { status: 200 });
  }

  }catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
 
  

      
}
