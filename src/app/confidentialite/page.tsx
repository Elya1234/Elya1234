import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { brand } from "@/lib/data/brand";

export const metadata: Metadata = { title: "Politique de confidentialité" };

export default function PrivacyPage() {
  return (
    <LegalPage title="Politique de confidentialité">
      <h2>Données collectées</h2>
      <p>
        Nous collectons les données que vous nous transmettez volontairement (nom, e-mail, adresse) lors de la création d&apos;un compte, d&apos;une
        commande, d&apos;une prise de rendez-vous ou d&apos;une inscription à notre newsletter.
      </p>
      <h2>Finalités</h2>
      <p>Ces données sont utilisées pour traiter vos commandes, rendez-vous, et, sous réserve de votre consentement, vous adresser nos actualités.</p>
      <h2>Vos droits</h2>
      <p>
        Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement et de portabilité de vos données. Vous pouvez
        exercer ces droits en écrivant à {brand.email}.
      </p>
      <h2>Cookies</h2>
      <p>
        Consultez notre{" "}
        <a href="/cookies" className="underline">
          page dédiée à la gestion des cookies
        </a>{" "}
        pour en savoir plus.
      </p>
    </LegalPage>
  );
}
