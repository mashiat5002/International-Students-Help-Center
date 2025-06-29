import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/app/(utils)/connect_mongodb/route"
import User from "@/app/models/user"
import { cookies } from "next/headers"
import { decrypt } from "@/app/(utils)/jwt_encrypt_decrypt"



export async function POST(request: NextRequest) {
   const req= await request.json()
   const info=req.info;
   console.log("info is here--------")
   console.log(info)

  
   try{

        // fetching email of logged in user
               const session = cookies().get("student-session")?.value;
               if (!session) {
                 console.log("Session not found");
                 return NextResponse.json(
                   { message: "Session not found" },
                   { status: 404 }
                 );
               }
         
         
               // decrypting the session to get user details cannot be done in the server side as it is not secure
               const details = (await decrypt(session)) as {
                 Email: string;
                 expires: string;
                 Password: string;
                 iat: number;
                 exp: number;
               };



      await connectToDatabase()

  
         const user= await User.findOne({email:details.Email})
        
         if(user){
            const db_res= await User.updateOne({email:details.Email},
             {$set:{
             full_name: info.full_name,
            institution: info.institution,
            country: info.country,
            preferred_field_of_study: info.preferred_field_of_study,
            preferred_level_of_study: info.preferred_level_of_study,
            bio: info.bio,
            enable_email:info.enable_email
          
         }
      }
   ) 
   console.log(db_res)
   return NextResponse.json({"res":"info updated successfully"}) 
   
   }
      else {
         console.log("user not found")
         return NextResponse.json({"res":"user not found"})}
    
     
      
   
    }catch(err){
        console.log(err)
        return NextResponse.json({"res":"error in db"})
   }
    
}