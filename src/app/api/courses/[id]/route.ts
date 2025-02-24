import { NextResponse } from "next/server";
import { getTokenFromCookies } from "@/lib/utils/getTokenFromCookies";

// GET single course by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  const token = getTokenFromCookies(req);

  if (!token) {
    return NextResponse.json({ message: "No token found" }, { status: 401 });
  }

  try {
    const res = await fetch(`http://localhost:5000/api/courses/${id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch course");

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// PUT update a course
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  const formData = await req.formData();

  const title = formData.get("title");
  const category = formData.get("category");
  const price = formData.get("price");
  const discountPrice = formData.get("discountPrice");
  const description = formData.get("description");
  const instructor = formData.get("instructor");
  const discountEndsAt = formData.get("discountEndsAt");
  const demoVideo = formData.get("demoVideo");
  const thumbnail = formData.get("thumbnail");

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
    const res = await fetch(`http://localhost:5000/api/courses/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: backendFormData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update course");

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// DELETE a course
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  const token = getTokenFromCookies(req);

  if (!token) {
    return NextResponse.json({ message: "No token found" }, { status: 401 });
  }

  try {
    const res = await fetch(`http://localhost:5000/api/courses/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Failed to delete course");

    return NextResponse.json({ message: "Course deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
