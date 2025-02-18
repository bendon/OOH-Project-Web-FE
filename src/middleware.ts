
import { NextResponse } from "next/server";
import { getSession } from "./lib";
import type { NextRequest } from "next/server";


const publicPaths = ["/"];

export   function middleware(request: NextRequest) {

    const pathname = request.nextUrl.pathname;
    const isPublicPath = publicPaths.includes(pathname);
    const session = request.cookies.get("session")?.value;
 
    if (isPublicPath) {
      if (session) {
        return NextResponse.rewrite(new URL('/en', request.url))
      }
    } else {
      if (!session) {
        return NextResponse.redirect(new URL('/', request.url))
      }
    }
  
 
    return NextResponse.next();
}

export const config = {
  matcher: ["/","/en","/en/:path*"],
};