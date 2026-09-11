"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { brand } from "@/lib/data/brand";
import { cx } from "@/lib/utils";

export function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShowTop(window.scrollY > 600);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-20 right-4 z-40 flex flex-col items-end gap-3 lg:bottom-8 lg:right-8">
      {contactOpen && (
        <div className="mb-1 w-64 rounded-sm border border-ligne bg-white p-4 shadow-popover animate-fade-in-up">
          <p className="mb-3 text-xs uppercase tracking-[0.08em] text-gris-texte">Une question ?</p>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <a href="https://wa.me/33600000000" target="_blank" rel="noopener noreferrer" className="flex min-h-[40px] items-center underline-link">
                WhatsApp
              </a>
            </li>
            <li>
              <a href={brand.phoneHref} className="flex min-h-[40px] items-center underline-link">
                {brand.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${brand.email}`} className="flex min-h-[40px] items-center underline-link">
                {brand.email}
              </a>
            </li>
            <li>
              <Link href="/rendez-vous" className="flex min-h-[40px] items-center underline-link">
                Prendre rendez-vous
              </Link>
            </li>
          </ul>
        </div>
      )}
      <button
        type="button"
        onClick={() => setContactOpen((o) => !o)}
        aria-expanded={contactOpen}
        aria-label="Contact"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-bleu-roi text-white shadow-popover transition-transform hover:scale-105"
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          <path d="M2 5.5h18v11H8l-4 3.2v-3.2H2v-11Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Retour en haut"
        className={cx(
          "flex h-11 w-11 items-center justify-center rounded-full border border-ligne bg-white shadow-card transition-all",
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0",
        )}
      >
        ↑
      </button>
    </div>
  );
}
