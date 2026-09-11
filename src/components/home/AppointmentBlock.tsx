import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function AppointmentBlock() {
  return (
    <section className="reveal grid grid-cols-1 lg:grid-cols-2">
      <div className="relative aspect-[4/3] lg:aspect-auto">
        <Image src="/placeholders/appointment.svg" alt="Rendez-vous avec un joaillier-conseil" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
      </div>
      <div className="flex flex-col justify-center bg-orange-rose-texte px-6 py-16 text-white lg:px-16">
        <h2 className="font-serif text-3xl">Besoin de conseils ?</h2>
        <p className="mt-3 max-w-sm text-sm text-white/90">
          Nos joailliers-conseil vous accompagnent en boutique, par téléphone ou en visioconférence pour composer la pièce qui vous correspond.
        </p>
        <div className="mt-6">
          <Button href="/rendez-vous" variant="secondary" className="border-white text-white hover:bg-white hover:text-orange-rose-texte">
            Prendre rendez-vous
          </Button>
        </div>
      </div>
    </section>
  );
}
