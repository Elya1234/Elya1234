import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative flex min-h-[70dvh] items-end overflow-hidden bg-noir-texte lg:min-h-[88vh]">
      <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2">
        <div className="relative hidden lg:block">
          <Image src="/placeholders/hero-left.svg" alt="" fill priority sizes="50vw" className="object-cover" />
        </div>
        <div className="relative">
          <Image src="/placeholders/hero-right.svg" alt="Création de bijoux Elya Joaillerie" fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
      </div>
      <div className="absolute inset-0 bg-black/25" aria-hidden="true" />
      <div className="relative z-10 mx-auto w-full max-w-container px-4 pb-14 pb-16 text-center text-white lg:px-12 lg:pb-24">
        <h1 className="font-serif text-4xl leading-tight lg:text-5xl">
          La bague de fiançailles
          <br />
          <em className="italic">que vous avez imaginée</em>
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-white/85">
          Diamants naturels ou de synthèse, métaux précieux, façonnage à la main dans notre atelier français.
        </p>
        <div className="mt-8">
          <Button href="/bijoux/bagues-de-fiancailles">Découvrez la nouvelle collection</Button>
        </div>
      </div>
    </section>
  );
}
