import Image from "next/image";
import Link from "next/link";
import type { NavItem } from "@/lib/data/nav";
import { cx } from "@/lib/utils";

export function MegaMenu({ item, open, onClose }: { item: NavItem; open: boolean; onClose: () => void }) {
  return (
    <div
      className={cx(
        "fixed inset-x-0 top-[113px] z-40 border-t border-ligne bg-white shadow-popover transition-all duration-200",
        open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0",
      )}
    >
      <div className="mx-auto grid max-w-container grid-cols-4 gap-10 px-12 py-10">
        <div className="col-span-2 grid grid-cols-3 gap-8">
          {item.columns?.map((col) => (
            <div key={col.title}>
              <p className="mb-4 text-[11px] uppercase tracking-[0.1em] text-gris-texte">{col.title}</p>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} onClick={onClose} className="underline-link text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-6">
          {item.images?.map((img) => (
            <Link key={img.label} href={img.href} onClick={onClose} className="group relative aspect-[4/5] overflow-hidden bg-gris-produit">
              <Image src={img.image} alt="" fill sizes="320px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-4 text-sm uppercase tracking-[0.06em] text-white">
                {img.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
