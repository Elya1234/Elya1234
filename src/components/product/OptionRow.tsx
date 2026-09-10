"use client";
import { useState, type ReactNode } from "react";
import { Tooltip } from "@/components/ui/Tooltip";
import { cx } from "@/lib/utils";

export function OptionRow({
  label,
  tooltip,
  currentValueLabel,
  children,
  defaultOpen,
}: {
  label: string;
  tooltip?: string;
  currentValueLabel: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="border-b border-ligne">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex min-h-[56px] w-full items-center justify-between gap-3 py-3 text-left"
      >
        <span className="flex items-center gap-2 text-sm uppercase tracking-[0.05em]">
          {label}
          {tooltip && <Tooltip text={tooltip} />}
        </span>
        <span className="flex items-center gap-2 text-sm text-gris-texte">
          {currentValueLabel}
          <span className={cx("transition-transform", open && "rotate-180")} aria-hidden="true">
            ⌄
          </span>
        </span>
      </button>
      <div className={cx("grid overflow-hidden transition-all duration-300", open ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]")}>
        <div className="min-h-0 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
