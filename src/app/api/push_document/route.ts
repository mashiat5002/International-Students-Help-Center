import { NextResponse } from "next/server";
import Journey from "@/app/models/journey";

export async function POST(request: Request) {
    const formData = await request.formData();
    const pdf= formData.get("pdf");
    if (!pdf) {
        throw new Error('No file uploaded');
        }
    const journey_id= formData.get("journey_id");
    const stepNoRaw = formData.get('step_no');
    if (stepNoRaw === null) throw new Error('step_no is missing');
    if (stepNoRaw instanceof File) throw new Error('step_no cannot be a file');
    const stepNoStr = stepNoRaw.toString();
    const stepNo = Number(stepNoStr);
    if (isNaN(stepNo)) throw new Error('step_no is not a valid number');
    console.log("{ pdf, journey_id, stepNo }");
    console.log({ pdf, journey_id, stepNo });
    if (!(pdf instanceof File)) {
        throw new Error('Uploaded pdf is not a file');
        }

    const arrayBuffer = await pdf.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
  try {
    const now= new Date();
    const journey = await Journey.findOne({_id: journey_id});
    if (!journey) throw new Error('Journey not found');
    journey.steps[stepNo].document = buffer;
    journey.steps[stepNo].doc_name = pdf.name;
    journey.steps[stepNo].uploadDate = now;
    journey.save();
   

    if (!journey) {
      console.log("No data found");
      return NextResponse.json({ message: "No data found" }, { status: 404 });
    } else {
      console.log("Data fetched successfully");
      return NextResponse.json({ message: "document pushed successfully", data: journey }, { status: 200 });
    }

  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}