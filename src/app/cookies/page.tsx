"use client";
import { useEffect, useState } from "react";
import { LegalPage } from "@/components/legal/LegalPage";
import { Button } from "@/components/ui/Button";
import { useCookieConsentStore } from "@/lib/store/cookieConsent";

export default function CookiesPage() {
  const { choice, setChoice } = useCookieConsentStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <LegalPage title="Gestion des cookies">
      <p>
        Ce site utilise des cookies strictement nécessaires à son fonctionnement (panier, préférences), ainsi que des cookies de mesure d&apos;audience
        soumis à votre consentement.
      </p>
      {mounted && (
        <div className="not-prose my-6 border border-ligne p-5">
          <p className="mb-3 text-sm text-noir-texte">
            Statut actuel :{" "}
            <strong>{choice === "accepted" ? "Cookies acceptés" : choice === "refused" ? "Cookies refusés" : "Aucun choix enregistré"}</strong>
          </p>
          <div className="flex gap-3">
            <Button size="sm" variant="secondary" onClick={() => setChoice("refused")}>
              Refuser
            </Button>
            <Button size="sm" onClick={() => setChoice("accepted")}>
              Accepter
            </Button>
          </div>
        </div>
      )}
      <h2>Cookies nécessaires</h2>
      <p>Panier, liste d&apos;envies, préférences d&apos;affichage : toujours actifs, ils ne nécessitent pas de consentement.</p>
      <h2>Cookies de mesure d&apos;audience</h2>
      <p>Activés uniquement si vous les acceptez, ils nous permettent de comprendre l&apos;usage du site de façon anonyme.</p>
    </LegalPage>
  );
}
