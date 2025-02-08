import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers"; // Next.js `cookies` API for app routes

// Admin credentials
const ADMIN_EMAIL = "baltistani786@gmail.com";
const ADMIN_PASSWORD = "balti786";

// POST method handler
export async function POST(req: NextRequest) {
  try {
    // Parse the JSON body from the request
    const { email, password } = await req.json();

    // Validate credentials
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Generate a session ID
      const sessionId =
        Math.random().toString(36).substring(2) + Date.now().toString(36);

      // Set the session cookie
      const response = NextResponse.json({
        message: "Login successful",
        status: 200,
      });
      response.cookies.set("session_id", sessionId, {
        path:"/",
        httpOnly: true, // Prevent client-side JS access
        secure: process.env.NODE_ENV === "production", // HTTPS only in production
        maxAge: 60 * 60 * 24 * 7, // Cookie expiration in seconds (7 days)
        sameSite: "strict", // Prevent CSRF
      });

      return response;
    } else {
      // Invalid credentials
      return NextResponse.json(
        { message: "Invalid credentials", status: 401 },
        { status: 401 }
      );
    }
  } catch (error) {
    // Method not allowed or other server error
    return NextResponse.json(
      { message: "An error occurred", status: 500 },
      { status: 500 }
    );
  }
}
