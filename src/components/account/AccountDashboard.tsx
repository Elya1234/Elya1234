"use client";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/auth";
import { useWishlistStore } from "@/lib/store/wishlist";
import { Tabs } from "@/components/ui/Tabs";
import { Button } from "@/components/ui/Button";

export function AccountDashboard() {
  const user = useAuthStore((s) => s.currentUser());
  const logout = useAuthStore((s) => s.logout);
  const wishlistCount = useWishlistStore((s) => s.slugs.length);

  if (!user) return null;

  return (
    <div className="mx-auto max-w-container px-4 py-16 lg:px-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.08em] text-gris-texte">Bienvenue</p>
          <h1 className="font-serif text-3xl">{user.name}</h1>
        </div>
        <Button variant="secondary" size="sm" onClick={logout}>
          Déconnexion
        </Button>
      </div>

      <Tabs
        tabs={[
          {
            label: "Commandes",
            content: (
              <div className="py-8 text-center text-sm text-gris-texte">
                <p>Vous n&apos;avez pas encore passé de commande.</p>
                <div className="mt-4">
                  <Button href="/bijoux/bagues-de-fiancailles" size="sm">
                    Découvrir la collection
                  </Button>
                </div>
              </div>
            ),
          },
          {
            label: "Adresses",
            content: (
              <div className="py-8 text-center text-sm text-gris-texte">
                <p>Aucune adresse enregistrée.</p>
              </div>
            ),
          },
          {
            label: "Liste d'envies",
            content: (
              <div className="py-8 text-center text-sm text-gris-texte">
                <p>{wishlistCount} pièce(s) enregistrée(s).</p>
                <div className="mt-4">
                  <Link href="/liste-envies" className="underline-link text-xs">
                    Voir ma liste d&apos;envies
                  </Link>
                </div>
              </div>
            ),
          },
          {
            label: "Rendez-vous",
            content: (
              <div className="py-8 text-center text-sm text-gris-texte">
                <p>Aucun rendez-vous à venir.</p>
                <div className="mt-4">
                  <Button href="/rendez-vous" size="sm">
                    Prendre rendez-vous
                  </Button>
                </div>
              </div>
            ),
          },
          {
            label: "Mes informations",
            content: (
              <div className="max-w-sm space-y-2 py-8 text-sm">
                <p>
                  <span className="text-gris-texte">Nom : </span>
                  {user.name}
                </p>
                <p>
                  <span className="text-gris-texte">E-mail : </span>
                  {user.email}
                </p>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
