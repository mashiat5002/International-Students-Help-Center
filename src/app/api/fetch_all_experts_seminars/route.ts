import ScheduledSeminars from "@/app/models/scheduled_seminars";
import { NextResponse } from "next/server";
type ParticipantsDetails = {
    email: string,
    name: string,
    motive: string
}
export async function POST(request: Request) {
  const now = new Date();
  const {email}= await request.json()
  try{
  const res= await ScheduledSeminars.find({});
  const final_res = res.map((item) => {
  const startTime = new Date(item.Scheduled_time);
  const endTime = new Date(startTime.getTime() + parseInt(item.duration) * 60000);

  let status = 'upcoming';
  if(item.status=="cancelled"){
    status="cancelled"
  }
  else if (now > endTime) {
    status = 'ended';
  } else if (now >= startTime && now <= endTime) {
    status = 'ongoing';
  }

  return {
    ...item.toObject(),
    isregistered: item.participants.some((p: ParticipantsDetails) => p.email === email),
    status,
  };
});

  console.log(final_res)
 
  if(!res){
    console.log("No data found")
    return NextResponse.json({ message: "No data found" }, { status: 404 });}
  else{
    console.log("Data fetched successfully")
    return NextResponse.json({ message: "Data fetched successfully", data: final_res }, { status: 200 });
  }

  }catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
 
  

      
}
