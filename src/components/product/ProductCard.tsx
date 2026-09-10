"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metal, Product } from "@/lib/types";
import { formatPrice, cx } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { MetalSwatch } from "@/components/ui/MetalSwatch";
import { useWishlistStore } from "@/lib/store/wishlist";

export function ProductCard({ product }: { product: Product }) {
  const [metal, setMetal] = useState<Metal>(product.metals[0]);
  const [mounted, setMounted] = useState(false);
  const isSaved = useWishlistStore((s) => s.isSaved(product.slug));
  const toggle = useWishlistStore((s) => s.toggle);

  useEffect(() => setMounted(true), []);

  return (
    <div className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-gris-produit">
        <Link href={`/produit/${product.slug}`} className="block h-full w-full">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 23vw, 45vw"
            className="object-cover transition-opacity duration-500 group-hover:opacity-0"
          />
          {product.hoverImage && (
            <Image
              src={product.hoverImage}
              alt=""
              fill
              sizes="(min-width: 1024px) 23vw, 45vw"
              className="scale-[1.03] object-cover opacity-0 transition-all duration-700 group-hover:opacity-100"
            />
          )}
        </Link>
        {product.isNew && (
          <div className="absolute left-3 top-3">
            <Badge>Nouveautés</Badge>
          </div>
        )}
        <button
          type="button"
          onClick={() => toggle(product.slug)}
          aria-pressed={isSaved}
          aria-label={isSaved ? "Retirer de la liste d'envies" : "Ajouter à la liste d'envies"}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90"
        >
          <svg width="17" height="17" viewBox="0 0 19 19" fill={mounted && isSaved ? "#0E3B2E" : "none"} aria-hidden="true">
            <path
              d="M9.5 16.5S2 12 2 6.9C2 4.2 4 2.5 6.3 2.5c1.5 0 2.7.8 3.2 1.7.5-.9 1.7-1.7 3.2-1.7C15 2.5 17 4.2 17 6.9c0 5.1-7.5 9.6-7.5 9.6Z"
              stroke="#0E3B2E"
              strokeWidth="1.3"
            />
          </svg>
        </button>
      </div>
      <Link href={`/produit/${product.slug}`} className="mt-3 block">
        <p className="font-serif text-lg">{product.name}</p>
        <p className="text-sm text-gris-texte">À partir de {formatPrice(product.basePrice)}</p>
      </Link>
      <div className="mt-2 flex gap-1.5">
        {product.metals.map((m) => (
          <MetalSwatch key={m} metal={m} size="sm" active={m === metal} onClick={() => setMetal(m)} />
        ))}
      </div>
    </div>
  );
}
