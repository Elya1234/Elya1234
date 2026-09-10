"use client";
import { useId, useState } from "react";

export function Tooltip({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <span className="relative inline-flex">
      <button
        type="button"
        aria-describedby={open ? id : undefined}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((o) => !o)}
        className="flex h-5 w-5 items-center justify-center rounded-full border border-gris-texte text-[10px] text-gris-texte"
        aria-label="Plus d'information"
      >
        i
      </button>
      {open && (
        <span
          id={id}
          role="tooltip"
          className="absolute bottom-full left-1/2 z-50 mb-2 w-56 -translate-x-1/2 rounded-sm bg-noir-texte px-3 py-2 text-xs leading-snug text-white shadow-popover animate-fade-in"
        >
          {text}
        </span>
      )}
    </span>
  );
}
