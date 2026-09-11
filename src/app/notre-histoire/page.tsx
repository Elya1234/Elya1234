import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { brand } from "@/lib/data/brand";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Notre histoire",
  description: `Découvrez l'histoire et le savoir-faire de ${brand.name}.`,
};

export default function AboutPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Notre histoire" }]} />
      <div className="mx-auto max-w-container px-4 pb-24 lg:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-script text-4xl text-dore">Nous sommes {brand.shortName}</p>
          <h1 className="mt-2 font-serif text-3xl lg:text-4xl">Une joaillerie française, façonnée à la main</h1>
        </div>

        <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/5] overflow-hidden bg-gris-produit">
            <Image src="/placeholders/manifesto-1.svg" alt="Notre atelier" fill sizes="(min-width:1024px) 45vw, 90vw" className="object-cover" />
          </div>
          <div>
            <h2 className="mb-3 font-serif text-2xl">Un atelier, une exigence</h2>
            <p className="text-sm leading-relaxed text-gris-texte">
              Depuis notre atelier, chaque bague de fiançailles, chaque alliance et chaque pièce de joaillerie est façonnée à la main par nos artisans joailliers.
              Nous sélectionnons chaque diamant — naturel ou de synthèse — avec la même exigence, et accompagnons chacun d&apos;eux d&apos;un certificat IGI ou GIA.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:items-center">
          <div className="order-2 lg:order-1">
            <h2 className="mb-3 font-serif text-2xl">Un accompagnement sur mesure</h2>
            <p className="text-sm leading-relaxed text-gris-texte">
              En boutique, par téléphone ou en visioconférence, nos joailliers-conseil vous accompagnent à chaque étape : choix de la monture, sélection du
              diamant, ajustement de la taille. Une garantie à vie couvre l&apos;entretien et le contrôle du sertissage.
            </p>
          </div>
          <div className="relative order-1 aspect-[4/5] overflow-hidden bg-gris-produit lg:order-2">
            <Image src="/placeholders/manifesto-2.svg" alt="Savoir-faire artisanal" fill sizes="(min-width:1024px) 45vw, 90vw" className="object-cover" />
          </div>
        </div>

        <div className="mt-16 text-center">
          <Button href="/rendez-vous">Prendre rendez-vous</Button>
        </div>
      </div>
    </>
  );
}
