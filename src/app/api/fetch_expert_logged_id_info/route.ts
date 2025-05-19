
import { decrypt } from "@/app/(utils)/jwt_encrypt_decrypt";
import Expert from "@/app/models/expert";
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
    Email: string;
    expires: string;
    Password: string;
    iat: number;
    exp: number;
  };
    // const extracted_details= JSON.parse(details.toString());
    
  

    var result;

    
 
    result= await Expert.find({email: details.Email},{ email: 1, _id:0, full_name: 1});
    
   
  if(!result){
    console.log("No data found")
    return NextResponse.json({ message: "No data found" }, { status: 404 });}
  else{
    console.log("Data fetched successfully")
    return NextResponse.json({ message: "Data fetched successfully", data: result }, { status: 200 });
  }

  }catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
 
  

      
}
