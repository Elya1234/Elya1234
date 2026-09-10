const trustPoints = [
  { title: "Fabrication française", text: "Chaque pièce est façonnée dans notre atelier." },
  { title: "Diamants certifiés", text: "Certificats IGI ou GIA dès 0,30 carat." },
  { title: "Joaillier-conseil dédié", text: "Un accompagnement personnalisé, en boutique ou à distance." },
  { title: "Garantie à vie", text: "Ajustements et contrôles du sertissage offerts." },
];

export function TrustSection() {
  return (
    <section className="reveal border-y border-ligne bg-white py-16">
      <div className="mx-auto max-w-container px-4 lg:px-12">
        <p className="mb-8 text-center text-xs uppercase tracking-[0.1em] text-gris-texte">Ils nous font confiance</p>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {trustPoints.map((point) => (
            <div key={point.title} className="text-center">
              <p className="font-serif text-lg">{point.title}</p>
              <p className="mt-1 text-xs text-gris-texte">{point.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
