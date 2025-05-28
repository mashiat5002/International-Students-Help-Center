import { connectToDatabase } from "@/app/(utils)/connect_mongodb/route";
import { encrypt } from "@/app/(utils)/jwt_encrypt_decrypt";
import User from "@/app/models/user";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export  async function POST(request:NextRequest){
    try{
        const body= await request.json();
        
        const email= body.email;
        const password= body.password;
        
        await connectToDatabase()
        const result= await User.findOne({email:email,active_status:"active"})
       
   
    if(result== null){
        return NextResponse.json({"status":"You are not registered. Please register with your email first."})
    }
    
    const rows= await User.findOne({email:email,password:password})
    if (rows) {
        // const expires = new Date(Date.now() + 1 * 60 * 60  * 1000);
        const expires = new Date(Date.now() + 1 * 60 * 60 * 60 * 1000);
       
        const session= await encrypt({Email:email,expires});
        cookies().set('student-session',session,{expires, httpOnly:true})
        

        return NextResponse.json({"status":"Login Successful"})
       
    }
        else return NextResponse.json({"status":"Email or Password did not match!!"})
    }
    catch(error){
        console.log("error",error)
        return NextResponse.json({"status":"Login Failed"})
    }


}