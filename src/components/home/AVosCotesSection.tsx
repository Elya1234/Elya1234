import Image from "next/image";
import { brand } from "@/lib/data/brand";
import { UnderlineLink } from "@/components/ui/UnderlineLink";

function PhoneIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      <path d="M6.5 3.5h3l1.5 4-2 1.5a10 10 0 0 0 5 5l1.5-2 4 1.5v3a1.5 1.5 0 0 1-1.6 1.5A16 16 0 0 1 5 6.1 1.5 1.5 0 0 1 6.5 3.5Z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      <rect x="3" y="5.5" width="18" height="13" rx="1" />
      <path d="M4 6.5 12 13l8-6.5" />
    </svg>
  );
}
function ShopIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      <path d="M4 9.5 5.5 4h13L20 9.5" />
      <path d="M4 9.5v9.5h16V9.5" />
      <path d="M9.5 19v-5h5v5" />
    </svg>
  );
}
function ChatIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      <path d="M4 5.5h16v9H10l-4 3v-3H4z" />
    </svg>
  );
}

const cards = [
  {
    icon: <PhoneIcon />,
    label: "Téléphone",
    title: "Une question ?",
    text: "Nous aurons toujours une réponse à vous apporter.",
    linkLabel: brand.phone,
    href: brand.phoneHref,
  },
  {
    icon: <MailIcon />,
    label: "Email",
    title: "Écrivez-nous",
    text: "Un mot suffit.",
    linkLabel: brand.email,
    href: `mailto:${brand.email}`,
  },
  {
    icon: <ShopIcon />,
    label: "Rendez-vous",
    title: "Rencontrons-nous",
    text: "Notre équipe vous guide pour imaginer votre création.",
    linkLabel: "Prendre rendez-vous",
    href: "/rendez-vous",
  },
  {
    icon: <ChatIcon />,
    label: "Assistance",
    title: "Là pour vous",
    text: "Car ce genre de question n'attend pas.",
    linkLabel: "Nous écrire",
    href: "/contact",
  },
];

export function AVosCotesSection() {
  return (
    <section className="reveal bg-ivoire py-20 lg:py-28">
      <div className="mx-auto max-w-container px-4 lg:px-12">
        <div className="mb-10 flex items-center gap-6">
          <h2 className="whitespace-nowrap font-serif text-3xl lg:text-4xl">À vos côtés</h2>
          <div className="h-px flex-1 bg-ligne" />
        </div>
        <div className="relative mb-10 aspect-[16/9] overflow-hidden lg:aspect-[21/9]">
          <Image src="/placeholders/a-vos-cotes.svg" alt="" fill sizes="100vw" className="object-cover" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <div key={card.label} className="border border-ligne bg-white p-6">
              <div className="mb-4 text-bleu-roi">{card.icon}</div>
              <p className="mb-3 text-[11px] uppercase tracking-[0.1em] text-gris-texte">{card.label}</p>
              <p className="font-serif text-lg">{card.title}</p>
              <p className="mt-2 text-sm text-gris-texte">{card.text}</p>
              <UnderlineLink href={card.href} className="mt-4 inline-block normal-case">
                {card.linkLabel}
              </UnderlineLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
