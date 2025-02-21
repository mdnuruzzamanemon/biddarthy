"use server";

import { cookies } from "next/headers";

export async function logout() {
  const cookieStore = await cookies(); // Await the cookies promise
  cookieStore.delete("token");
}
