import { NextResponse } from "next/server";
import { getTokenFromCookies } from "@/lib/utils/getTokenFromCookies";

// API Base URL (Backend Server)
const API_URL = `${process.env.BACKEND_API_URL}/api/homebanner`; 

// GET: Fetch Home Banner
export async function GET(req: Request) {
  const token = getTokenFromCookies(req);
  
  if (!token) {
    return NextResponse.json({ message: "No token found" }, { status: 401 });
  }

  try {
    const res = await fetch(API_URL, {
      method: "GET",
      headers: { "Authorization": `Bearer ${token}` },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch home banner");

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// POST: Upload New Banner
export async function POST(req: Request) {
  const token = getTokenFromCookies(req);

  if (!token) {
    return NextResponse.json({ message: "No token found" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("image");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ message: "Invalid file upload" }, { status: 400 });
    }

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Authorization": `Bearer ${token}` },
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to upload home banner");

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// DELETE: Remove Home Banner
export async function DELETE(req: Request) {
  const token = getTokenFromCookies(req);

  if (!token) {
    return NextResponse.json({ message: "No token found" }, { status: 401 });
  }

  try {
    const res = await fetch(API_URL, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to delete home banner");

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
