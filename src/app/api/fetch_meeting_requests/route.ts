import MeetingRequests from "@/app/models/meeting_requests";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body= await request.json();
  console.log(body.expert_id)
  try{
  const res= await MeetingRequests.find({expert_id:body.expert_id});
 
  if(!res){
    console.log("No data found")
    return NextResponse.json({ message: "No data found" }, { status: 404 });}
  else{
    console.log("Data fetched successfully")
    return NextResponse.json({ message: "Data fetched successfully", data: res }, { status: 200 });
  }

  }catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
 
  

      
}
