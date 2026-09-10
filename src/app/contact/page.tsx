"use client";
import { useState, type FormEvent } from "react";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { brand } from "@/lib/data/brand";

const faq = [
  { title: "Combien de temps prend la fabrication d'une bague ?", content: "Comptez 2 à 4 semaines ouvrées entre la validation de votre commande et l'expédition." },
  { title: "Puis-je faire ajuster ma bague après réception ?", content: "Oui, un premier ajustement de taille est offert dans les 60 jours suivant l'achat." },
  { title: "Les diamants de synthèse sont-ils certifiés ?", content: "Oui, comme les diamants naturels, ils sont accompagnés d'un certificat IGI ou GIA dès 0,30 carat." },
];

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setError(null);
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          website: data.get("website"),
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Une erreur est survenue.");
        setStatus("error");
        return;
      }
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch {
      setError("Impossible d'envoyer votre message pour le moment.");
      setStatus("error");
    }
  }

  return (
    <>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Nous contacter" }]} />
      <div className="mx-auto max-w-container px-4 pb-24 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <h1 className="mb-4 font-serif text-3xl lg:text-4xl">Nous contacter</h1>
            <p className="mb-6 text-sm text-gris-texte">
              Une question sur une commande, une création sur mesure ou un rendez-vous ? Écrivez-nous, notre équipe vous répond sous 24h ouvrées.
            </p>
            <p className="mb-1 text-sm">
              <a href={brand.phoneHref} className="underline-link">
                {brand.phone}
              </a>
            </p>
            <p className="text-sm">
              <a href={`mailto:${brand.email}`} className="underline-link">
                {brand.email}
              </a>
            </p>

            {status === "success" ? (
              <p role="status" className="mt-8 text-sm text-vert-profond">
                Merci, votre message a bien été envoyé. Nous revenons vers vous rapidement.
              </p>
            ) : (
              <form onSubmit={onSubmit} noValidate className="mt-8 space-y-4">
                <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                <FormField name="name" label="Nom complet" required />
                <FormField name="email" type="email" label="Adresse e-mail" required />
                <FormField name="message" as="textarea" label="Votre message" required minLength={10} />
                {error && (
                  <p role="alert" className="text-xs text-red-700">
                    {error}
                  </p>
                )}
                <Button type="submit" disabled={status === "loading"}>
                  {status === "loading" ? "Envoi…" : "Envoyer"}
                </Button>
              </form>
            )}
          </div>

          <div>
            <h2 className="mb-4 font-serif text-2xl">Questions fréquentes</h2>
            <Accordion items={faq} />
          </div>
        </div>
      </div>
    </>
  );
}
