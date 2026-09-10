import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";
  const honeypot = typeof body?.website === "string" ? body.website : "";

  if (honeypot) {
    // Piège anti-spam : un champ caché rempli signale un robot. On répond succès sans traiter.
    return NextResponse.json({ ok: true });
  }
  if (!name || !EMAIL_RE.test(email) || message.length < 10) {
    return NextResponse.json({ error: "Merci de vérifier les informations saisies." }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
