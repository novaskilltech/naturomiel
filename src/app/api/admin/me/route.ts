import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";

export async function GET() {
  const isAuth = await isAdminAuthenticated();
  return NextResponse.json({ authenticated: isAuth });
}
