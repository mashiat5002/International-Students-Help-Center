
import { call_fetch_logged_id_info } from "@/app/(utils)/call_fetch_logged_id_info/route";
import MeetingRequests from "@/app/models/meeting_requests";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const details= await request.json();

     try{
      const studentDetails= call_fetch_logged_id_info()
      console.log(studentDetails)
       const newMeetingReq = new MeetingRequests(details);
       console.log("newMeetingReq");
       await newMeetingReq.save();
       console.log(newMeetingReq);

       return NextResponse.json({"res":"Request Sent Successfully"});
      }catch (error) {
        console.log(error)
       return NextResponse.json({"res":"Request Count not be sent"});

     }
   
}
