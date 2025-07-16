import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/(utils)/jwt_encrypt_decrypt";
import { call_is_student_email_existing } from "../lib/auth/is_student_email_existing";
import { call_is_expert_email_existing } from "../lib/auth/is_email_existing";
import { call_is_admin_email_existing } from "../lib/auth/is_admin_email_existing";

export async function middleware(request: NextRequest) {

  // restricting access to admin login page
  if( request.nextUrl.pathname.startsWith("/admin-login")){
    const access_code= request.nextUrl.searchParams.get("secret-key");
 
    if(access_code!="5002"){

      return NextResponse.redirect(new URL("/admin-unauthorized", request.url));
    }else{
      return NextResponse.next();

    }

  }





  const session_user = cookies().get("student-session")?.value;
  const session_expert = cookies().get("expert-session")?.value;
  const session_admin = cookies().get("admin-session")?.value;
  const session =
request.nextUrl.pathname.startsWith("/homepage")
  ? session_user
  : request.nextUrl.pathname.startsWith("/expert-dashboard")
  ? session_expert
  : request.nextUrl.pathname.startsWith("/admin-dashboard")
  ? session_admin
  : null;



  
  if (request.nextUrl.pathname.startsWith("/admin-dashboard") && !session) {
     return NextResponse.redirect(new URL("/admin-unauthorized", request.url));
  }
  else if (!session) {
     return NextResponse.redirect(new URL("/error-unauthorized", request.url));
  }


 
  const decrypted = (await decrypt(session)) as {
    Email: string;
    expires: string;
    Password: string;
    iat: number;
    exp: number;
  };
  var res;
  
  if(request.nextUrl.pathname.startsWith("/homepage")){
    console.log("Decrypted Email: ", decrypted.Email);
    res= await call_is_student_email_existing(decrypted.Email);
  }
  else if(request.nextUrl.pathname.startsWith("/expert-dashboard"))
   res= await call_is_expert_email_existing(decrypted.Email);
  else if(request.nextUrl.pathname.startsWith("/admin-dashboard"))
   res= await call_is_admin_email_existing(decrypted.Email);
 
 
  if (res.status == "email found") {
// logic for checking if meetings has ended or not
  if (request.nextUrl.pathname.startsWith("/expert-dashboard/seminar/") ||
    request.nextUrl.pathname.startsWith("/homepage/seminar/"))
     {
    const segments = request.nextUrl.pathname.split("/");
    const lastId = segments[segments.length - 1];
    console.log("checking if seminar ended",lastId)
  }else if(request.nextUrl.pathname.startsWith("/expert-dashboard/meeting/") ||
    request.nextUrl.pathname.startsWith("/homepage/meeting/"))
  {
    const segments = request.nextUrl.pathname.split("/");
    const lastId = segments[segments.length - 1];
    console.log("checking if seminar ended",lastId)
  }




    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/error-unauthorized", request.url));
    // Redirect to a custom error page
  }


}



export const config = {
  matcher: ["/homepage/:path*","/expert-dashboard/:path*","/admin-dashboard/:path*","/admin-login/:path*"]
};
