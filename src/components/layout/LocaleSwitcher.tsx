"use client";
import { useEffect, useRef, useState } from "react";
import { cx } from "@/lib/utils";

interface Option {
  code: string;
  label: string;
  available: boolean;
}

const LANGUAGES: Option[] = [
  { code: "fr", label: "Français", available: true },
  { code: "en", label: "English", available: false },
];

const REGIONS: Option[] = [
  { code: "fr", label: "France (€)", available: true },
  { code: "be", label: "Belgique (€)", available: false },
  { code: "ch", label: "Suisse (CHF)", available: false },
];

/**
 * Le site n'est disponible qu'en français / France pour le moment : ce sélecteur est donc
 * réellement interactif (ouvre, ferme, affiche l'option active) mais n'offre qu'un seul choix
 * actionnable, plutôt que de simuler un multi-langue qui n'existe pas encore.
 */
export function LocaleSwitcher({
  kind,
  className,
  triggerClassName = "hover:text-noir-texte",
  direction = "down",
}: {
  kind: "lang" | "region";
  className?: string;
  triggerClassName?: string;
  direction?: "down" | "up";
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const options = kind === "lang" ? LANGUAGES : REGIONS;
  const current = options[0];

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className={cx("relative", className)} ref={ref}>
      <button type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)} className={triggerClassName}>
        {kind === "lang" ? "FR" : current.label} ▾
      </button>
      {open && (
        <ul
          role="listbox"
          aria-label={kind === "lang" ? "Choisir la langue" : "Choisir la région"}
          className={cx(
            "absolute left-0 z-20 w-48 rounded-sm border border-ligne bg-white p-2 text-noir-texte shadow-popover animate-fade-in",
            direction === "up" ? "bottom-full mb-2" : "top-full mt-2",
          )}
        >
          {options.map((opt) => (
            <li key={opt.code}>
              <button
                type="button"
                role="option"
                aria-selected={opt.available}
                disabled={!opt.available}
                onClick={() => setOpen(false)}
                className={cx(
                  "flex min-h-[40px] w-full items-center justify-between rounded-sm px-3 text-left text-sm normal-case tracking-normal",
                  opt.available ? "font-medium text-noir-texte hover:bg-ivoire" : "cursor-not-allowed text-gris-texte",
                )}
              >
                {opt.label}
                {opt.available ? <span aria-hidden="true">✓</span> : <span className="text-[10px]">Bientôt</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
