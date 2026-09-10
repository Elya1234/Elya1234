import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { brand } from "@/lib/data/brand";

export const metadata: Metadata = { title: "Mentions légales" };

export default function LegalNoticePage() {
  return (
    <LegalPage title="Mentions légales">
      <h2>Éditeur du site</h2>
      <p>
        {brand.name} — Société par actions simplifiée au capital de 50 000 € — RCS Paris 000 000 000 — Siège social : 12 Place Vendôme, 75001 Paris.
        Directeur de la publication : la direction de {brand.name}.
      </p>
      <h2>Hébergement</h2>
      <p>Ce site est hébergé par un prestataire d&apos;hébergement web professionnel établi dans l&apos;Union européenne.</p>
      <h2>Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des contenus présents sur ce site (textes, images, logos) est protégé par le droit de la propriété intellectuelle et demeure la
        propriété exclusive de {brand.name}, sauf mention contraire.
      </p>
      <h2>Contact</h2>
      <p>{brand.email} — {brand.phone}</p>
    </LegalPage>
  );
}
