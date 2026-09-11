"use client";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { cx } from "@/lib/utils";

export function Popover({
  label,
  active,
  children,
  align = "left",
}: {
  label: ReactNode;
  active?: boolean;
  children: ReactNode | ((close: () => void) => ReactNode);
  align?: "left" | "right";
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className={cx(
          "flex min-h-[44px] items-center gap-1.5 border-b-2 px-1 text-xs uppercase tracking-[0.08em] transition-colors",
          active || open ? "border-bleu-roi text-bleu-roi" : "border-transparent text-noir-texte hover:text-bleu-roi",
        )}
      >
        {label}
        <svg width="9" height="6" viewBox="0 0 9 6" className={cx("transition-transform", open && "rotate-180")} aria-hidden="true">
          <path d="M1 1l3.5 3.5L8 1" stroke="currentColor" strokeWidth="1.3" fill="none" />
        </svg>
      </button>
      {open && (
        <div
          id={id}
          className={cx(
            "absolute top-full z-40 mt-3 w-[min(90vw,320px)] rounded-sm border border-ligne bg-white p-5 shadow-popover animate-fade-in",
            align === "left" ? "left-0" : "right-0",
          )}
        >
          {typeof children === "function" ? children(() => setOpen(false)) : children}
        </div>
      )}
    </div>
  );
}
