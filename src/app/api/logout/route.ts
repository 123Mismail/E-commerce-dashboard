import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const myCookies = cookies();

    // Log the session cookie from the incoming request
    // @ts-ignore
    const sessionCookie = myCookies.get("session_id");
    console.log("Session cookie before clearing:", sessionCookie);

    // Prepare the response
    const response = NextResponse.json({ message: "Logged out successfully" });

    // Clear the session_id cookie
    response.cookies.set("session_id", "", {
      path: "/", // Same as the login cookie path
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(0), // Expire immediately
    });

    console.log("Cookie has been cleared in the response.");
    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { message: "An error occurred during logout", status: 500 },
      { status: 500 }
    );
  }
}
