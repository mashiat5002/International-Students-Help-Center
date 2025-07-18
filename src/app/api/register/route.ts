import { call_nodemailer } from "@/app/(utils)/call_nodemailer/call_nodemailer";
import { connectToDatabase } from "@/app/(utils)/connect_mongodb/connect_mongodb";
import isValidEmail from "@/app/(utils)/isValidEmailString/isValidEmailString";
import isValidPassword from "@/app/(utils)/isValidPasswordString/isValidPasswordString";
import User from "@/app/models/user";
import { NextResponse } from "next/server";

export async function POST(request: Request) {



  const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };
  const otp = generateOTP();
  const { email, fullName, password } = await request.json();
 
    console.log(fullName)
  const isPassInvalid=isValidPassword(password)
    if(!fullName){
      return NextResponse.json({"res":"Name is required"})
    }  
    if(isPassInvalid.res=="Invalid"){
      return NextResponse.json({"res":"Invalid Password","reason":isPassInvalid.reason})
    }  
    if(!password){
      return NextResponse.json({"res":"Password is required"})
    }  
    if(!email){
      return NextResponse.json({"res":"Email is required"})
    }  
    else if(!isValidEmail(email)){
      return NextResponse.json({"res":"Invalid email input"})
    }  

  if (
    !email ||
    !fullName ||
    typeof email !== "string" ||
    typeof fullName !== "string"
  ) {
    return NextResponse.json({"res":"Invalid input"})

  }

      await connectToDatabase()

      
      try {

  //       const registrationRequest = new RegistrationRequest({
  //       email,
  //       fullName,
  //       request_time: new Date().toISOString(),
  //       status: 'pending', 
  // });
  // await registrationRequest.save();


        console.log(email)
        
        const res=await User.find({email:email,active_status:"inactive"});
      
        if(res.length>0){
          try{

            await call_nodemailer(email, otp);
          }catch(err){
            return NextResponse.json({"res":"error to send email!!"})

          }
          await User.updateOne({email:email,active_status:"inactive"},
            {$set:{password:password,varify_timeout:Date.now() + 1000 * 60,varification_key:otp}}
          )
         
          return NextResponse.json({"res":"Awaiting to validate you email!!"})

        }
      } catch (error) {
        return NextResponse.json({"res":"Database error occured"})

      }
      try {
        console.log(email)
        
        const res=await User.find({email:email,active_status:"active"});
        
        if(res.length>0){
          
          return NextResponse.json({"res":"Email already in use"})

        }
      } catch (error) {
        return NextResponse.json({"res":"Database error occured"})

      }
      try {
        
        
        
        await call_nodemailer(email, otp);

      } catch (error) {
        return NextResponse.json({"res":"Error sending email"})
      }

     
     
      const newUser = new User({
        email,
        fullName,
        password,
        active_status: "inactive",
        varify_timeout : Date.now() + 1000 * 60,
        varification_key: otp,
       
      });
      console.log(newUser);
      await newUser.save();
   
      return NextResponse.json({"res":"Awaiting to validate you email!!"})
}
