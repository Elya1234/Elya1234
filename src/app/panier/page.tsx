"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";
import { metalLabel } from "@/components/ui/MetalSwatch";
import { shapeLabels } from "@/lib/data/shapes";
import { Button } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

const VALID_CODES: Record<string, number> = {
  BIENVENUE10: 0.1,
};

export default function CartPage() {
  const { lines, removeLine, setQuantity, subtotal } = useCartStore();
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  function applyPromo(e: React.FormEvent) {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (VALID_CODES[code]) {
      setAppliedPromo({ code, discount: VALID_CODES[code] });
      setPromoError(null);
    } else {
      setPromoError("Code promo invalide.");
      setAppliedPromo(null);
    }
  }

  const sub = subtotal();
  const discount = appliedPromo ? Math.round(sub * appliedPromo.discount) : 0;
  const total = sub - discount;

  return (
    <>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Panier" }]} />
      <div className="mx-auto max-w-container px-4 pb-24 lg:px-12">
        <h1 className="mb-8 font-serif text-3xl lg:text-4xl">Votre panier</h1>

        {lines.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <p className="text-gris-texte">Votre panier est vide.</p>
            <Button href="/bijoux/bagues-de-fiancailles">Découvrir la collection</Button>
          </div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-[1fr,360px]">
            <ul className="flex flex-col divide-y divide-ligne">
              {lines.map((line) => (
                <li key={line.id} className="flex gap-5 py-6">
                  <div className="relative aspect-[4/5] w-28 shrink-0 overflow-hidden bg-gris-produit">
                    <Image src={line.image} alt={line.name} fill sizes="112px" className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <Link href={`/produit/${line.productSlug}`} className="font-serif text-xl hover:underline">
                          {line.name}
                        </Link>
                        <p className="mt-1 text-sm text-gris-texte">
                          {[
                            line.options.metal && metalLabel[line.options.metal],
                            line.options.shape && shapeLabels[line.options.shape],
                            line.options.carat && `${line.options.carat} ct`,
                            line.options.size && `Taille ${line.options.size}`,
                          ]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                        {line.options.engraving && <p className="text-sm text-gris-texte">Gravure : « {line.options.engraving} »</p>}
                      </div>
                      <p className="font-medium">{formatPrice(line.unitPrice * line.quantity)}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center border border-ligne">
                        <button type="button" onClick={() => setQuantity(line.id, line.quantity - 1)} aria-label="Diminuer la quantité" className="flex h-10 w-10 items-center justify-center">
                          −
                        </button>
                        <span className="w-8 text-center text-sm" aria-live="polite">
                          {line.quantity}
                        </span>
                        <button type="button" onClick={() => setQuantity(line.id, line.quantity + 1)} aria-label="Augmenter la quantité" className="flex h-10 w-10 items-center justify-center">
                          +
                        </button>
                      </div>
                      <button type="button" onClick={() => removeLine(line.id)} className="text-xs uppercase tracking-[0.06em] text-gris-texte underline">
                        Supprimer
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="h-fit border border-ligne p-6">
              <p className="mb-4 font-serif text-xl">Récapitulatif</p>
              <div className="flex justify-between py-1 text-sm">
                <span>Sous-total</span>
                <span>{formatPrice(sub)}</span>
              </div>
              <div className="flex justify-between py-1 text-sm">
                <span>Livraison</span>
                <span>Offerte</span>
              </div>
              {appliedPromo && (
                <div className="flex justify-between py-1 text-sm text-bleu-roi">
                  <span>Code {appliedPromo.code}</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="mt-3 flex justify-between border-t border-ligne pt-3 text-base font-medium">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              <form onSubmit={applyPromo} className="mt-5">
                <label htmlFor="promo" className="mb-1.5 block text-xs uppercase tracking-[0.06em] text-gris-texte">
                  Code promo
                </label>
                <div className="flex gap-2">
                  <input
                    id="promo"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="BIENVENUE10"
                    className="min-h-[44px] flex-1 border border-ligne px-3 text-sm outline-none focus:border-bleu-roi"
                  />
                  <Button type="submit" size="sm" variant="secondary">
                    Valider
                  </Button>
                </div>
                {promoError && <p className="mt-1.5 text-xs text-red-700">{promoError}</p>}
              </form>

              <div className="mt-6 flex flex-col gap-2">
                <Button href="/commander" fullWidth>
                  Commander
                </Button>
                <Button href="/bijoux/bagues-de-fiancailles" variant="text" fullWidth>
                  Continuer mes achats
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
