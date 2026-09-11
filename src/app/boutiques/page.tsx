"use client";
import { useState } from "react";
import { shops } from "@/lib/data/shops";
import { ShopMap } from "@/components/stores/ShopMap";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export default function StoresPage() {
  const [query, setQuery] = useState("");

  return (
    <>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Nos boutiques" }]} />
      <div className="mx-auto max-w-container px-4 pb-24 lg:px-12">
        <h1 className="mb-2 font-serif text-3xl lg:text-4xl">Nos boutiques</h1>
        <p className="mb-8 text-sm text-gris-texte">Retrouvez nos joailliers-conseil dans l&apos;une de nos quatre boutiques.</p>
        <label htmlFor="shop-search" className="sr-only">
          Rechercher une boutique
        </label>
        <input
          id="shop-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher une ville, une adresse…"
          className="mb-6 min-h-[48px] w-full max-w-md border border-ligne px-4 text-sm outline-none focus:border-bleu-roi"
        />
        <ShopMap shops={shops} query={query} />
      </div>
    </>
  );
}
