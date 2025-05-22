import { connectToDatabase } from "@/app/(utils)/connect_mongodb/route";
import ScheduledSeminars from "@/app/models/scheduled_seminars";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

  try{
    const {seminarTopic,date_time,seminarDuration,maxParticipants,expert_id} = await request.json();
    

    const d_t = new Date(date_time);
   
    if(seminarTopic==""){
     return NextResponse.json({ message: "Must Provide Seminar Topic" }, { status: 500 });}
    else if(seminarDuration==""){
     return NextResponse.json({ message: "Must Provide Seminar Duration" }, { status: 500 });}
    else if(maxParticipants==""){
     return NextResponse.json({ message: "Must Provide Max Participants Allowed" }, { status: 500 });}
    else if(!(!isNaN(d_t.getTime()))){
     return NextResponse.json({ message: "Must Provide Valid Date-time" }, { status: 500 });}
    else if(!(/^\d+$/.test(seminarDuration))){
      return NextResponse.json({ message: "Must Provide a Valid Seminar Duration" }, { status: 500 });
    }
    else if(parseInt(seminarDuration) < 1){
      return NextResponse.json({ message: "Seminar Duration must be at least 1" }, { status: 500 });
    }
    else if(!(/^\d+$/.test(maxParticipants))){
      return NextResponse.json({ message: "Must Provide a Valid Max Participants Allowed" }, { status: 500 });
    }
    else if(parseInt(maxParticipants) < 1){
      return NextResponse.json({ message: "Max Participants must be at least 1" }, { status: 500 });
    }

    
    await connectToDatabase()
    const newScheduledSeminars = new ScheduledSeminars({
      expert_id: expert_id,
      meeting_topic: seminarTopic,
      Scheduled_time: date_time,
      max_Participants: maxParticipants,
      duration: seminarDuration,
    });
          const saved = await newScheduledSeminars.save();
  
          if (saved && saved._id) {
            console.log("✅ ScheduledSeminars saved successfully:", saved);
            return NextResponse.json({ message: "ScheduledSeminars saved successfully", id: saved._id });
          } else {
            console.log("⚠️ Failed to save ScheduledSeminars.");
            return NextResponse.json({ message: "Failed to save ScheduledSeminars" }, { status: 500 });
          }

  }catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
 
  

      
}
