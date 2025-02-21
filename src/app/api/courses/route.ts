import { NextResponse } from "next/server";
import { getTokenFromCookies } from "@/lib/utils/getTokenFromCookies";

// GET all courses
export async function GET(req: Request) {
  const token = getTokenFromCookies(req);
  if (!token) {
    return NextResponse.json({ message: "No token found" }, { status: 401 });
  }

  try {
    const res = await fetch("http://localhost:5000/api/courses", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch courses");

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// POST create a new course
export async function POST(req: Request) {
  const formData = await req.formData();

  // Extract fields
  const title = formData.get("title");
  const category = formData.get("category"); // Should be a valid category ID
  const price = formData.get("price");
  const discountPrice = formData.get("discountPrice");
  const description = formData.get("description");
  const instructor = formData.get("instructor");
  const discountEndsAt = formData.get("discountEndsAt");
  const demoVideo = formData.get("demoVideo");
  const thumbnail = formData.get("thumbnail"); // Expecting a file

  const token = getTokenFromCookies(req);
  if (!token) {
    return NextResponse.json({ message: "No token found" }, { status: 401 });
  }

  const backendFormData = new FormData();
  backendFormData.append("title", title as string);
  backendFormData.append("category", category as string);
  backendFormData.append("price", price as string);
  backendFormData.append("discountPrice", discountPrice as string);
  backendFormData.append("description", description as string);
  backendFormData.append("instructor", instructor as string);
  backendFormData.append("discountEndsAt", discountEndsAt as string);
  backendFormData.append("demoVideo", demoVideo as string);

  if (thumbnail instanceof File) {
    backendFormData.append("thumbnail", thumbnail);
  }

  try {
    const res = await fetch("http://localhost:5000/api/courses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: backendFormData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to create course");

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
