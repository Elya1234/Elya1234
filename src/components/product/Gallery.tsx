"use client";
import { useState } from "react";
import Image from "next/image";
import { Modal } from "@/components/ui/Modal";
import { cx } from "@/lib/utils";

export function Gallery({ images, name }: { images: string[]; name: string }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mobileIndex, setMobileIndex] = useState(0);

  return (
    <div>
      {/* Desktop mosaic */}
      <div className="hidden grid-cols-2 gap-3 lg:grid">
        <button type="button" onClick={() => setLightboxIndex(0)} className="relative col-span-2 aspect-[4/5] overflow-hidden bg-gris-produit">
          <Image src={images[0]} alt={name} fill sizes="50vw" priority className="object-cover" />
        </button>
        {images.slice(1, 3).map((img, i) => (
          <button key={img} type="button" onClick={() => setLightboxIndex(i + 1)} className="relative aspect-square overflow-hidden bg-gris-produit">
            <Image src={img} alt={`${name} — vue ${i + 2}`} fill sizes="25vw" className="object-cover" />
          </button>
        ))}
      </div>

      {/* Mobile swipeable carousel */}
      <div className="lg:hidden">
        <div
          className="flex snap-x snap-mandatory overflow-x-auto no-scrollbar"
          onScroll={(e) => {
            const el = e.currentTarget;
            const idx = Math.round(el.scrollLeft / el.clientWidth);
            setMobileIndex(idx);
          }}
        >
          {images.map((img, i) => (
            <button key={img} type="button" onClick={() => setLightboxIndex(i)} className="relative aspect-[4/5] w-full shrink-0 snap-start bg-gris-produit">
              <Image src={img} alt={`${name} — vue ${i + 1}`} fill sizes="100vw" priority={i === 0} className="object-cover" />
            </button>
          ))}
        </div>
        <div className="mt-3 flex justify-center gap-1.5">
          {images.map((_, i) => (
            <span key={i} className={cx("h-0.5 w-6 rounded-full transition-colors", i === mobileIndex ? "bg-noir-texte" : "bg-ligne")} />
          ))}
        </div>
      </div>

      <Modal open={lightboxIndex !== null} onClose={() => setLightboxIndex(null)} title={name} className="max-w-3xl">
        {lightboxIndex !== null && (
          <div className="relative aspect-square w-full">
            <Image src={images[lightboxIndex]} alt={`${name} — vue agrandie`} fill sizes="768px" className="object-contain" />
          </div>
        )}
        {lightboxIndex !== null && (
          <div className="mt-4 flex justify-center gap-2">
            {images.map((img, i) => (
              <button
                key={img}
                type="button"
                onClick={() => setLightboxIndex(i)}
                className={cx("relative h-16 w-16 overflow-hidden border", i === lightboxIndex ? "border-vert-profond" : "border-ligne")}
              >
                <Image src={img} alt="" fill sizes="64px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
}
