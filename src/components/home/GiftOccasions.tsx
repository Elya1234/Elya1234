import Image from "next/image";
import Link from "next/link";

const occasions = [
  { label: "Pour lui", href: "/bijoux/alliances", image: "/placeholders/occasion-lui.svg" },
  { label: "Pour elle", href: "/bijoux/bagues-de-fiancailles", image: "/placeholders/occasion-elle.svg" },
  { label: "Pour un anniversaire", href: "/bijoux/joaillerie?type=bracelet", image: "/placeholders/occasion-anniversaire.svg" },
  { label: "Pour des moments spéciaux", href: "/bijoux/joaillerie?type=collier", image: "/placeholders/occasion-moments.svg" },
];

export function GiftOccasions() {
  return (
    <section className="reveal py-4 lg:py-6">
      <div className="mx-auto max-w-container px-4 lg:px-12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
          {occasions.map((o) => (
            <Link key={o.label} href={o.href} className="group relative aspect-[4/5] overflow-hidden bg-gris-produit lg:aspect-[16/12]">
              <Image src={o.image} alt="" fill sizes="(min-width:1024px) 45vw, 90vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/35" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center text-white">
                <p className="font-serif text-3xl lg:text-4xl">{o.label}</p>
                <span className="underline-link text-xs uppercase tracking-[0.1em]">Découvrir</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
