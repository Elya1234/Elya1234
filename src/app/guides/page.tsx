import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { guides } from "@/lib/data/guides";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Guides",
  description: "Nos guides pour bien choisir, comprendre et entretenir vos bijoux.",
};

export default function GuidesIndexPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Guides" }]} />
      <div className="mx-auto max-w-container px-4 pb-24 lg:px-12">
        <h1 className="mb-10 font-serif text-3xl lg:text-4xl">Nos guides</h1>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((g) => (
            <Link key={g.slug} href={`/guides/${g.slug}`} className="group">
              <div className="relative aspect-[3/2] overflow-hidden bg-gris-produit">
                <Image src={g.image} alt="" fill sizes="(min-width:1024px) 30vw, 90vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <p className="mt-3 font-serif text-xl">{g.title}</p>
              <p className="mt-1 text-sm text-gris-texte">{g.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
