"use client";
import { useState } from "react";
import { cx } from "@/lib/utils";

export function CategoryIntro({ label, intro }: { label: string; intro: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="bg-vert-sauge/10 px-4 py-8 lg:px-12 lg:py-10">
      <div className="mx-auto max-w-container">
        <h1 className="font-serif text-3xl lg:text-4xl">{label}</h1>
        <p className={cx("mt-3 max-w-2xl text-sm leading-relaxed text-noir-texte/80 lg:line-clamp-none", !expanded && "line-clamp-3")}>{intro}</p>
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="mt-2 text-xs uppercase tracking-[0.06em] underline lg:hidden"
        >
          {expanded ? "Réduire" : "Lire la suite"}
        </button>
      </div>
    </div>
  );
}
