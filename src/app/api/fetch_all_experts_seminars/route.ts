import { decrypt } from "@/app/(utils)/jwt_encrypt_decrypt";
import Expert from "@/app/models/expert";
import ScheduledSeminars from "@/app/models/scheduled_seminars";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
type ParticipantsDetails = {
    email: string,
    name: string,
    motive: string
}
export async function POST(request: Request) {
  const now = new Date();
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

    isregistered: item.participants.some((p: ParticipantsDetails) => p.email === details.Email),
    status,
  };
});

   const combined = await Promise.all(
  final_res.map(async (item, idx) => {
    const expert = await Expert.find(
      { _id: item.expert_id },
      {
        full_name: 1,
        _id: 0,
        img: 1,
        about: 1,
        institution: 1,
        email: 1,
        profession: 1,
      }
    );

    return {
      ...item,
      expert_full_name: expert[0]?.full_name || "Unknown Expert",
      expert_img: expert[0]?.img || "",
      expert_about: expert[0]?.about || "",
      expert_institution: expert[0]?.institution || "",
      expert_email: expert[0]?.email || "",
      expert_profession: expert[0]?.profession || "",
    };
  })
);
 
  if(!res){
    console.log("No data found")
    return NextResponse.json({ message: "No data found" }, { status: 404 });}
  else{
    console.log("Data fetched successfully")
    return NextResponse.json({ message: "Data fetched successfully", data: combined }, { status: 200 });
  }

  }catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
 
  

      
}
