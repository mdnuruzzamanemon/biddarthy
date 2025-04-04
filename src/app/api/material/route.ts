// src/app/api/materials/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Get all materials regardless of authentication status
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
      {
        id: "3",
        title: "Physics Fundamentals",
        description: "Core concepts of classical and modern physics.",
        fileUrl: "/materials/physics-fundamentals.pdf",
        fileType: "pdf",
        courseId: null, // Available to all
        uploadedAt: "2023-09-22T08:45:00Z",
      },
      {
        id: "4",
        title: "Calculus Reference Sheet",
        description:
          "Quick reference for derivatives, integrals, and formulas.",
        fileUrl: "/materials/calculus-reference.pdf",
        fileType: "pdf",
        courseId: null, // Available to all
        uploadedAt: "2023-08-30T16:15:00Z",
      },
      {
        id: "5",
        title: "Biology Cell Structure Diagram",
        description: "Detailed diagram of eukaryotic cell structure.",
        fileUrl: "/materials/cell-structure.jpg",
        fileType: "image",
        courseId: null, // Available to all
        uploadedAt: "2023-11-12T11:20:00Z",
      },
      {
        id: "6",
        title: "Quantum Mechanics Notes",
        description: "Advanced notes on quantum mechanics principles.",
        fileUrl: "/materials/quantum-mechanics.pdf",
        fileType: "pdf",
        courseId: "course456",
        courseName: "Advanced Physics",
        uploadedAt: "2023-10-28T09:30:00Z",
      },
      {
        id: "7",
        title: "Periodic Table of Elements",
        description: "High-resolution image of the complete periodic table.",
        fileUrl: "/materials/periodic-table.jpg",
        fileType: "image",
        courseId: null, // Available to all
        uploadedAt: "2023-09-05T13:40:00Z",
      },
      {
        id: "8",
        title: "Linear Algebra Cheat Sheet",
        description: "Essential formulas and concepts for linear algebra.",
        fileUrl: "/materials/linear-algebra.pdf",
        fileType: "pdf",
        courseId: null, // Available to all
        uploadedAt: "2023-11-18T15:10:00Z",
      },
      {
        id: "9",
        title: "Molecular Biology Techniques",
        description: "Overview of common techniques in molecular biology.",
        fileUrl: "/materials/molecular-biology.pdf",
        fileType: "pdf",
        courseId: "course789",
        courseName: "Advanced Biology",
        uploadedAt: "2023-10-10T10:00:00Z",
      },
      {
        id: "10",
        title: "Computer Science Algorithms",
        description: "Common algorithms and their implementations.",
        fileUrl: "/materials/algorithms.pdf",
        fileType: "pdf",
        courseId: null, // Available to all
        uploadedAt: "2023-11-25T14:30:00Z",
      },
      {
        id: "11",
        title: "Human Anatomy Reference",
        description: "Detailed anatomical diagrams of human body systems.",
        fileUrl: "/materials/anatomy.jpg",
        fileType: "image",
        courseId: null, // Available to all
        uploadedAt: "2023-09-15T11:45:00Z",
      },
      {
        id: "12",
        title: "Statistics Formula Guide",
        description: "Comprehensive guide to statistical formulas and tests.",
        fileUrl: "/materials/statistics.pdf",
        fileType: "pdf",
        courseId: "course123",
        courseName: "Organic Chemistry",
        uploadedAt: "2023-10-20T16:50:00Z",
      },
    ];

    // Check if user is logged in
    const cookieStore = cookies();
    const token = (await cookieStore).get("token");
    const isLoggedIn = !!token;

    // If not logged in, only return public materials
    if (!isLoggedIn) {
      const publicMaterials = materials.filter(
        (material) => material.courseId === null
      );
      return NextResponse.json(publicMaterials);
    }

    // If logged in, return all materials (in a real app, you'd filter by enrolled courses)
    return NextResponse.json(materials);
  } catch (error) {
    console.error("Error fetching materials:", error);
    return NextResponse.json(
      { error: "Failed to fetch materials" },
      { status: 500 }
    );
  }
}
