import { NextResponse } from "next/server";
import { getTokenFromCookies } from "@/lib/utils/getTokenFromCookies";

// GET request: Get all enrollments (Admin only)
export async function GET(req: Request) {
  const token = getTokenFromCookies(req);

  if (!token) {
    return NextResponse.json({ message: "No token found" }, { status: 401 });
  }

  try {
    const res = await fetch("http://localhost:5000/api/enrollments", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch enrollments");

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// POST request: Submit an enrollment request (Public)
export async function POST(req: Request) {
  const { courseId, name, email, phone, transactionId } = await req.json();

  try {
    const res = await fetch("http://localhost:5000/api/enrollments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ courseId, name, email, phone, transactionId }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to enroll");

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
