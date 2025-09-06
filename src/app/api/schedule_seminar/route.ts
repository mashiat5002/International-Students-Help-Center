import { connectToDatabase } from "@/app/(utils)/connect_mongodb/connect_mongodb";
import { decrypt } from "@/app/(utils)/jwt_encrypt_decrypt";
import ScheduledSeminars from "@/app/models/scheduled_seminars";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

  try{
    
        const  session=  cookies().get("expert-session")?.value;
        
        if(!session){
          console.log("Session not found")
          return NextResponse.json({ message: "Session not found" }, { status: 404 });
        }
        
        
        const details = (await decrypt(session)) as {
        id: string;
        Email: string;
        expires: string;
        full_name: string;
        img: string;
        Password: string;
        iat: number;
        exp: number;
      };
















    const {seminarTopic,date_time,seminarDuration,maxParticipants,topics,description} = await request.json();
    
    console.log(description.length)
    console.log(seminarTopic.length)
    const d_t = new Date(date_time);
   
    if(seminarTopic==""){
     return NextResponse.json({ message: "Must Provide Seminar Topic" }, { status: 500 });}
     else if(seminarTopic.length>100){
      return NextResponse.json({ message: "Must Not Cross Character limit in Topic" }, { status: 500 });}
    else if(description==""){
     return NextResponse.json({ message: "Must Provide Seminar description" }, { status: 500 });}
    else if(description.length>250){
     return NextResponse.json({ message: "Must Not Cross Character limit in description" }, { status: 500 });}
    else if(topics.length<1 ){
     return NextResponse.json({ message: "Must Provide at least one topic" }, { status: 500 });}
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
      expert_id: details.id,
      speaker: details.full_name,
      meeting_topic: seminarTopic,
      description: description,
      Scheduled_time: date_time,
      max_Participants: maxParticipants,
      duration: seminarDuration,
      topics: topics,
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
