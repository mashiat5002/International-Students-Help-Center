
import Expert from "@/app/models/expert";
import MeetingRequests from "@/app/models/meeting_requests";
import { NextResponse } from "next/server";

export async function POST() {

  try{
    


const expert_info = await Expert.find({});
const meeting_info = await MeetingRequests.find({});

const final_array = expert_info.map((expert) => {
  return {
    name: expert.full_name,
    email: expert.email,
    img: expert.img,
    meetings: meeting_info.filter(
      (meeting) => meeting.expert_id.toString() === expert._id.toString()
    ).length,
    status: expert.status,
  };
});





  if(!final_array){
    console.log("No data found")
    return NextResponse.json({ message: "No data found" }, { status: 404 });}
  else{
    console.log("Data fetched successfully")
    return NextResponse.json({ message: "Data fetched successfully", data: final_array }, { status: 200 });
  }

  }catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
 
  

      
}
