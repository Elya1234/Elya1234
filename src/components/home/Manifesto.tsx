import Image from "next/image";
import { UnderlineLink } from "@/components/ui/UnderlineLink";
import { brand } from "@/lib/data/brand";

export function Manifesto() {
  return (
    <section className="reveal mx-auto max-w-container px-4 py-20 lg:px-12 lg:py-30">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-script text-4xl text-dore">Nous sommes {brand.shortName}</p>
        <p className="mt-4 font-serif text-2xl leading-snug lg:text-3xl">
          Une joaillerie française qui façonne à la main chaque bague, chaque alliance, chaque diamant sélectionné avec la même exigence.
        </p>
        <div className="mt-6">
          <UnderlineLink href="/notre-histoire">Découvrez {brand.shortName}</UnderlineLink>
        </div>
      </div>
      <div className="mt-14 grid grid-cols-2 gap-4 lg:gap-6">
        <div className="relative aspect-[4/5] overflow-hidden bg-gris-produit">
          <Image src="/placeholders/manifesto-1.svg" alt="Notre atelier de joaillerie" fill sizes="(min-width: 1024px) 45vw, 50vw" className="object-cover" />
        </div>
        <div className="relative aspect-[4/5] overflow-hidden bg-gris-produit">
          <Image src="/placeholders/manifesto-2.svg" alt="Savoir-faire artisanal" fill sizes="(min-width: 1024px) 45vw, 50vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
