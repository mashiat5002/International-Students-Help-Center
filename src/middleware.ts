import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/(utils)/jwt_encrypt_decrypt";
import { call_is_email_existing } from "./app/(utils)/call_is_email_existing/route";
import { call_is_exper_email_existing } from "./app/(utils)/call_is_exper_email_existing/route";

export async function middleware(request: NextRequest) {
  const session_user = cookies().get("student-session")?.value;
  const session_expert = cookies().get("expert-session")?.value;
  const session =
    request.nextUrl.pathname == "/homepage" ? session_user : session_expert;
  if (!session) {
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
  if(request.nextUrl.pathname == "/homepage")
   res= await call_is_email_existing(decrypted.Email);
  else if(request.nextUrl.pathname == "/expert-dashboard")
   res= await call_is_exper_email_existing(decrypted.Email);
 
  if (res.status == "email found") {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/error-unauthorized", request.url));
    // Redirect to a custom error page
  }
}



export const config = {
  matcher: ["/homepage/:path*","/expert-dashboard/:path*"]
};
