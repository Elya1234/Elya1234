"use client";
import { useState } from "react";
import Link from "next/link";
import { brand } from "@/lib/data/brand";
import { shops } from "@/lib/data/shops";
import { cx } from "@/lib/utils";

const columns = [
  {
    title: "Collections",
    links: [
      { label: "Bagues de fiançailles", href: "/bijoux/bagues-de-fiancailles" },
      { label: "Alliances", href: "/bijoux/alliances" },
      { label: "Joaillerie", href: "/bijoux/joaillerie" },
      { label: "Nouveautés", href: "/bijoux/bagues-de-fiancailles?tri=nouveautes" },
    ],
  },
  {
    title: "Aide & services",
    links: [
      { label: "Nous contacter", href: "/contact" },
      { label: "Prendre rendez-vous", href: "/rendez-vous" },
      { label: "Guide des tailles", href: "/guides/guide-des-tailles" },
      { label: "Livraison & retours", href: "/guides/livraison-retours" },
    ],
  },
  {
    title: "La maison",
    links: [
      { label: "Notre histoire", href: "/notre-histoire" },
      { label: "Les 4C du diamant", href: "/guides/les-4c" },
      { label: "Naturel vs synthèse", href: "/guides/naturel-vs-synthese" },
      { label: "Mentions légales", href: "/mentions-legales" },
    ],
  },
  {
    title: "Nos boutiques",
    links: shops.map((s) => ({ label: s.city, href: `/boutiques/${s.slug}` })),
  },
];

export function Footer() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <footer className="bg-bleu-roi text-white">
      <div className="mx-auto max-w-container px-4 py-14 lg:px-12 lg:py-20">
        <div className="mb-12 grid gap-8 lg:hidden">
          {columns.map((col, i) => (
            <div key={col.title} className="border-b border-white/15 pb-4">
              <button
                type="button"
                aria-expanded={openIndex === i}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex min-h-[44px] w-full items-center justify-between text-left text-xs uppercase tracking-[0.1em]"
              >
                {col.title}
                <span className={cx("transition-transform", openIndex === i && "rotate-45")}>+</span>
              </button>
              <div className={cx("grid overflow-hidden transition-all duration-300", openIndex === i ? "grid-rows-[1fr] pt-3" : "grid-rows-[0fr]")}>
                <ul className="min-h-0 space-y-2.5 overflow-hidden">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm text-white/80 hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-14 hidden grid-cols-4 gap-8 lg:grid">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="mb-5 text-xs uppercase tracking-[0.1em] text-white/60">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="underline-link text-sm text-white/85 hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-6 border-t border-white/15 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <p className="font-serif text-2xl">{brand.shortName}</p>
          <div className="flex items-center gap-4 text-xs uppercase tracking-[0.08em] text-white/70">
            <button type="button" className="hover:text-white">FR ▾</button>
            <button type="button" className="hover:text-white">France (€) ▾</button>
          </div>
          <div className="flex items-center gap-4">
            <a href={brand.social.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white">
              Instagram
            </a>
            <a href={brand.social.pinterest} aria-label="Pinterest" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white">
              Pinterest
            </a>
            <a href={brand.social.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white">
              Facebook
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/15 pt-6 text-xs text-white/60 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-4">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>American Express</span>
            <span>Apple Pay</span>
            <span>Paiement en plusieurs fois</span>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/mentions-legales" className="hover:text-white">Mentions légales</Link>
            <Link href="/cgv" className="hover:text-white">CGV</Link>
            <Link href="/confidentialite" className="hover:text-white">Confidentialité</Link>
            <Link href="/cookies" className="hover:text-white">Gestion des cookies</Link>
          </div>
        </div>
        <p className="mt-6 text-[11px] text-white/40">© {new Date().getFullYear()} {brand.name}. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
