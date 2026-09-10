const reviews = [
  {
    author: "Camille D.",
    text: "Un accompagnement exceptionnel du premier rendez-vous à la remise de la bague. Le résultat dépasse ce que j'imaginais.",
  },
  {
    author: "Thomas R.",
    text: "Le configurateur en ligne est très clair, et le rendez-vous en boutique a permis d'affiner chaque détail. Livraison rapide.",
  },
  {
    author: "Élise M.",
    text: "Diamant de synthèse magnifique, certificat à l'appui. Un excellent rapport qualité-prix pour une pièce vraiment unique.",
  },
];

export function Reviews() {
  return (
    <section className="reveal mx-auto max-w-container px-4 py-20 lg:px-12">
      <div className="mb-10 text-center">
        <p className="font-serif text-3xl">4,9 / 5</p>
        <p className="text-xs uppercase tracking-[0.08em] text-gris-texte">Fondé sur plus de 1 200 avis clients</p>
      </div>
      <div className="grid gap-8 sm:grid-cols-3">
        {reviews.map((review) => (
          <blockquote key={review.author} className="border border-ligne p-6 text-center">
            <p aria-hidden="true" className="mb-3 text-vert-profond">
              ★★★★★
            </p>
            <p className="text-sm leading-relaxed text-gris-texte">« {review.text} »</p>
            <cite className="mt-4 block text-xs uppercase not-italic tracking-[0.06em]">{review.author}</cite>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
