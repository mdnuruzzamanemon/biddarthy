import { NextResponse } from "next/server";
import { getTokenFromCookies } from "@/lib/utils/getTokenFromCookies";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const { id } = await params;
  
    if (!id) {
      return NextResponse.json({ message: "Trending Course ID is required" }, { status: 400 });
    }
  
    const token = getTokenFromCookies(req);
    if (!token) {
      return NextResponse.json({ message: "No token found" }, { status: 401 });
    }
  
    try {
      const res = await fetch(`${process.env.BACKEND_API_URL}/api/trending/${id}`, {
        method: "DELETE", // ✅ Change from POST to DELETE
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
  
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to remove course from trending");
  
      return NextResponse.json(data);
    } catch (error: any) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
  