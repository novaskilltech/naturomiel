import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminCredentials, AUTH_COOKIE_NAME, SESSION_TOKEN_SECRET } from "@/lib/adminAuth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Veuillez renseigner votre email et mot de passe." },
        { status: 400 }
      );
    }

    const isValid = await verifyAdminCredentials(email, password);
    if (!isValid) {
      return NextResponse.json(
        { error: "Identifiants invalides. Accès refusé." },
        { status: 401 }
      );
    }

    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_NAME, SESSION_TOKEN_SECRET, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 jours de session active
    });

    return NextResponse.json({ success: true, message: "Connexion réussie." });
  } catch (err: any) {
    return NextResponse.json({ error: "Erreur serveur.", details: err.message }, { status: 500 });
  }
}
