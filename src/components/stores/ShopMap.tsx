"use client";
import { useState } from "react";
import Link from "next/link";
import type { Shop } from "@/lib/types";
import { cx } from "@/lib/utils";

// Bornes approximatives de la France métropolitaine, pour positionner les repères sur la carte placeholder.
const BOUNDS = { minLat: 41.3, maxLat: 51.1, minLng: -5.2, maxLng: 9.6 };

function toPosition(lat: number, lng: number) {
  const x = ((lng - BOUNDS.minLng) / (BOUNDS.maxLng - BOUNDS.minLng)) * 100;
  const y = (1 - (lat - BOUNDS.minLat) / (BOUNDS.maxLat - BOUNDS.minLat)) * 100;
  return { x, y };
}

export function ShopMap({
  shops,
  query,
  selected,
  onSelect,
  linkToDetail = true,
}: {
  shops: Shop[];
  query: string;
  selected?: string | null;
  onSelect?: (slug: string) => void;
  linkToDetail?: boolean;
}) {
  const [internalActive, setInternalActive] = useState<string | null>(shops[0]?.slug ?? null);
  const active = selected !== undefined ? selected : internalActive;
  const setActive = onSelect ?? setInternalActive;
  const filtered = shops.filter((s) => `${s.name} ${s.city}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="grid gap-6 lg:grid-cols-[360px,1fr]">
      <ul className="flex flex-col divide-y divide-ligne border border-ligne">
        {filtered.map((shop) => (
          <li key={shop.slug} className={cx("p-4", active === shop.slug && "bg-ivoire")}>
            <button type="button" onClick={() => setActive(shop.slug)} className="flex w-full flex-col items-start gap-1 text-left">
              <span className="font-serif text-lg">{shop.name}</span>
              <span className="text-sm text-gris-texte">
                {shop.address}, {shop.postalCode}
              </span>
            </button>
            {linkToDetail && (
              <Link href={`/boutiques/${shop.slug}`} className="underline-link mt-1 inline-block text-xs">
                Voir la boutique
              </Link>
            )}
          </li>
        ))}
        {filtered.length === 0 && <li className="p-6 text-center text-sm text-gris-texte">Aucune boutique ne correspond à votre recherche.</li>}
      </ul>

      <div className="relative aspect-[4/3] overflow-hidden border border-ligne bg-[#E4E0D6] lg:aspect-auto">
        <svg viewBox="0 0 100 100" className="h-full w-full" preserveAspectRatio="none" aria-hidden="true">
          <rect width="100" height="100" fill="#E4E0D6" />
          <path d="M20 15 L45 8 L70 12 L88 25 L92 45 L82 65 L70 85 L50 92 L30 82 L12 60 L10 35 Z" fill="#D6D1C1" stroke="#1A2A63" strokeWidth="0.3" opacity="0.5" />
        </svg>
        {filtered.map((shop) => {
          const pos = toPosition(shop.lat, shop.lng);
          return (
            <button
              key={shop.slug}
              type="button"
              onClick={() => setActive(shop.slug)}
              aria-label={shop.name}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              className={cx(
                "absolute flex h-7 w-7 -translate-x-1/2 -translate-y-full items-center justify-center rounded-full border-2 border-white text-xs text-white shadow-popover transition-transform",
                active === shop.slug ? "z-10 scale-125 bg-bleu-roi" : "bg-noir-texte/70",
              )}
            >
              ●
            </button>
          );
        })}
      </div>
    </div>
  );
}
