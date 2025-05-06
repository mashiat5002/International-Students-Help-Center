import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/app/(utils)/connect_mongodb/route"
import User from "@/app/models/user"
import { call_update_varification_key_db } from "@/app/(utils)/call_update_varification_key_db/route"



export async function POST(request: NextRequest) {
   const body= await request.json()
   const current_time= Date.now()/1000
   try{
      
      await connectToDatabase()

      const v_time= await User.find({varification_key:body.key}).select("varify_timeout")
      try{
         
         var varify_timeout=v_time[0].varify_timeout 
      }catch(err){
         call_update_varification_key_db(body.email)
         
         return NextResponse.json({"res":"Invalid"})
         
      }
   

       if(current_time<=varify_timeout){
         await connectToDatabase()
          await User.updateOne({email:body.email,varification_key:body.key},{$set:{active_status:"active"}})
        
                  return NextResponse.json({"res":"activated"})
               }
               else{
                  call_update_varification_key_db(body.email)
          return NextResponse.json({"res":"OTP Timedout"})

       }
    }catch(err){
        console.log(err)
        return NextResponse.json({"res":"error in db"})
   }
    
}