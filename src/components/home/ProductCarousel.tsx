"use client";
import { useRef } from "react";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/product/ProductCard";

export function ProductCarousel({ title, seeAllHref, products }: { title: string; seeAllHref: string; products: Product[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollBy(delta: number) {
    scrollerRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  }

  return (
    <section className="reveal mx-auto max-w-container px-4 py-16 lg:px-12">
      <div className="mb-8 flex items-end justify-between gap-4 border-b border-ligne pb-4">
        <h2 className="font-serif text-2xl lg:text-3xl">{title}</h2>
        <div className="flex items-center gap-4">
          <Link href={seeAllHref} className="underline-link hidden text-xs sm:block">
            Voir tout
          </Link>
          <div className="hidden gap-2 lg:flex">
            <button
              type="button"
              aria-label="Précédent"
              onClick={() => scrollBy(-360)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ligne hover:border-bleu-roi"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Suivant"
              onClick={() => scrollBy(360)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ligne hover:border-bleu-roi"
            >
              ›
            </button>
          </div>
        </div>
      </div>
      <div ref={scrollerRef} className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 no-scrollbar">
        {products.map((p) => (
          <div key={p.slug} className="w-[46vw] shrink-0 snap-start sm:w-[30vw] lg:w-[23%]">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
