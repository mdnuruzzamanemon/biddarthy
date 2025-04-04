// src/app/api/materials/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // This would be replaced with your actual database query
    const materials = [
      {
        id: "1",
        title: "Introduction to Chemistry",
        description:
          "Basic concepts and principles of chemistry for beginners.",
        fileUrl: "/materials/intro-chemistry.pdf",
        fileType: "pdf",
        courseId: null, // Available to all
        uploadedAt: "2023-10-15T10:30:00Z",
      },
      {
        id: "2",
        title: "Advanced Organic Chemistry",
        description: "Detailed study of organic compounds and reactions.",
        fileUrl: "/materials/advanced-organic.pdf",
        fileType: "pdf",
        courseId: "course123",
        courseName: "Organic Chemistry",
        uploadedAt: "2023-11-05T14:20:00Z",
      },
      // Add more materials as needed
    ];

    return NextResponse.json(materials);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch materials" },
      { status: 500 }
    );
  }
}
