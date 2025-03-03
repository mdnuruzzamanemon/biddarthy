import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { courseId: string } }) {
  const { courseId } = await params;

  if (!courseId) {
    return NextResponse.json({ message: "Course ID is required" }, { status: 400 });
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/enrollments/count/${courseId}`, {
      method: "GET",
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch enrollment count");

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
