"use client";
import { Modal } from "@/components/ui/Modal";

const sizes = [
  { fr: "48", diameter: "15.3 mm", circumference: "48.0 mm" },
  { fr: "50", diameter: "15.9 mm", circumference: "50.0 mm" },
  { fr: "52", diameter: "16.6 mm", circumference: "52.0 mm" },
  { fr: "54", diameter: "17.2 mm", circumference: "54.0 mm" },
  { fr: "56", diameter: "17.8 mm", circumference: "56.0 mm" },
  { fr: "58", diameter: "18.5 mm", circumference: "58.0 mm" },
  { fr: "60", diameter: "19.1 mm", circumference: "60.0 mm" },
];

export function SizeGuideModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} title="Guide des tailles">
      <p className="mb-5 text-sm text-gris-texte">
        Mesurez le tour de votre doigt avec un fil, puis reportez la longueur en millimètres dans le tableau ci-dessous pour trouver votre taille française.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-ligne text-xs uppercase tracking-[0.06em] text-gris-texte">
              <th className="py-2">Taille FR</th>
              <th className="py-2">Diamètre</th>
              <th className="py-2">Tour de doigt</th>
            </tr>
          </thead>
          <tbody>
            {sizes.map((s) => (
              <tr key={s.fr} className="border-b border-ligne">
                <td className="py-2 font-medium">{s.fr}</td>
                <td className="py-2">{s.diameter}</td>
                <td className="py-2">{s.circumference}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-5 text-xs text-gris-texte">
        Vous hésitez entre deux tailles ? Choisissez la plus grande, ou prenez rendez-vous avec un joaillier-conseil pour un essayage gratuit.
      </p>
    </Modal>
  );
}
