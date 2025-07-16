import timeFormatConverter from "@/app/(utils)/time_format_converter/time_format_converter";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
export  async function POST (request:NextRequest){
    const body= await request.json()
    console.log("nodemailer")
    console.log(body.email)
    if(request.method=="POST"){
        try{
            const transporter= nodemailer.createTransport({
                host: "smtp.gmail.com", 
                port: 587, 
                secure: false, 
                auth: {
                  user: `${process.env.NEXT_EMAIL}`, 
                  pass: `${process.env.NEXT_EMAIL_PASSWORD}`,   
                },
            })


            const mailOptions = {
                from: `"ISHC" <${process.env.NEXT_EMAIL}>`, 
                to:`${body.email}`, 
                subject:"Your Meeting with "+body.expert+" is scheduled", 
                text:"Attend Meeting On time", 
                html:`<p>${"Meeting Starts on: "+timeFormatConverter(body.date_time)}</p>`, 
              };

              const info = await transporter.sendMail(mailOptions);
              console.log("Message sent: %s", info.messageId);
              return NextResponse.json({status:201,msg:"successfully sent email"})
        }catch(err){
            console.log(err)
            throw new Error("nodemailer error")
            // return NextResponse.json({status:500,msg:"Failed to send email"})
        }
    }
    else{
        return NextResponse.json({status:200,msg:"method not allowed"})

    }

}