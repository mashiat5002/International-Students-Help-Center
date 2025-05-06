import { NextRequest, NextResponse } from "next/server";
import { call_nodemailer } from "@/app/(utils)/call_nodemailer/route";
import { connectToDatabase } from "@/app/(utils)/connect_mongodb/route";
import User from "@/app/models/user";

const generateOTP  = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();};




export async function POST(request: NextRequest) {
  const body = await request.json();
  const varify_key = generateOTP ();
  const timeout = Math.floor(Date.now() / 1000) + 5 * 60
  try {
    await connectToDatabase()
    const final_res = await User.find({email:body.email}).select("email")
    
    

    if (final_res.length == 1) {
      const query_res = await User.updateOne({email:body.email},{$set:{varification_key:varify_key,varify_timeout:timeout}})
        
          
          const nodemailer_res=await call_nodemailer(body.email, varify_key)
          return NextResponse.json({ res: query_res, res2:nodemailer_res });
        } else {
          await connectToDatabase()
          
          const query_res =new User({email:body.email,varification_key:varify_key,varify_timeout:timeout,active_status:"Inactive"})
          query_res.save()

         
            
          const nodemailer_res= await call_nodemailer(body.email, varify_key)
         
      return NextResponse.json({ res: query_res[0],res2:nodemailer_res });
    }

} catch (err) {
      return NextResponse.json({ res:"Database Error" });
   
  }
}
