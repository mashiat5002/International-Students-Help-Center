
import { decrypt } from "@/app/(utils)/jwt_encrypt_decrypt";
import Application_Links from "@/app/models/application_links";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {

  try{

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
  const res= await Application_Links.find({student_email:details.Email});
  if(!res){
    console.log("No data found")
    return NextResponse.json({ message: "No data found" }, { status: 404 });}
  else{
    console.log("Data fetched successfully")
    return NextResponse.json({ message: "Data fetched successfully", data: res }, { status: 200 });
  }

  }catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
 
  

      
}
