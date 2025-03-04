import { NextResponse } from "next/server";
import { getTokenFromCookies } from "@/lib/utils/getTokenFromCookies";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }>  }) {
  const { id } = await params;
  const { title, videoLink, category, instructor } = await req.json();

  if (!id) {
    return NextResponse.json({ message: "Demo Video ID is required" }, { status: 400 });
  }

  const token = await getTokenFromCookies(req);
  if (!token) {
        return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/demovideos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ title, videoLink, category, instructor }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update demo video");

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }>  }) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ message: "Demo Video ID is required" }, { status: 400 });
  }

  const token = await getTokenFromCookies(req);
  if (!token) {
        return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/demovideos/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Failed to delete demo video");

    return NextResponse.json({ message: "Demo video deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
