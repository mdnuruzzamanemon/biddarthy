import { NextResponse } from "next/server";
import { getTokenFromCookies } from "@/lib/utils/getTokenFromCookies"; // Import the utility function

// GET request: Get all categories
export async function GET(req: Request) {
  // Get token from cookies
  // const token = await getTokenFromCookies(req);

  // if (!token) {
  //   return NextResponse.json({ message: "No token found" }, { status: 401 });
  // }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
      method: "GET"
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch categories");

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// POST request: Create a new category
export async function POST(req: Request) {
  const { categoryName } = await req.json();

  // Get token from cookies
  const token = await getTokenFromCookies(req);

  if (!token) {
    // return NextResponse.json({ message: "No token found" }, { status: 401 });
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ categoryName }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to create category");

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}


