"use client";
import { useId, useState, type ReactNode } from "react";
import { cx } from "@/lib/utils";

export function Accordion({
  items,
  defaultOpenIndex,
}: {
  items: { title: string; content: ReactNode }[];
  defaultOpenIndex?: number;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex ?? null);
  return (
    <div className="divide-y divide-ligne border-y border-ligne">
      {items.map((item, i) => (
        <AccordionItem
          key={item.title}
          title={item.title}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}

function AccordionItem({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  const id = useId();
  return (
    <div>
      <h3>
        <button
          type="button"
          id={`${id}-header`}
          aria-expanded={isOpen}
          aria-controls={`${id}-panel`}
          onClick={onToggle}
          className="flex min-h-[52px] w-full items-center justify-between py-4 text-left text-sm uppercase tracking-[0.06em]"
        >
          {title}
          <span className={cx("transition-transform duration-200", isOpen && "rotate-45")} aria-hidden="true">
            +
          </span>
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-header`}
        className={cx("grid overflow-hidden transition-all duration-300", isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]")}
      >
        <div className="min-h-0 overflow-hidden text-sm leading-relaxed text-gris-texte">{children}</div>
      </div>
    </div>
  );
}
