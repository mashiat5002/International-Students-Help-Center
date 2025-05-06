import { connectToDatabase } from "@/app/(utils)/connect_mongodb/route";
import Journey from "@/app/models/journey";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

  try{
    const body = await request.json();
    const object = typeof body.object === "string" ? JSON.parse(body.object) : body.object
    
    await connectToDatabase()
    const newJourney= new Journey({
      id: object.id,
      title: object.title,
      description: object.description,
      totalSteps: object.totalSteps,
      currentStep: 0,
      lastUpdated: new Date(),
      institution: object.institution,
      program: object.program,
      deadline: object.deadline,
      steps: object.steps.map((step: any) => ({
        description: step.description,
        title: step.title,
        status: 'not-started'
      }))
          })
          const saved = await newJourney.save();
  
          if (saved && saved._id) {
            console.log("✅ Journey saved successfully:", saved);
            return NextResponse.json({ message: "Journey saved successfully", id: saved._id });
          } else {
            console.log("⚠️ Failed to save journey.");
            return NextResponse.json({ message: "Failed to save journey" }, { status: 500 });
          }

  }catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
 
  

      
}
