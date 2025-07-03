
import Journey from "@/app/models/journey";
import MeetingRequests from "@/app/models/meeting_requests";
import User from "@/app/models/user";
import { NextResponse } from "next/server";

export async function POST() {

  try{
    


const student_info = await User.find({});
const journey_info = await Journey.find({});

const final_array = student_info.map((student) => {
  return {
    name: student.full_name,
    email: student.email,
    img: student.img,
    journeys: journey_info.filter(
      (journey) => journey.id.toString() === student.email.toString()
    ).length,
    status: student.status,
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
