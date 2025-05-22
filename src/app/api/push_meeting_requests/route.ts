
import { connectToDatabase } from "@/app/(utils)/connect_mongodb/route";
import MeetingRequests from "@/app/models/meeting_requests";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body= await request.json();
  const MeetingRequestDetails= body.MeetingRequestDetails;
  const studentDetails= body.studentDetails;
  console.log("MeetingRequestDetails.expert_i");
  console.log(MeetingRequestDetails.expert_id);
  if(MeetingRequestDetails.expert_id==""){
    return NextResponse.json({"res":"Must Select an Expert who will conduct the meeting!!"});
  }else if(MeetingRequestDetails.meeting_topic==""){
    return NextResponse.json({"res":"Must provide meeting topic !!"});
  }else if(MeetingRequestDetails.ApplyingOn==""){
    return NextResponse.json({"res":"Must select where you are applying on !!"});
  }else if(MeetingRequestDetails.fieldOfStudy==""){
    return NextResponse.json({"res":"Must select your intended field of study !!"});
  }else if(MeetingRequestDetails.Institution==""){
    return NextResponse.json({"res":"Must select intended institution to study!!"});

  }
  
     try{
      
      await connectToDatabase()
       var   newMeetingReq = new MeetingRequests(
        {...MeetingRequestDetails
        ,student_full_name: studentDetails.full_name,
         student_email: studentDetails.email});
      
       
       const result=await newMeetingReq.save();
       console.log("result")
       console.log(result)
       

       return NextResponse.json({"res":"Request Sent Successfully"});
      }catch (error) {
        console.log(error)
       return NextResponse.json({"res":"Request Count not be sent"});

     }
   
}
