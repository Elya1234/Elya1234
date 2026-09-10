"use client";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export default function CheckoutPage() {
  const router = useRouter();
  const { lines, subtotal, removeLine } = useCartStore();
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-container px-4 py-24 text-center lg:px-12">
        <p className="mb-4 text-gris-texte">Votre panier est vide.</p>
        <Button href="/bijoux/bagues-de-fiancailles">Découvrir la collection</Button>
      </div>
    );
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    const data = new FormData(e.currentTarget);
    const nextErrors: Record<string, string> = {};
    ["prenom", "nom", "email", "adresse", "ville", "codePostal"].forEach((field) => {
      if (!String(data.get(field) ?? "").trim()) nextErrors[field] = "Champ requis.";
    });
    const email = String(data.get("email") ?? "");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "E-mail invalide.";
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      lines.forEach((l) => removeLine(l.id));
      router.push("/commander/confirmation");
    }, 600);
  }

  return (
    <>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Panier", href: "/panier" }, { label: "Commander" }]} />
      <div className="mx-auto max-w-container px-4 pb-24 lg:px-12">
        <h1 className="mb-8 font-serif text-3xl lg:text-4xl">Livraison &amp; paiement</h1>
        <div className="grid gap-12 lg:grid-cols-[1fr,360px]">
          <form onSubmit={onSubmit} noValidate className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField name="prenom" label="Prénom" required error={errors.prenom} />
              <FormField name="nom" label="Nom" required error={errors.nom} />
            </div>
            <FormField name="email" type="email" label="E-mail" required error={errors.email} />
            <FormField name="adresse" label="Adresse" required error={errors.adresse} />
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField name="ville" label="Ville" required error={errors.ville} />
              <FormField name="codePostal" label="Code postal" required error={errors.codePostal} />
            </div>
            <p className="text-xs text-gris-texte">
              Le paiement s&apos;effectue à l&apos;étape suivante, redirigé vers notre prestataire de paiement sécurisé.
            </p>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Validation…" : "Confirmer la commande"}
            </Button>
          </form>

          <div className="h-fit border border-ligne p-6">
            <p className="mb-4 font-serif text-xl">Récapitulatif</p>
            <ul className="mb-4 space-y-2 text-sm">
              {lines.map((l) => (
                <li key={l.id} className="flex justify-between">
                  <span>
                    {l.name} × {l.quantity}
                  </span>
                  <span>{formatPrice(l.unitPrice * l.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between border-t border-ligne pt-3 text-base font-medium">
              <span>Total</span>
              <span>{formatPrice(subtotal())}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
