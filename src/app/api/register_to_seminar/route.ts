import ScheduledSeminars from "@/app/models/scheduled_seminars";
import { NextResponse } from "next/server";
interface ParticipantsDetails  {
    email: string,
    name: string,
    motive: string
}
export async function POST(request: Request) {
    const {participantName,participantEmail,seminarID,purpose} = await request.json();
    if (!purpose) {
        return NextResponse.json({ message: "Must Provide Purpose!!!" }, { status: 404 });}
  try {

    const seminar = await ScheduledSeminars.findById(seminarID);

    if (!seminar) {
      throw new Error("Seminar not found");
    }
    
   
    const now= new Date()
  
    const res = await ScheduledSeminars.findOneAndUpdate(
      {
      _id:seminarID,
      Scheduled_time: { $gt: now },
      registed_participants: { $lt: parseInt(seminar.max_Participants) },
      "participants.email": { $ne: participantEmail },
      status: {  $nin: ["cancelled", "ended", "completed"]},
      

    },
        {
            $push: {
                participants: {
                    name: participantName,
                    email: participantEmail,
                    motive: purpose
                },
            },
            $inc: { registed_participants: 1 }
        }, 
        { new: true, runValidators: true
        });

        
    if (!res) {
      return NextResponse.json({ message: "Couldn't Register!!!" }, { status: 404 });
    } else {
      console.log("Registered Successfully");
      return NextResponse.json({ message: "Registered Successfully", data: res }, { status: 200 });
    }

  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}