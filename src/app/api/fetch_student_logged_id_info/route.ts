
import { decrypt } from "@/app/(utils)/jwt_encrypt_decrypt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {

  try{
    
    const session=  cookies().get("student-session")?.value;
    if(!session){
      console.log("Session not found")
      return NextResponse.json({ message: "Session not found" }, { status: 404 });
    }
    const details = (await decrypt(session)) as {
    Email: string;
    full_name: string;
    id: string;
    img: string;
    expires: string;
    iat: number;
    exp: number;
  };
   
  
  // var result= await User.find({email: details.Email},{img:1, email: 1, _id:1, full_name: 1 });
   
   
   
  if(!details){
    console.log("No data found")
    return NextResponse.json({ message: "No data found" }, { status: 404 });}
  else{
    return NextResponse.json({ message: "Data fetched successfully", data: details }, { status: 200 });
  }

  }catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
 
  

      
}
