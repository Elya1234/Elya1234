"use client";
import { useEffect, useState } from "react";
import { useWishlistStore } from "@/lib/store/wishlist";
import { products } from "@/lib/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export default function WishlistPage() {
  const slugs = useWishlistStore((s) => s.slugs);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const saved = products.filter((p) => slugs.includes(p.slug));

  return (
    <>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Liste d'envies" }]} />
      <div className="mx-auto max-w-container px-4 pb-24 lg:px-12">
        <h1 className="mb-8 font-serif text-3xl lg:text-4xl">Votre liste d&apos;envies</h1>
        {!mounted ? null : saved.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <p className="text-gris-texte">Votre liste d&apos;envies est vide.</p>
            <p className="max-w-sm text-sm text-gris-texte">
              Créez un compte pour retrouver votre liste d&apos;envies sur tous vos appareils.
            </p>
            <div className="flex gap-3">
              <Button href="/bijoux/bagues-de-fiancailles">Découvrir la collection</Button>
              <Button href="/compte" variant="secondary">
                Créer un compte
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
            {saved.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
