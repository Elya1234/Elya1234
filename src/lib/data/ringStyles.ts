import type { RingStyle } from "@/lib/types";

export const ringStyleLabels: Record<RingStyle, string> = {
  solitaire: "Solitaire",
  halo: "Halo",
  trilogie: "Trilogie",
};

export const allRingStyles: RingStyle[] = ["solitaire", "halo", "trilogie"];

// Une pièce représentative par style, pour illustrer le filtre d'une vraie photo produit
// plutôt que d'une simple pastille de texte.
export const ringStyleSample: Record<RingStyle, string> = {
  solitaire: "bague-emma",
  halo: "bague-lou",
  trilogie: "bague-victoire",
};
