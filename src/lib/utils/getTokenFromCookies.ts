export const getTokenFromCookies = (req: Request): string | null => {
    const cookies = req.headers.get("cookie") || "";
    const tokenMatch = cookies.match(/token=([^;]+)/);
    return tokenMatch ? tokenMatch[1] : null;
  };
  