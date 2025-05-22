import Expert from "@/app/models/expert";
import { NextResponse } from "next/server";

export async function POST() {
  
  try{
  const res= await Expert.find({active_status:"active"}).select('-password');
  
 
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
