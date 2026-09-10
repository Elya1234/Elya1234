const items = [
  { icon: "🚚", text: "Livraison offerte en France métropolitaine" },
  { icon: "↩", text: "Retours sous 30 jours" },
  { icon: "✎", text: "Ajustements sans frais" },
  { icon: "🔒", text: "Paiement 100% sécurisé" },
];

export function ReassuranceBar() {
  return (
    <section className="border-b border-ligne bg-ivoire py-4">
      <div className="mx-auto flex max-w-container gap-8 overflow-x-auto px-4 no-scrollbar lg:justify-center lg:px-12">
        {items.map((item) => (
          <div key={item.text} className="flex shrink-0 items-center gap-2.5 whitespace-nowrap text-xs uppercase tracking-[0.06em] text-gris-texte">
            <span aria-hidden="true">{item.icon}</span>
            {item.text}
          </div>
        ))}
      </div>
    </section>
  );
}
