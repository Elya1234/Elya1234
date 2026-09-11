import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function EditorialTile() {
  return (
    <div className="relative col-span-2 flex flex-col items-center justify-center overflow-hidden bg-orange-rose-texte p-8 text-center text-white lg:col-span-1">
      <Image src="/placeholders/appointment.svg" alt="" fill sizes="400px" className="object-cover opacity-40" />
      <div className="relative">
        <p className="font-serif text-xl">Besoin de conseils ?</p>
        <p className="mt-2 text-sm text-white/90">
          Prenez rendez-vous avec l&apos;un de nos experts, en boutique ou en ligne.
        </p>
        <div className="mt-4">
          <Button href="/rendez-vous" variant="outlineLight">
            Prendre RDV
          </Button>
        </div>
      </div>
    </div>
  );
}
