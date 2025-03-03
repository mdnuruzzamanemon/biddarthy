import { NextResponse } from "next/server";
import { getTokenFromCookies } from "@/lib/utils/getTokenFromCookies";

// GET request: Get all demo videos
export async function GET(req: Request) {
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/demovideos`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch demo videos");

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// POST request: Create a new demo video
export async function POST(req: Request) {
  const { title, videoLink, category, instructor } = await req.json();

  // Get token from cookies
  const token = getTokenFromCookies(req);
  if (!token) {
        return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/demovideos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ title, videoLink, category, instructor }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to create demo video");

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
