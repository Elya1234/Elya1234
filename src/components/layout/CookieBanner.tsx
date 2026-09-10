"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useCookieConsentStore } from "@/lib/store/cookieConsent";

export function CookieBanner() {
  const { choice, setChoice } = useCookieConsentStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted || choice !== null) return null;

  return (
    <div
      role="dialog"
      aria-label="Gestion des cookies"
      className="fixed inset-x-0 bottom-0 z-[150] border-t border-ligne bg-white p-5 shadow-popover"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 1.25rem)" }}
    >
      <div className="mx-auto flex max-w-container flex-col items-start gap-4 lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <p className="max-w-2xl text-xs text-gris-texte">
          Nous utilisons des cookies pour améliorer votre expérience et mesurer notre audience. Vous pouvez accepter ou refuser librement.
          Consultez notre{" "}
          <Link href="/cookies" className="underline">
            politique de cookies
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <Button variant="secondary" size="sm" onClick={() => setChoice("refused")}>
            Refuser
          </Button>
          <Button size="sm" onClick={() => setChoice("accepted")}>
            Accepter
          </Button>
        </div>
      </div>
    </div>
  );
}
