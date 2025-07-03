import { connectToDatabase } from "@/app/(utils)/connect_mongodb/route";
import Slider_images from "@/app/models/slider_images";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body= await request.json()
  try{



    await connectToDatabase()
          const res = await Slider_images.updateOne(
            { _id: body._id },
            { $set: { img: body.img, img_name: body.img_name } }
);       
      return NextResponse.json({ message: "slide updated successfully" }, { status: 200 });


         

  }catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
 
  

      
}
