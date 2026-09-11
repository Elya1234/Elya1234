import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/data/categories";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Nos collections",
  description: "Découvrez toutes les collections Elya Joaillerie : bagues de fiançailles, alliances et joaillerie.",
};

export default function BijouxIndexPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Nos collections" }]} />
      <div className="mx-auto max-w-container px-4 pb-20 lg:px-12">
        <h1 className="mb-10 font-serif text-3xl lg:text-4xl">Nos collections</h1>
        <div className="grid gap-6 sm:grid-cols-3">
          {categories.map((c) => (
            <Link key={c.slug} href={`/bijoux/${c.slug}`} className="group">
              <div className="relative aspect-[4/5] overflow-hidden bg-gris-produit">
                <Image src={c.image} alt="" fill sizes="(min-width:1024px) 30vw, 90vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <p className="mt-3 font-serif text-xl">{c.label}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
