import { decrypt } from "@/app/(utils)/jwt_encrypt_decrypt";
import ScheduledSeminars from "@/app/models/scheduled_seminars";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { seminarID, purpose } = await request.json();


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
                full_name: string;
                Email: string;
                expires: string;
                Password: string;
                iat: number;
                exp: number;
              };



    
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
      "participants.email": { $ne: details.Email },
      status: {  $nin: ["cancelled", "ended", "completed"]},
      

    },
        {
            $push: {
                participants: {
                    name: details.full_name,
                    email: details.Email,
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