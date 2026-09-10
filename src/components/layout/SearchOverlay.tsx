"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { products } from "@/lib/data/products";
import { popularSearches } from "@/lib/data/nav";
import { categories } from "@/lib/data/categories";
import { formatPrice, cx } from "@/lib/utils";

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setQuery("");
      setDebounced("");
      setActiveIndex(-1);
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
      return () => {
        clearTimeout(t);
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(query), 250);
    return () => clearTimeout(t);
  }, [query]);

  const results = useMemo(() => {
    if (!debounced.trim()) return [];
    const q = debounced.trim().toLowerCase();
    const productResults = products.filter(
      (p) => p.name.toLowerCase().includes(q) || p.subtitle.toLowerCase().includes(q) || p.category.label.toLowerCase().includes(q),
    );
    const categoryResults = categories.filter((c) => c.label.toLowerCase().includes(q));
    return { productResults, categoryResults };
  }, [debounced]);

  const flatHrefs = useMemo(() => {
    if (!results || Array.isArray(results)) return [];
    return [
      ...results.categoryResults.map((c) => `/bijoux/${c.slug}`),
      ...results.productResults.map((p) => `/produit/${p.slug}`),
    ];
  }, [results]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") return onClose();
    if (!flatHrefs.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % flatHrefs.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + flatHrefs.length) % flatHrefs.length);
    } else if (e.key === "Enter" && activeIndex >= 0) {
      router.push(flatHrefs[activeIndex]);
      onClose();
    }
  }

  if (!open) return null;
  const hasQuery = debounced.trim().length > 0;
  const noResults = hasQuery && results && !Array.isArray(results) && results.productResults.length === 0 && results.categoryResults.length === 0;

  return (
    <div className="fixed inset-0 z-[110] animate-fade-in overflow-y-auto bg-white" role="dialog" aria-modal="true" aria-label="Recherche">
      <div className="mx-auto max-w-container px-4 py-6 lg:px-12 lg:py-10">
        <div className="flex items-center gap-4 border-b border-ligne pb-4">
          <svg width="20" height="20" viewBox="0 0 19 19" fill="none" aria-hidden="true" className="shrink-0">
            <circle cx="8.5" cy="8.5" r="6.5" stroke="currentColor" strokeWidth="1.3" />
            <path d="M13.5 13.5 18 18" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Entrez votre recherche"
            aria-label="Rechercher un produit"
            className="min-h-[44px] flex-1 border-none text-xl outline-none placeholder:text-gris-texte lg:text-2xl"
          />
          <button type="button" onClick={onClose} aria-label="Fermer la recherche" className="flex h-11 w-11 shrink-0 items-center justify-center text-2xl">
            ×
          </button>
        </div>

        {!hasQuery && (
          <div className="grid gap-10 py-10 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.1em] text-gris-texte">Recherches populaires</p>
              <ul className="flex flex-col gap-3">
                {popularSearches.map((s) => (
                  <li key={s}>
                    <button type="button" onClick={() => setQuery(s)} className="underline-link text-lg">
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.1em] text-gris-texte">Nos collections</p>
              <div className="grid grid-cols-2 gap-4">
                {categories.slice(0, 4).map((c) => (
                  <Link key={c.slug} href={`/bijoux/${c.slug}`} onClick={onClose} className="group relative aspect-square overflow-hidden bg-gris-produit">
                    <Image src="/placeholders/category-bagues.svg" alt="" fill sizes="200px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-3 text-xs uppercase tracking-[0.06em] text-white">
                      {c.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {hasQuery && !Array.isArray(results) && (
          <div className="py-8">
            {noResults ? (
              <div className="py-12 text-center">
                <p className="mb-4 text-lg">Aucun résultat pour « {debounced} ».</p>
                <p className="mb-4 text-sm text-gris-texte">Essayez l&apos;une de ces recherches :</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {popularSearches.map((s) => (
                    <button key={s} type="button" onClick={() => setQuery(s)} className="underline-link text-sm">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {results.categoryResults.length > 0 && (
                  <div>
                    <p className="mb-3 text-xs uppercase tracking-[0.1em] text-gris-texte">Collections</p>
                    <ul className="flex flex-col">
                      {results.categoryResults.map((c, i) => (
                        <li key={c.slug}>
                          <Link
                            href={`/bijoux/${c.slug}`}
                            onClick={onClose}
                            className={cx("block min-h-[44px] py-2 text-lg", activeIndex === i && "text-vert-profond underline")}
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {results.productResults.length > 0 && (
                  <div>
                    <p className="mb-3 text-xs uppercase tracking-[0.1em] text-gris-texte">Produits</p>
                    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                      {results.productResults.map((p, i) => {
                        const flatIndex = results.categoryResults.length + i;
                        return (
                          <li key={p.slug}>
                            <Link
                              href={`/produit/${p.slug}`}
                              onClick={onClose}
                              className={cx("block", activeIndex === flatIndex && "ring-1 ring-vert-profond")}
                            >
                              <div className="relative aspect-[4/5] bg-gris-produit">
                                <Image src={p.images[0]} alt={p.name} fill sizes="240px" className="object-cover" />
                              </div>
                              <p className="mt-2 font-serif text-base">{p.name}</p>
                              <p className="text-xs text-gris-texte">À partir de {formatPrice(p.basePrice)}</p>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
