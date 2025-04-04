// src/app/api/user/status/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Check if user is logged in (based on your auth system)
    const cookieStore = cookies();
    const token = (await cookieStore).get("token");

    if (!token) {
      // User is not logged in
      return NextResponse.json({
        isLoggedIn: false,
        enrolledCourseIds: [],
      });
    }

    // If user is logged in, fetch their enrolled courses
    // This would be replaced with your actual database query
    const enrolledCourseIds = ["course123", "course456"];

    return NextResponse.json({
      isLoggedIn: true,
      enrolledCourseIds,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user status" },
      { status: 500 }
    );
  }
}
