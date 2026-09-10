import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ContactForm } from "@/components/contact/ContactForm";
import { contactFaq } from "@/lib/data/contactFaq";

export const metadata: Metadata = {
  title: "Nous contacter",
  description: "Contactez l'équipe Elya Joaillerie par téléphone, e-mail ou formulaire pour toute question sur une commande ou un rendez-vous.",
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: contactFaq.map((f) => ({
      "@type": "Question",
      name: f.title,
      acceptedAnswer: { "@type": "Answer", text: f.content },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Nous contacter" }]} />
      <div className="mx-auto max-w-container px-4 pb-24 lg:px-12">
        <ContactForm />
      </div>
    </>
  );
}
