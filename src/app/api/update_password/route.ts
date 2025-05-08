import { NextRequest, NextResponse } from "next/server"
import { call_update_varification_key_db } from "@/app/(utils)/call_update_varification_key_db/route"
import { connectToDatabase } from "@/app/(utils)/connect_mongodb/route"
import User from "@/app/models/user"



export async function POST(request: NextRequest) {
   const body= await request.json()

   const current_time= Date.now()/1000
   try{
      await connectToDatabase()

      const rows= await User.findOne({varification_key:body.key}).select("varify_timeout")
      try{
         if(!rows){
            call_update_varification_key_db(body.email)
            return NextResponse.json({"res":"varification key not found"})
         }
         var varify_timeout=rows.varify_timeout
        }catch(err){
       call_update_varification_key_db(body.email)
            
         return NextResponse.json({"res":"Invalid"})

        }

       if(current_time<=varify_timeout){
          
          await connectToDatabase()
          console.log(body.key,body.email,body.pass)
          const query_res =
         await User.updateOne({varification_key:body.key,email:body.email},{password:body.pass})
            console.log("query_res",query_res)
                  return NextResponse.json({"res":"Password Updated"})
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