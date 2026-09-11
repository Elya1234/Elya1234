"use client";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Une erreur est survenue.");
        setStatus("error");
        return;
      }
      setStatus("success");
      setEmail("");
      setConsent(false);
    } catch {
      setError("Impossible de vous inscrire pour le moment. Réessayez plus tard.");
      setStatus("error");
    }
  }

  return (
    <section className="reveal bg-noir-texte py-16 text-white">
      <div className="mx-auto max-w-lg px-4 text-center lg:px-12">
        <h2 className="font-serif text-2xl">Restez informé·e</h2>
        <p className="mt-2 text-sm text-white/70">Nouveautés, éditions limitées et invitations en avant-première.</p>
        {status === "success" ? (
          <p role="status" className="mt-6 text-sm text-white">
            Merci ! Vérifiez votre boîte mail pour confirmer votre inscription.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 text-left" noValidate>
            <div className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="newsletter-email" className="sr-only">
                Adresse e-mail
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse e-mail"
                aria-invalid={status === "error"}
                className="min-h-[48px] flex-1 border border-white/30 bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/50 focus:border-white"
              />
              <Button type="submit" disabled={status === "loading"} className="border-white bg-white text-bleu-roi hover:bg-white/90">
                {status === "loading" ? "Envoi…" : "S'inscrire"}
              </Button>
            </div>
            <label className="mt-3 flex items-start gap-2 text-xs text-white/70">
              <input
                type="checkbox"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0"
              />
              J&apos;accepte de recevoir des communications d&apos;Elya Joaillerie et j&apos;ai pris connaissance de la{" "}
              <a href="/confidentialite" className="underline">
                politique de confidentialité
              </a>
              .
            </label>
            {error && (
              <p role="alert" className="mt-2 text-xs text-red-300">
                {error}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
