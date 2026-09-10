import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = { title: "Conditions générales de vente" };

export default function CgvPage() {
  return (
    <LegalPage title="Conditions générales de vente">
      <h2>Commandes</h2>
      <p>
        Chaque commande fait l&apos;objet d&apos;une confirmation par e-mail. Les pièces façonnées sur commande nécessitent un délai de fabrication de 2 à 4
        semaines ouvrées avant expédition.
      </p>
      <h2>Prix et paiement</h2>
      <p>
        Les prix sont indiqués en euros, toutes taxes comprises. Le paiement est exigible en totalité à la commande, ou en plusieurs fois selon les
        modalités proposées en caisse.
      </p>
      <h2>Livraison</h2>
      <p>La livraison est offerte en France métropolitaine. Les commandes sont expédiées en colis sécurisé, assuré et discret.</p>
      <h2>Droit de rétractation</h2>
      <p>
        Conformément à la loi, vous disposez d&apos;un délai de 30 jours à compter de la réception pour exercer votre droit de rétractation, hors pièces
        personnalisées ou gravées.
      </p>
      <h2>Garantie</h2>
      <p>Chaque création bénéficie d&apos;une garantie à vie sur l&apos;ajustement de taille et le contrôle du sertissage.</p>
    </LegalPage>
  );
}
