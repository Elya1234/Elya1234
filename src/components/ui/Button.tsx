import { cx } from "@/lib/utils";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "text" | "light" | "outlineLight";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 font-sans uppercase tracking-[0.1em] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bleu-roi";

const variants: Record<Variant, string> = {
  primary: "bg-bleu-roi text-white hover:bg-[#12204a] border border-bleu-roi",
  secondary: "bg-transparent text-bleu-roi border border-bleu-roi hover:bg-bleu-roi hover:text-white",
  text: "bg-transparent text-noir-texte underline underline-offset-4 decoration-1 hover:text-bleu-roi p-0 normal-case tracking-normal",
  // Pour un bouton plein sur fond sombre/coloré (ex. newsletter) : jamais de className qui
  // surcharge les couleurs de `primary`, car l'ordre du CSS Tailwind compilé ne suit pas
  // l'ordre des classes dans le JSX et peut rendre le texte invisible (bug déjà rencontré ici).
  light: "bg-white text-bleu-roi hover:bg-white/90 border border-white",
  // Pour un bouton outline sur fond sombre/coloré (ex. bloc RDV) : au survol se remplit de blanc
  // avec un texte sombre lisible, sans dépendre d'une couleur de survol arbitraire.
  outlineLight: "bg-transparent text-white border border-white hover:bg-white hover:text-noir-texte",
};

const sizes: Record<Size, string> = {
  md: "px-8 py-3.5 text-xs min-h-[44px]",
  sm: "px-5 py-2.5 text-xs min-h-[40px]",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type LinkProps = CommonProps & { href: string; target?: string; rel?: string; onClick?: () => void };

export function Button(props: ButtonProps | LinkProps) {
  const { variant = "primary", size = "md", fullWidth, children, className, ...rest } = props;
  const classes = cx(base, variants[variant], variant !== "text" && sizes[size], fullWidth && "w-full", className);

  if ("href" in props && props.href) {
    const { href, target, rel, onClick } = props as LinkProps;
    return (
      <Link href={href} target={target} rel={rel} onClick={onClick} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
