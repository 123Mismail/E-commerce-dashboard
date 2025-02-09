import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const myCookies = cookies();
  // @ts-ignore
  const sessionCookie = myCookies.get("session_id");

  

  // If session_id is missing, redirect to login
  if (!sessionCookie?.value) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If session_id exists, allow access
  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: ["/analytics", "/customers", "/orders", "/products", "/shippingDetails", "/"],
};
