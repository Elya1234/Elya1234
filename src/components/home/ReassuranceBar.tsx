function TruckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
      <path d="M2 6h11v10H2z" />
      <path d="M13 10h4l3 3v3h-7z" />
      <circle cx="6" cy="18" r="1.6" />
      <circle cx="16.5" cy="18" r="1.6" />
    </svg>
  );
}
function ReturnIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
      <path d="M4 8h11a5 5 0 1 1 0 10H9" />
      <path d="M7 5 4 8l3 3" />
    </svg>
  );
}
function AdjustIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
      <path d="M4 20 15 9l3 3L7 23z" />
      <path d="M13 5l3-3 4 4-3 3z" />
    </svg>
  );
}
function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
      <rect x="5" y="10.5" width="14" height="9.5" rx="1" />
      <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
    </svg>
  );
}

const items = [
  { icon: <TruckIcon />, text: "Livraison offerte en France métropolitaine" },
  { icon: <ReturnIcon />, text: "Retours sous 30 jours" },
  { icon: <AdjustIcon />, text: "Ajustements sans frais" },
  { icon: <LockIcon />, text: "Paiement 100% sécurisé" },
];

export function ReassuranceBar() {
  return (
    <section className="border-b border-ligne bg-ivoire py-4">
      <div className="mx-auto flex max-w-container gap-8 overflow-x-auto px-4 no-scrollbar lg:justify-center lg:px-12">
        {items.map((item) => (
          <div key={item.text} className="flex shrink-0 items-center gap-2.5 whitespace-nowrap text-xs uppercase tracking-[0.06em] text-gris-texte">
            <span aria-hidden="true" className="text-bleu-roi">
              {item.icon}
            </span>
            {item.text}
          </div>
        ))}
      </div>
    </section>
  );
}
