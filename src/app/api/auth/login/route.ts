import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");

    // Store JWT in cookies
    const response = NextResponse.json({ message: "Login successful" });
    response.cookies.set("token", data.token, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 3600, // 1 hour
    });

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json({ message: "An unknown error occurred" }, { status: 400 });
  }
}
