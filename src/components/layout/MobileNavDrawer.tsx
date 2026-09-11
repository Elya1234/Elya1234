"use client";
import { useState } from "react";
import Link from "next/link";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { navItems } from "@/lib/data/nav";
import { brand } from "@/lib/data/brand";
import { cx } from "@/lib/utils";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";

export function MobileNavDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={brand.shortName}
      side="left"
      footer={
        <Button href="/rendez-vous" fullWidth onClick={onClose}>
          Réservez un rendez-vous
        </Button>
      }
    >
      <ul className="flex flex-col">
        {navItems.map((item) => (
          <li key={item.label} className="border-b border-ligne">
            <div className="flex items-center justify-between">
              <Link href={item.href} onClick={onClose} className="min-h-[52px] flex-1 py-3.5 text-sm uppercase tracking-[0.06em]">
                {item.label}
              </Link>
              {item.columns && (
                <button
                  type="button"
                  aria-expanded={expanded === item.label}
                  aria-label={`Sous-menu ${item.label}`}
                  onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                  className="flex h-11 w-11 items-center justify-center"
                >
                  <span className={cx("transition-transform", expanded === item.label && "rotate-180")}>⌄</span>
                </button>
              )}
            </div>
            {item.columns && (
              <div className={cx("grid overflow-hidden transition-all duration-300", expanded === item.label ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]")}>
                <div className="min-h-0 space-y-4 overflow-hidden pl-4">
                  {item.columns.map((col) => (
                    <div key={col.title}>
                      <p className="mb-1.5 text-[10px] uppercase tracking-[0.08em] text-gris-texte">{col.title}</p>
                      <ul className="flex flex-col">
                        {col.links.map((link) => (
                          <li key={link.label}>
                            <Link href={link.href} onClick={onClose} className="block min-h-[40px] py-1.5 text-sm">
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-col gap-1 border-t border-ligne pt-6 text-sm">
        <Link href="/compte" onClick={onClose} className="flex min-h-[44px] items-center gap-3">
          Mon compte
        </Link>
        <Link href="/liste-envies" onClick={onClose} className="flex min-h-[44px] items-center gap-3">
          Liste d&apos;envies
        </Link>
        <a href={brand.phoneHref} className="flex min-h-[44px] items-center gap-3">
          Nous contacter — {brand.phone}
        </a>
        <LocaleSwitcher kind="lang" className="w-fit" triggerClassName="flex min-h-[44px] items-center gap-2 text-left" />
      </div>
    </Drawer>
  );
}
