// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const sessionId = req.cookies.get("session_id");
  console.log(sessionId ,"trying to access session id") 

  // Check if the user has the session cookie 
  if (!sessionId?.value) {
    // Redirect to login page if not authenticated
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Allow access if sessionId exists
  return NextResponse.next();
}

// Apply the middleware to specific routes (like /admin)
export const config = {
  matcher: ["/analytics" , "/customers", "/orders","/products" , "/shippingDetails "], // Protect all routes under /admin
};
