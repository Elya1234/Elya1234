import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getGuide, guides } from "@/lib/data/guides";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const guide = getGuide(params.slug);
  if (!guide) return {};
  return { title: guide.title, description: guide.excerpt };
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = getGuide(params.slug);
  if (!guide) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.excerpt,
    image: `https://www.elya-joaillerie.fr${guide.image}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Guides", href: "/guides" }, { label: guide.title }]} />
      <div className="mx-auto grid max-w-container gap-12 px-4 pb-24 lg:grid-cols-[220px,1fr] lg:px-12">
        <aside className="hidden lg:block">
          <p className="mb-3 text-xs uppercase tracking-[0.08em] text-gris-texte">Sommaire</p>
          <ul className="space-y-2 border-l border-ligne text-sm">
            {guide.sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="block border-l-2 border-transparent py-1 pl-4 hover:border-vert-profond hover:text-vert-profond">
                  {s.heading}
                </a>
              </li>
            ))}
          </ul>
        </aside>
        <article>
          <div className="relative mb-8 aspect-[3/1] overflow-hidden bg-gris-produit">
            <Image src={guide.image} alt="" fill sizes="900px" className="object-cover" />
          </div>
          <h1 className="mb-6 font-serif text-3xl lg:text-4xl">{guide.title}</h1>
          {guide.sections.map((s) => (
            <section key={s.id} id={s.id} className="mb-8 scroll-mt-32">
              <h2 className="mb-3 font-serif text-2xl">{s.heading}</h2>
              {s.body.map((p, i) => (
                <p key={i} className="mb-3 text-sm leading-relaxed text-gris-texte">
                  {p}
                </p>
              ))}
            </section>
          ))}
          <div className="mt-10 border-t border-ligne pt-8">
            <p className="mb-3 text-sm text-gris-texte">Une question sur ce sujet ?</p>
            <Button href="/rendez-vous">Parler à un joaillier-conseil</Button>
          </div>
        </article>
      </div>
    </>
  );
}
