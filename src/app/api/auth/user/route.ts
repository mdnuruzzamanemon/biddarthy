import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  // Retrieve the 'token' from the cookies
  const token = (await cookies()).get("token")?.value;
  
  // Log the token (for debugging purposes)
//   console.log(token);

  // Return the token as a JSON response
  return NextResponse.json({ token });
}
