import { cx } from "@/lib/utils";
import type { ReactNode } from "react";

export function Badge({ children, tone = "dark" }: { children: ReactNode; tone?: "dark" | "light" }) {
  return (
    <span
      className={cx(
        "inline-block px-2.5 py-1 text-[10px] uppercase tracking-[0.1em]",
        tone === "dark" ? "bg-bleu-roi text-white" : "bg-white text-noir-texte",
      )}
    >
      {children}
    </span>
  );
}
