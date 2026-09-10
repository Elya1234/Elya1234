import { cx } from "@/lib/utils";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "text";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 font-sans uppercase tracking-[0.1em] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vert-profond";

const variants: Record<Variant, string> = {
  primary: "bg-vert-profond text-white hover:bg-[#0a2e23] border border-vert-profond",
  secondary: "bg-transparent text-vert-profond border border-vert-profond hover:bg-vert-profond hover:text-white",
  text: "bg-transparent text-noir-texte underline underline-offset-4 decoration-1 hover:text-vert-profond p-0 normal-case tracking-normal",
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
