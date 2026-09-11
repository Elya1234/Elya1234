"use client";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getProduct } from "@/lib/data/products";
import { allRingStyles, ringStyleLabels, ringStyleSample } from "@/lib/data/ringStyles";
import type { RingStyle } from "@/lib/types";
import { cx } from "@/lib/utils";

export function StyleFilterStrip() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentStyle = searchParams.get("style");

  function toggle(style: RingStyle) {
    const params = new URLSearchParams(searchParams.toString());
    if (currentStyle === style) params.delete("style");
    else params.set("style", style);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border-b border-ligne bg-white">
      <div className="mx-auto flex max-w-container gap-6 overflow-x-auto px-4 py-5 no-scrollbar lg:gap-10 lg:px-12">
        {allRingStyles.map((style) => {
          const sample = getProduct(ringStyleSample[style]);
          const active = currentStyle === style;
          return (
            <button
              key={style}
              type="button"
              onClick={() => toggle(style)}
              className={cx(
                "flex shrink-0 items-center gap-2.5 border-b-2 pb-1 text-sm transition-colors",
                active ? "border-bleu-roi text-bleu-roi" : "border-transparent text-noir-texte hover:text-bleu-roi",
              )}
            >
              {sample && (
                <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gris-produit">
                  <Image src={sample.images[0]} alt="" fill sizes="40px" className="object-cover" />
                </span>
              )}
              <span className="font-serif text-base">{ringStyleLabels[style]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
