import Link from "next/link";
import { allShapes, shapeLabels } from "@/lib/data/shapes";
import { ShapeIcon } from "@/components/ui/ShapeIcon";

export function ShapeSelector() {
  return (
    <section className="reveal mx-auto max-w-container px-4 py-20 lg:px-12 lg:py-30">
      <div className="mb-10 flex items-end justify-between gap-4 border-b border-ligne pb-4">
        <h2 className="font-serif text-3xl lg:text-4xl">
          La forme <em className="italic">de vos envies</em>
        </h2>
        <Link href="/bijoux/bagues-de-fiancailles" className="underline-link hidden text-xs sm:block">
          Découvrir ›
        </Link>
      </div>
      <div className="flex gap-6 overflow-x-auto pb-2 no-scrollbar lg:justify-between lg:gap-4">
        {allShapes.map((shape) => (
          <Link
            key={shape}
            href={`/bijoux/bagues-de-fiancailles?forme=${shape}`}
            className="group flex shrink-0 flex-col items-center gap-3"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-ligne text-noir-texte transition-colors group-hover:border-bleu-roi group-hover:text-bleu-roi">
              <ShapeIcon shape={shape} />
            </span>
            <span className="text-xs uppercase tracking-[0.06em] text-gris-texte group-hover:text-noir-texte">{shapeLabels[shape]}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
