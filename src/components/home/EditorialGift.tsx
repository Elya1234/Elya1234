import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function EditorialGift() {
  return (
    <section className="reveal bg-orange-rose/10 py-20 lg:py-30">
      <div className="mx-auto flex max-w-container flex-col items-center gap-10 px-4 text-center lg:px-12">
        <div className="relative aspect-square w-56 overflow-hidden rounded-full bg-gris-produit lg:w-72">
          <Image src="/placeholders/gift-guide.svg" alt="Guide cadeaux Elya Joaillerie" fill sizes="288px" className="object-cover" />
        </div>
        <div className="max-w-lg">
          <p className="font-script text-4xl text-dore">Votre gift guide</p>
          <h2 className="mt-2 font-serif text-2xl lg:text-3xl">Trouvez le bijou qui fera mouche</h2>
          <p className="mt-3 text-sm text-gris-texte">
            Anniversaire, demande en mariage, naissance : laissez-vous guider par notre sélection de pièces à offrir, classées par occasion et par budget.
          </p>
          <div className="mt-6">
            <Button href="/guides" variant="secondary">
              Découvrir le guide
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
