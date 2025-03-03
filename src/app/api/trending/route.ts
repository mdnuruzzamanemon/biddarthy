import { NextResponse } from "next/server";
import { getTokenFromCookies } from "@/lib/utils/getTokenFromCookies";

// GET request: Get all trending courses (Max 4)
export async function GET(req: Request) {
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/trending`);
    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Failed to fetch trending courses");

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// POST request: Add a course to trending (Admin Only)
export async function POST(req: Request) {
  const { courseId } = await req.json();

  // Get token from cookies (for admin authentication)
  const token = getTokenFromCookies(req);
  if (!token) {
    return NextResponse.json({ message: "No token found" }, { status: 401 });
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/trending/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ courseId }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to add course to trending");

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
