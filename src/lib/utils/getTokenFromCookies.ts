import { cookies } from "next/headers";

export const getTokenFromCookies = async (req: Request): Promise<string | null> => {
  const token = (await cookies()).get("token")?.value || null;
  return token;
};
