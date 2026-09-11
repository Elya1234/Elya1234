"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { categories } from "@/lib/data/categories";
import { cx } from "@/lib/utils";

const items = [
  ...categories.map((c) => ({ label: c.label, href: `/bijoux/${c.slug}` })),
  { label: "Nouveautés", href: "/bijoux/bagues-de-fiancailles?tri=nouveautes" },
];

export function CollectionsScroller() {
  const [activeIndex, setActiveIndex] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = refs.current.findIndex((el) => el === entry.target);
          if (idx !== -1) setActiveIndex(idx);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="reveal bg-bleu-roi py-20 lg:py-28">
      <div className="mx-auto max-w-container px-4 text-center lg:px-12">
        <p className="mb-10 text-xs uppercase tracking-[0.2em] text-white/50">Nos collections</p>
        <ul>
          {items.map((item, i) => (
            <li
              key={item.label}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className="py-2 sm:py-3"
            >
              <Link
                href={item.href}
                className={cx(
                  "font-serif text-4xl transition-colors duration-500 sm:text-5xl lg:text-6xl",
                  i === activeIndex ? "text-white" : "text-white/25",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
