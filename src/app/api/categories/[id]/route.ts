import { NextResponse } from "next/server";
import { getTokenFromCookies } from "@/lib/utils/getTokenFromCookies";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // Await the Promise to access 'id'
  const { categoryName } = await req.json();

  if (!id) {
    return NextResponse.json({ message: "Category ID is required" }, { status: 400 });
  }

  // Get token from cookies
  const token = await getTokenFromCookies(req);

  if (!token) {
    // return NextResponse.json({ message: "No token found" }, { status: 401 });
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories/${id}`, {
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




export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // Await the Promise to access 'id'

  if (!id) {
    return NextResponse.json({ message: "Category ID is required" }, { status: 400 });
  }

  // Get token from cookies
  const token = await getTokenFromCookies(req);

  if (!token) {
    // return NextResponse.json({ message: "No token found" }, { status: 401 });
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  try {
    // Check if the category is associated with any courses or demo videos
    const checkRes = await fetch(`${process.env.BACKEND_API_URL}/api/categories/check-dependencies/${id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    const checkData = await checkRes.json();
    
    if (!checkRes.ok) throw new Error(checkData.message || "Failed to check category dependencies");

    if (checkData.hasDependencies) {
      return NextResponse.json(
        { message: "Cannot delete category. It is referenced by courses or demo videos." },
        { status: 400 }
      );
    }

    // Proceed with deletion if no dependencies
    const deleteRes = await fetch(`${process.env.BACKEND_API_URL}/api/categories/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!deleteRes.ok) throw new Error("Failed to delete category");

    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
