"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { brand } from "@/lib/data/brand";

const STORAGE_KEY = "elya-announcement-dismissed";

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setDismissed(localStorage.getItem(STORAGE_KEY) === "true");
  }, []);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % brand.announcement.length), 5000);
    return () => clearInterval(t);
  }, []);

  if (dismissed) return null;

  return (
    <div className="relative flex min-h-[36px] items-center justify-center bg-vert-profond px-10 py-2 text-center text-[11px] uppercase tracking-[0.08em] text-white">
      <Link href="/boutiques" className="underline-link">
        {brand.announcement[index]}
      </Link>
      <button
        type="button"
        onClick={() => {
          setDismissed(true);
          localStorage.setItem(STORAGE_KEY, "true");
        }}
        aria-label="Fermer le bandeau d'annonce"
        className="absolute right-2 flex h-8 w-8 items-center justify-center text-white/80 hover:text-white"
      >
        ×
      </button>
    </div>
  );
}
