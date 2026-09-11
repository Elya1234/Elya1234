import Image from "next/image";
import { brand } from "@/lib/data/brand";
import { UnderlineLink } from "@/components/ui/UnderlineLink";

export function SocialQuote() {
  return (
    <section className="reveal mx-auto max-w-container px-4 py-20 lg:px-12">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-[4/5] overflow-hidden bg-gris-produit">
          <Image src="/placeholders/instagram-elya.svg" alt="" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
        </div>
        <div className="text-center lg:text-left">
          <p className="mb-3 text-xs uppercase tracking-[0.15em] text-gris-texte">Entrez dans l&apos;univers Elya</p>
          <a
            href={brand.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="font-serif text-4xl text-bleu-roi hover:underline lg:text-5xl"
          >
            @elya_joaillerie
          </a>
          <p className="mt-5">
            <UnderlineLink href={brand.social.instagram} target="_blank" rel="noopener noreferrer">
              Retrouvez vos créations préférées
            </UnderlineLink>
          </p>
        </div>
      </div>
      <blockquote className="mt-16 border-t border-ligne pt-10 text-center">
        <p className="mx-auto max-w-3xl font-serif text-2xl italic leading-relaxed lg:text-3xl">
          « L&apos;excellence joaillière prend un nouveau chemin : le vôtre. Une création directe, sincère et sans
          détour. »
        </p>
      </blockquote>
    </section>
  );
}
