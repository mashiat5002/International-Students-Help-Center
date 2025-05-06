import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const session=cookies().get("session")?.value;
  // const pathnext= request.nextUrl.pathname;
  // if(pathnext=="/api/login_cookie_auth" || pathnext=="/api/create_stripe_customer" || pathnext=="/api/create_customer_dwolla" || pathnext=="/api/nodemailer" || pathnext=="/api/activate_user_db" || pathnext=="/api/update_varification_key_db" || pathnext=="/api/find_user_active_status"  || pathnext=="/api/db_insertion" || pathnext=="/api/create_saving_acc_in_db" || pathnext=="/api/update_password" || pathnext=="/api/connect_mongodb")
  //   return NextResponse.next();
  if(session){ 
    return NextResponse.next();
  }
  else return NextResponse.json({"session":"no stored"})
}

export const config={
 matcher: ['/homepage/:path*']
}











