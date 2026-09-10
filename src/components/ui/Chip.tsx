"use client";
import { cx } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export function Chip({
  active,
  disabled,
  children,
  icon,
  className,
  ...rest
}: {
  active?: boolean;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-pressed={active}
      className={cx(
        "flex min-h-[44px] items-center gap-2 rounded-full border px-4 py-2 text-xs uppercase tracking-[0.08em] transition-colors duration-200",
        active
          ? "border-vert-profond bg-vert-profond text-white"
          : "border-ligne bg-white text-noir-texte hover:border-vert-profond",
        disabled && "cursor-not-allowed opacity-35 hover:border-ligne",
        className,
      )}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
}
