import { cookies } from "next/headers";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "naturomiel@gmail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Khouribga111*";
export const AUTH_COOKIE_NAME = "naturomiel_admin_session";
export const SESSION_TOKEN_SECRET = "naturomiel_secret_auth_token_2026_secured";

export async function verifyAdminCredentials(email: string, pass: string): Promise<boolean> {
  const cleanEmail = email.trim().toLowerCase();
  const targetEmail = ADMIN_EMAIL.trim().toLowerCase();
  return cleanEmail === targetEmail && pass === ADMIN_PASSWORD;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  return token === SESSION_TOKEN_SECRET;
}
