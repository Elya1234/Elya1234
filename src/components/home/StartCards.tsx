import { UnderlineLink } from "@/components/ui/UnderlineLink";

const cards = [
  {
    title: "Choisissez son style et son métal",
    text: "Solitaire, halo ou trilogie : composez la monture qui vous ressemble, en or ou en platine.",
    href: "/bijoux/bagues-de-fiancailles",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
        <circle cx="20" cy="25" r="10" />
        <path d="M16.5 15L20 6L23.5 15Z" />
        <path d="M16.5 15L23.5 15M20 6L20 15M18.2 10.2L21.8 10.2" />
      </svg>
    ),
  },
  {
    title: "Choisissez un diamant naturel",
    text: "Une pierre extraite, sélectionnée avec exigence et accompagnée d'un certificat GIA ou IGI.",
    href: "/guides/naturel-vs-synthese",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
        <ellipse cx="20" cy="20" rx="10.5" ry="14" />
        <ellipse cx="20" cy="20" rx="4.2" ry="5.6" />
        <path d="M30.5 20L24.2 20M27.42 29.9L22.97 23.96M20 34L20 25.6M12.58 29.9L17.03 23.96M9.5 20L15.8 20M12.58 10.1L17.03 16.04M20 6L20 14.4M27.42 10.1L22.97 16.04" />
      </svg>
    ),
  },
  {
    title: "Optez pour un diamant de synthèse",
    text: "Une pierre identique en tout point au diamant naturel, plus accessible et tout aussi certifiée.",
    href: "/guides/naturel-vs-synthese",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
        <ellipse cx="19" cy="21" rx="10.5" ry="14" />
        <ellipse cx="19" cy="21" rx="4.2" ry="5.6" />
        <path d="M29.5 21L23.2 21M26.42 30.9L21.97 24.96M19 35L19 26.6M11.58 30.9L16.03 24.96M8.5 21L14.8 21M11.58 11.1L16.03 17.04M19 7L19 15.4M26.42 11.1L21.97 17.04" />
        <path d="M33 6L33 12M30 9L36 9" strokeWidth="0.9" />
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
