import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function ConfirmationPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center lg:px-12">
      <p aria-hidden="true" className="mb-4 text-4xl text-vert-profond">
        ✓
      </p>
      <h1 className="font-serif text-3xl">Merci pour votre commande</h1>
      <p className="mt-3 text-sm text-gris-texte">
        Un e-mail de confirmation vous a été envoyé. Votre bijou est désormais en fabrication dans notre atelier ; vous serez informé·e de chaque étape.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3">
        <Button href="/compte">Suivre ma commande</Button>
        <Link href="/" className="underline-link text-xs">
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
