import { connectToDatabase } from "@/app/(utils)/connect_mongodb/route";
import Expert from "@/app/models/expert";
import User from "@/app/models/user";
import NextAuth, { Account } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";


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
      //students registration
      if (registering_as == "student") {
        const res = await User.findOne({
          email: email,
          active_status: "active",
        });


        if (res != null)
          //already registered
          return true;


        else {
          const result = await new User({
            email: email,
            active_status: "active",
            isExpert: account?.params?.isExpert,
          }).save();
          if (result) {
            return true;
          }
        }
      }else if (registering_as == "expert") {
          const res = await Expert.findOne({
          email: email,
          active_status: "active",
        });


        if (res != null)
          //already registered
          return true;


        else {
          const result = await new Expert({
            email: email,
            active_status: "active",
           
          }).save();
          if (result) {
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
