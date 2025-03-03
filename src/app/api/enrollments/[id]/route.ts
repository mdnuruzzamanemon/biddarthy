import { NextResponse } from "next/server";
import { getTokenFromCookies } from "@/lib/utils/getTokenFromCookies";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }>  }) {
  const { id } = await params;
  const { action } = await req.json(); // action: "approve" or "reject"

  if (!id || !["approve", "reject"].includes(action)) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  const token = getTokenFromCookies(req);
  if (!token) {
        return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/enrollments/${action}/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || `Failed to ${action} enrollment`);

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }>  }) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ message: "Enrollment ID is required" }, { status: 400 });
  }

  const token = getTokenFromCookies(req);
  if (!token) {
        return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/enrollments/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Failed to delete enrollment");

    return NextResponse.json({ message: "Enrollment deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
