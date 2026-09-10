import { Button } from "@/components/ui/Button";

export function EditorialTile() {
  return (
    <div className="col-span-2 flex flex-col items-center justify-center bg-vert-sauge-texte p-8 text-center text-white lg:col-span-1">
      <p className="font-serif text-xl">Besoin de conseils ?</p>
      <p className="mt-2 text-sm text-white/90">
        Prenez rendez-vous avec l&apos;un de nos experts, en boutique ou en ligne.
      </p>
      <div className="mt-4">
        <Button href="/rendez-vous" variant="secondary" className="border-white text-white hover:bg-white hover:text-vert-sauge-texte">
          Prendre RDV
        </Button>
      </div>
    </div>
  );
}
