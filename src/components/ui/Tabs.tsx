"use client";
import { useState, type ReactNode } from "react";
import { cx } from "@/lib/utils";

export function Tabs({ tabs }: { tabs: { label: string; content: ReactNode }[] }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div role="tablist" className="flex border-b border-ligne">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className={cx(
              "min-h-[52px] flex-1 border-b-2 px-2 text-xs uppercase tracking-[0.08em] transition-colors",
              active === i ? "border-vert-profond text-vert-profond" : "border-transparent text-gris-texte hover:text-noir-texte",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="pt-8">
        {tabs[active].content}
      </div>
    </div>
  );
}
