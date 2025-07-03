
import { connectToDatabase } from "@/app/(utils)/connect_mongodb/connect_mongodb";
import { decrypt } from "@/app/(utils)/jwt_encrypt_decrypt";
import MeetingRequests from "@/app/models/meeting_requests";
import User from "@/app/models/user";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body= await request.json();
  const MeetingRequestDetails= body.MeetingRequestDetails;
  const jouney_id= body.jouney_id;
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



      // fetching email of logged in user
            const session = cookies().get("student-session")?.value;
            if (!session) {
              console.log("Session not found");
              return NextResponse.json(
                { message: "Session not found" },
                { status: 404 }
              );
            }
      
      
            // decrypting the session to get user details cannot be done in the server side as it is not secure
            const details = (await decrypt(session)) as {
              Email: string;
              expires: string;
              Password: string;
              iat: number;
              exp: number;
            };
            // getting more details of the user from the database
            var final_details= await User.find({email: details.Email},{ email: 1, _id:0, full_name: 1 })
         
       var   newMeetingReq = new MeetingRequests(
        {...MeetingRequestDetails,
          journey_id:jouney_id
        ,student_full_name: final_details[0].full_name,
         student_email: final_details[0].email});
      
       
       const result=await newMeetingReq.save();
       console.log("result")
       console.log(result)
       

       return NextResponse.json({"res":"Request Sent Successfully"});
      }catch (error) {
        console.log(error)
       return NextResponse.json({"res":"Request Count not be sent"});

     }
   
}
