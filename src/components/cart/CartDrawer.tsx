"use client";
import Image from "next/image";
import Link from "next/link";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";
import { metalLabel } from "@/components/ui/MetalSwatch";
import { shapeLabels } from "@/lib/data/shapes";

export function CartDrawer() {
  const { lines, isOpen, close, removeLine, setQuantity, subtotal } = useCartStore();

  return (
    <Drawer
      open={isOpen}
      onClose={close}
      title={`Votre panier${lines.length ? ` (${lines.length})` : ""}`}
      footer={
        lines.length > 0 ? (
          <div>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span>Sous-total</span>
              <span className="font-medium">{formatPrice(subtotal())}</span>
            </div>
            <p className="mb-4 text-xs text-gris-texte">Livraison offerte en France métropolitaine</p>
            <div className="flex flex-col gap-2">
              <Button href="/panier" fullWidth onClick={close}>
                Voir le panier
              </Button>
              <Button href="/commander" variant="secondary" fullWidth onClick={close}>
                Commander
              </Button>
            </div>
          </div>
        ) : undefined
      }
    >
      {lines.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-12 text-center">
          <p className="text-sm text-gris-texte">Votre panier est vide.</p>
          <Button href="/bijoux/bagues-de-fiancailles" size="sm" onClick={close}>
            Découvrir la collection
          </Button>
        </div>
      ) : (
        <ul className="flex flex-col gap-6">
          {lines.map((line) => (
            <li key={line.id} className="flex gap-4">
              <div className="relative aspect-[4/5] w-20 shrink-0 overflow-hidden bg-gris-produit">
                <Image src={line.image} alt={line.name} fill sizes="80px" className="object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-serif text-lg">{line.name}</p>
                <p className="text-xs text-gris-texte">
                  {[
                    line.options.metal && metalLabel[line.options.metal],
                    line.options.shape && shapeLabels[line.options.shape],
                    line.options.carat && `${line.options.carat} ct`,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
                {line.options.engraving && <p className="text-xs text-gris-texte">Gravure : « {line.options.engraving} »</p>}
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center border border-ligne">
                    <button
                      type="button"
                      onClick={() => setQuantity(line.id, line.quantity - 1)}
                      aria-label="Diminuer la quantité"
                      className="flex h-9 w-9 items-center justify-center"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm" aria-live="polite">
                      {line.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(line.id, line.quantity + 1)}
                      aria-label="Augmenter la quantité"
                      className="flex h-9 w-9 items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm font-medium">{formatPrice(line.unitPrice * line.quantity)}</span>
                </div>
                <button type="button" onClick={() => removeLine(line.id)} className="mt-2 text-xs text-gris-texte underline">
                  Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Drawer>
  );
}
