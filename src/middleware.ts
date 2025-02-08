 console.log("middle ware file is runnig ")


import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async  function middleware(req: NextRequest) {
  const session_id= await req.cookies.get("session_id");
  // console.log(session_id ,"session id is trying to fetch here ")
  // const sessionId = req.cookies.get("session_id");
  console.log(session_id ,"trying to access session id in middleware") 

  // Check if the user has the session cookie 
  if (!session_id?.value) {
    // Redirect to login page if not authenticated
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Allow access if sessionId exists
  return NextResponse.next();
}

// Apply the middleware to specific routes (like /admin)
export const config = {
  matcher: ["/analytics" , "/customers", "/orders","/products" ,"/shippingDetails" ,"/"], // Protect all routes under /admin
};
