import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <p className="font-serif text-6xl text-vert-profond">404</p>
      <h1 className="mt-4 font-serif text-2xl">Cette page n&apos;existe pas</h1>
      <p className="mt-2 text-sm text-gris-texte">La page que vous cherchez a peut-être été déplacée ou n&apos;existe plus.</p>
      <div className="mt-6 flex gap-3">
        <Button href="/">Retour à l&apos;accueil</Button>
        <Button href="/bijoux/bagues-de-fiancailles" variant="secondary">
          Voir la collection
        </Button>
      </div>
    </div>
  );
}
