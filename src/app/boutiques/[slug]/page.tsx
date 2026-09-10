import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getShop, shops } from "@/lib/data/shops";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";

export function generateStaticParams() {
  return shops.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const shop = getShop(params.slug);
  if (!shop) return {};
  return { title: shop.name, description: `${shop.address}, ${shop.postalCode} — ${shop.phone}` };
}

export default function ShopPage({ params }: { params: { slug: string } }) {
  const shop = getShop(params.slug);
  if (!shop) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JewelryStore",
    name: shop.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: shop.address,
      postalCode: shop.postalCode.split(" ")[0],
      addressLocality: shop.city,
      addressCountry: "FR",
    },
    telephone: shop.phone,
    geo: { "@type": "GeoCoordinates", latitude: shop.lat, longitude: shop.lng },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Nos boutiques", href: "/boutiques" }, { label: shop.city }]} />
      <div className="mx-auto grid max-w-container gap-10 px-4 pb-24 lg:grid-cols-2 lg:px-12">
        <div className="relative aspect-[4/3] overflow-hidden bg-gris-produit">
          <Image src={shop.image} alt={shop.name} fill sizes="(min-width:1024px) 45vw, 90vw" className="object-cover" />
        </div>
        <div>
          <h1 className="font-serif text-3xl">{shop.name}</h1>
          <p className="mt-2 text-sm text-gris-texte">
            {shop.address}
            <br />
            {shop.postalCode}
          </p>
          <a href={`tel:${shop.phone.replace(/\s/g, "")}`} className="mt-2 block underline-link text-sm">
            {shop.phone}
          </a>

          <table className="mt-6 w-full text-sm">
            <tbody>
              {shop.hours.map((h) => (
                <tr key={h.day} className="border-b border-ligne">
                  <td className="py-2 text-gris-texte">{h.day}</td>
                  <td className="py-2 text-right">{h.hours}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/rendez-vous">Prendre rendez-vous</Button>
            <Button
              href={`https://www.openstreetmap.org/?mlat=${shop.lat}&mlon=${shop.lng}#map=16/${shop.lat}/${shop.lng}`}
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Itinéraire
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
