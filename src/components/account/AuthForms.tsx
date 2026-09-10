"use client";
import { useState, type FormEvent } from "react";
import Image from "next/image";
import { FormField } from "@/components/ui/FormField";
import { Tabs } from "@/components/ui/Tabs";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/lib/store/auth";

const PASSWORD_RULES = [
  { test: (v: string) => v.length >= 8, label: "Au moins 8 caractères" },
  { test: (v: string) => /[A-Z]/.test(v), label: "Une majuscule" },
  { test: (v: string) => /[0-9]/.test(v), label: "Un chiffre" },
];

export function AuthForms() {
  return (
    <div className="grid lg:grid-cols-2">
      <div className="relative hidden aspect-[4/5] lg:block">
        <Image src="/placeholders/account-hero.svg" alt="" fill sizes="50vw" className="object-cover" />
      </div>
      <div className="flex items-center justify-center px-4 py-16 lg:px-16">
        <div className="w-full max-w-sm">
          <Tabs
            tabs={[
              { label: "Vous avez déjà un compte ?", content: <LoginForm /> },
              { label: "Créer un compte", content: <SignupForm /> },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

function LoginForm() {
  const login = useAuthStore((s) => s.login);
  const [error, setError] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);
  const [showReset, setShowReset] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const result = login(String(data.get("email")), String(data.get("password")));
    if (!result.ok) setError(result.error ?? "Erreur inconnue.");
    else setError(null);
  }

  if (showReset) {
    return (
      <div>
        <h2 className="mb-4 font-serif text-2xl">Mot de passe oublié</h2>
        {resetSent ? (
          <p role="status" className="text-sm text-vert-profond">Si un compte existe avec cette adresse, un e-mail de réinitialisation vient d&apos;être envoyé.</p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setResetSent(true);
            }}
            className="space-y-4"
          >
            <FormField name="email" type="email" label="Adresse e-mail" required />
            <Button type="submit" fullWidth>
              Envoyer le lien
            </Button>
          </form>
        )}
        <button type="button" onClick={() => setShowReset(false)} className="mt-4 text-xs underline">
          Retour à la connexion
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <FormField name="email" type="email" label="Adresse e-mail" required />
      <FormField name="password" type="password" label="Mot de passe" required />
      {error && (
        <p role="alert" className="text-xs text-red-700">
          {error}
        </p>
      )}
      <Button type="submit" fullWidth>
        Se connecter
      </Button>
      <button type="button" onClick={() => setShowReset(true)} className="text-xs text-gris-texte underline">
        Mot de passe oublié ?
      </button>
    </form>
  );
}

function SignupForm() {
  const register = useAuthStore((s) => s.register);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const failedRule = PASSWORD_RULES.find((r) => !r.test(password));
    if (failedRule) {
      setError("Le mot de passe ne respecte pas les règles requises.");
      return;
    }
    const result = register(String(data.get("name")), String(data.get("email")), password);
    if (!result.ok) setError(result.error ?? "Erreur inconnue.");
    else setError(null);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <FormField name="name" label="Nom complet" required />
      <FormField name="email" type="email" label="Adresse e-mail" required />
      <div>
        <FormField name="password" type="password" label="Mot de passe" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <ul className="mt-2 space-y-1">
          {PASSWORD_RULES.map((r) => (
            <li key={r.label} className={`text-xs ${r.test(password) ? "text-vert-profond" : "text-gris-texte"}`}>
              {r.test(password) ? "✓" : "•"} {r.label}
            </li>
          ))}
        </ul>
      </div>
      <label className="flex items-start gap-2 text-xs text-gris-texte">
        <input type="checkbox" name="newsletter" className="mt-0.5 h-4 w-4" />
        Je souhaite recevoir les actualités et offres d&apos;Elya Joaillerie.
      </label>
      <p className="text-xs text-gris-texte">
        En créant un compte, vous acceptez nos{" "}
        <a href="/cgv" className="underline">
          CGV
        </a>{" "}
        et notre{" "}
        <a href="/confidentialite" className="underline">
          politique de confidentialité
        </a>
        .
      </p>
      {error && (
        <p role="alert" className="text-xs text-red-700">
          {error}
        </p>
      )}
      <Button type="submit" fullWidth>
        Créer mon compte
      </Button>
    </form>
  );
}
