import { NextRequest, NextResponse } from "next/server";

const ADMIN_EMAIL = "baltistani786@gmail.com";
const ADMIN_PASSWORD = "balti786";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const sessionId =
        Math.random().toString(36).substring(2) + Date.now().toString(36);

      const response = NextResponse.json({
        message: "Login successful",
        status: 200,
      });

      // Set session_id cookie
      response.cookies.set("session_id", sessionId, {
        path: "/", // Make it accessible to all routes
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        sameSite: "strict", // Prevent CSRF
      });

      console.log("Cookie set during login:", sessionId);
      return response;
    }

    return NextResponse.json(
      { message: "Invalid credentials", status: 401 },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "An error occurred", status: 500 },
      { status: 500 }
    );
  }
}
