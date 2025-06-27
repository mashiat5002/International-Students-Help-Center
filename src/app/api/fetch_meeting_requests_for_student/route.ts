import { decrypt } from "@/app/(utils)/jwt_encrypt_decrypt";
import Expert from "@/app/models/expert";
import Journey from "@/app/models/journey";
import MeetingRequests from "@/app/models/meeting_requests";
import User from "@/app/models/user";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
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
  var result= await User.find({email: details.Email},{ email: 1, _id:0 })
  
  const res= await MeetingRequests.find({student_email:result[0].email});

   const final_res = res.map((item) => {
  const startTime = new Date(item.Scheduled_time);

  let status = '';
  if(item.Scheduled_time=="Not Scheduled"){
    status="Not Scheduled"
  }
   else if (now < startTime) {
    status = 'upcoming';
  }
   else if (now > startTime) {
    status = 'ongoing';
  }

  return {
    ...item.toObject(),
    status,
  };
});



// combining expert details with meeting requests details
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
