"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { shops } from "@/lib/data/shops";
import { Button } from "@/components/ui/Button";
import { cx } from "@/lib/utils";

export function BoutiquesSection() {
  const [index, setIndex] = useState(0);
  const shop = shops[index];

  function go(delta: number) {
    setIndex((i) => (i + delta + shops.length) % shops.length);
  }

  return (
    <section className="reveal bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-container px-4 lg:px-12">
        <div className="mb-10 flex items-center gap-6">
          <h2 className="whitespace-nowrap font-serif text-3xl lg:text-4xl">Rencontrons-nous</h2>
          <div className="h-px flex-1 bg-ligne" />
        </div>
        <div className="grid gap-10 lg:grid-cols-[1fr,1.4fr] lg:items-start">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.1em] text-bleu-roi">Nos boutiques</p>
            <p className="mb-6 max-w-sm text-sm text-gris-texte">
              Découvrez l&apos;univers Elya en boutique et laissez-vous guider par nos joailliers-conseil.
            </p>
            <ul className="mb-8 flex flex-col gap-3">
              {shops.map((s, i) => (
                <li key={s.slug}>
                  <Link
                    href={`/boutiques/${s.slug}`}
                    onMouseEnter={() => setIndex(i)}
                    className={cx("underline-link text-lg", i === index && "text-bleu-roi")}
                  >
                    {s.city}
                  </Link>
                </li>
              ))}
            </ul>
            <Button href="/rendez-vous">Réserver un rendez-vous</Button>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-gris-produit">
            <Image src={shop.image} alt={shop.name} fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" />
            <button
              type="button"
              aria-label="Boutique précédente"
              onClick={() => go(-1)}
              className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-lg hover:bg-white"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Boutique suivante"
              onClick={() => go(1)}
              className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-lg hover:bg-white"
            >
              ›
            </button>
            <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-4 text-sm text-white">{shop.name}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
