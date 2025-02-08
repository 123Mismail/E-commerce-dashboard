import { NextRequest, NextResponse } from "next/server";

// Handle the POST request for logout
export async function POST(req: NextRequest) { 

    
  try {
    // Create a response object to manipulate cookies 
    const getCookies = req.cookies.get("session_id")
    const response = NextResponse.json({ message: "Logged out successfully" });
    console.log(getCookies,"trying to get cookidein logout paeg")
    // Clear the "session_id" cookie
    response.cookies.set("session_id", "", { 
      path: "/", 
      httpOnly: true, // Prevent client-side access
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      expires: new Date(0), // Expire the cookie immediately
    });

    return response;
  } catch (error) {
    // Log the error and return a server error response
    console.error("Logout error:", error);
    return NextResponse.json(
      { message: "An error occurred during logout", status: 500 },
      { status: 500 }
    );
  }
}
