import { UnderlineLink } from "@/components/ui/UnderlineLink";

const cards = [
  {
    title: "Choisissez son style et son métal",
    text: "Solitaire, halo ou trilogie : composez la monture qui vous ressemble, en or ou en platine.",
    href: "/bijoux/bagues-de-fiancailles",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <circle cx="20" cy="24" r="11" stroke="currentColor" strokeWidth="1.3" />
        <path d="M14 13l6-7 6 7" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Choisissez un diamant naturel",
    text: "Une pierre extraite, sélectionnée avec exigence et accompagnée d'un certificat GIA ou IGI.",
    href: "/guides/naturel-vs-synthese",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path d="M10 15h20l-10 18-10-18Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M10 15l4-6h12l4 6" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Optez pour un diamant de synthèse",
    text: "Une pierre identique en tout point au diamant naturel, plus accessible et tout aussi certifiée.",
    href: "/guides/naturel-vs-synthese",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path d="M10 15h20l-10 18-10-18Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M20 4v11M14 15l6-11 6 11" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function StartCards() {
  return (
    <section className="reveal bg-ivoire py-20 lg:py-30">
      <div className="mx-auto max-w-container px-4 lg:px-12">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-serif text-3xl lg:text-4xl">Imaginons votre création</h2>
          <p className="mt-2 text-sm text-gris-texte">Par où commencerez-vous ?</p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {cards.map((card) => (
            <div key={card.title} className="flex flex-col items-center text-center">
              <div className="mb-5 text-bleu-roi">{card.icon}</div>
              <h3 className="font-serif text-xl">{card.title}</h3>
              <p className="mt-2 text-sm text-gris-texte">{card.text}</p>
              <div className="mt-4">
                <UnderlineLink href={card.href}>Commencer</UnderlineLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
