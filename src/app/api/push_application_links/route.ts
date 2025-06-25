import { connectToDatabase } from "@/app/(utils)/connect_mongodb/route";
import Application_Links from "@/app/models/application_links";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

  try{
    const body = await request.json();
    const object = typeof body.object === "string" ? JSON.parse(body.object) : body.object
    
    await connectToDatabase()
    const newApplication_Links= new Application_Links(object)
          const saved = await newApplication_Links.save();
  
          if (saved && saved._id) {
            console.log("✅ Application_Links saved successfully:", saved);
            return NextResponse.json({ message: "Application_Links saved successfully", id: saved._id });
          } else {
            console.log("⚠️ Failed to save Application_Links.");
            return NextResponse.json({ message: "Failed to save Application_Links" }, { status: 500 });
          }

  }catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
 
  

      
}
