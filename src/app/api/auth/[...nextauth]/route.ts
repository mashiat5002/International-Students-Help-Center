import { connectToDatabase } from "@/app/(utils)/connect_mongodb/route";
import { encrypt } from "@/app/(utils)/jwt_encrypt_decrypt";
import Expert from "@/app/models/expert";
import User from "@/app/models/user";
import NextAuth, { Account } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";
const set_session= async(email:string,registering_as:string)=>{
  const expires = new Date(Date.now() + 1 * 60 * 60 * 1000);
  
  const session= await encrypt({Email:email,expires});

   cookies().set(registering_as+'-session',session,{expires, httpOnly:true})
}

declare module "next-auth" {
  interface Account {
    params?: {
      isExpert?: boolean;
    };
  }
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile, query, request }:any) {
      const cookieStore = cookies();
  const registering_as = cookieStore.get("registering_as")?.value ;
  
      await connectToDatabase();
      const email = profile.email;
      const name = profile.name;
     
      // const full_name = profile.email;
      //students registration
      if (registering_as == "student") {
        const res = await User.findOne({
          email: email,
          active_status: "active",
        });


        if (res != null){
          await set_session(email,registering_as);
          //already registered
          return true;
        }


        else {
          const result = await new User({
            email: email,
            full_name: name,
            active_status: "active",
            isExpert: account?.params?.isExpert,
          }).save();
          if (result) {
            await set_session(email,registering_as);
            return true;
          }
        }
      }else if (registering_as == "expert") {
          const res = await Expert.findOne({
          email: email,
          active_status: "active",
        });


        if (res != null){
          await set_session(email,registering_as)
          //already registered
          return true;
        }


        else {
          const result = await new Expert({
            email: email,
            full_name: name,
            img: profile.picture || profile.image,
            active_status: "active",
           
          }).save();
          if (result) {
            await set_session(email,registering_as)

            return true;
          }
        }


      }
      
      
      return true;
    },
    async redirect({ url, baseUrl }: any) {
      const registering_as = cookies().get("registering_as")?.value;
  return registering_as=="student"? `${baseUrl}/homepage`:`${baseUrl}/expert-dashboard`;
}
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
