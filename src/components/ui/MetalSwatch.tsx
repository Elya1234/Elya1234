"use client";
import { cx } from "@/lib/utils";
import type { Metal } from "@/lib/types";

const metalColor: Record<Metal, string> = {
  "or-jaune": "#C9A85C",
  "or-blanc": "#D9D6CE",
  "or-rose": "#D6A895",
  platine: "#C7C9CC",
};

const metalLabel: Record<Metal, string> = {
  "or-jaune": "Or jaune 18K",
  "or-blanc": "Or blanc 18K",
  "or-rose": "Or rose 18K",
  platine: "Platine",
};

export function MetalSwatch({
  metal,
  active,
  size = "md",
  onClick,
}: {
  metal: Metal;
  active?: boolean;
  size?: "sm" | "md";
  onClick?: () => void;
}) {
  const dim = size === "sm" ? "h-4 w-4" : "h-6 w-6";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={metalLabel[metal]}
      title={metalLabel[metal]}
      className={cx(
        "flex min-h-[32px] min-w-[32px] items-center justify-center rounded-full border transition-shadow",
        active ? "border-noir-texte shadow-[0_0_0_2px_white,0_0_0_3px_#1A1A1A]" : "border-ligne",
      )}
    >
      <span className={cx("rounded-full", dim)} style={{ backgroundColor: metalColor[metal] }} />
    </button>
  );
}

export { metalLabel };
