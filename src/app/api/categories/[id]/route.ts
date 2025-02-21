import { NextResponse } from "next/server";
import { getTokenFromCookies } from "@/lib/utils/getTokenFromCookies";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { categoryName } = await req.json();

  if (!id) {
    return NextResponse.json({ message: "Category ID is required" }, { status: 400 });
  }

  // Get token from cookies
  const token = getTokenFromCookies(req);

  if (!token) {
    return NextResponse.json({ message: "No token found" }, { status: 401 });
  }

  try {
    const res = await fetch(`http://localhost:5000/api/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ categoryName }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update category");

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ message: "Category ID is required" }, { status: 400 });
  }

  // Get token from cookies
  const token = getTokenFromCookies(req);

  if (!token) {
    return NextResponse.json({ message: "No token found" }, { status: 401 });
  }

  try {
    const res = await fetch(`http://localhost:5000/api/categories/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Failed to delete category");

    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
