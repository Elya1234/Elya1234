import { Breadcrumb } from "@/components/ui/Breadcrumb";
import type { ReactNode } from "react";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: title }]} />
      <div className="mx-auto max-w-2xl px-4 pb-24 lg:px-12">
        <h1 className="mb-8 font-serif text-3xl">{title}</h1>
        <div className="space-y-6 text-sm leading-relaxed text-gris-texte [&_h2]:mb-2 [&_h2]:mt-8 [&_h2]:font-serif [&_h2]:text-xl [&_h2]:text-noir-texte [&_p]:mb-3">
          {children}
        </div>
      </div>
    </>
  );
}
