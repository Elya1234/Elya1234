"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { brand } from "@/lib/data/brand";
import { navItems } from "@/lib/data/nav";
import { cx } from "@/lib/utils";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { MobileNavDrawer } from "@/components/layout/MobileNavDrawer";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";

export function Header() {
  const [condensed, setCondensed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const cartCount = useCartStore((s) => s.count());
  const cartOpen = useCartStore((s) => s.open);
  const wishlistCount = useWishlistStore((s) => s.slugs.length);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    function onScroll() {
      setCondensed(window.scrollY > 80);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div
        className={cx(
          "border-b border-ligne transition-[padding] duration-300",
          condensed ? "py-0" : "hidden py-2.5 lg:block",
        )}
      >
        {!condensed && (
          <div className="mx-auto hidden max-w-container items-center justify-between px-6 lg:flex lg:px-12">
            <div className="flex items-center gap-5 text-xs uppercase tracking-[0.08em] text-gris-texte">
              <button type="button" className="hover:text-noir-texte">
                FR ▾
              </button>
              <Link href="/boutiques" className="hover:text-noir-texte">
                Nos boutiques
              </Link>
              <a href={brand.phoneHref} className="hover:text-noir-texte">
                {brand.phone}
              </a>
            </div>
            <div className="flex items-center gap-5 text-xs uppercase tracking-[0.08em]">
              <Link href="/rendez-vous" className="hover:text-vert-profond">
                Prendre RDV
              </Link>
              <Link href="/contact" className="hover:text-vert-profond">
                Nous contacter
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="mx-auto flex max-w-container items-center justify-between gap-4 px-4 py-4 lg:px-12">
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center lg:hidden"
          aria-label="Ouvrir le menu"
          onClick={() => setMobileOpen(true)}
        >
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">
            <path d="M0 1h22M0 8h22M0 15h22" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </button>

        <Link
          href="/"
          className={cx(
            "mx-auto font-serif tracking-[0.04em] transition-all lg:mx-0 lg:order-2 lg:flex-1 lg:text-center",
            condensed ? "text-xl" : "text-2xl lg:text-3xl",
          )}
        >
          {brand.shortName}
        </Link>

        <div className="flex items-center gap-1 lg:order-3">
          <button
            type="button"
            aria-label="Rechercher"
            onClick={() => setSearchOpen(true)}
            className="flex h-11 w-11 items-center justify-center"
          >
            <SearchIcon />
          </button>
          <Link href="/compte" aria-label="Mon compte" className="hidden h-11 w-11 items-center justify-center lg:flex">
            <AccountIcon />
          </Link>
          <Link href="/liste-envies" aria-label="Liste d'envies" className="relative hidden h-11 w-11 items-center justify-center lg:flex">
            <HeartIcon />
            {mounted && wishlistCount > 0 && <CountBadge count={wishlistCount} />}
          </Link>
          <button type="button" aria-label="Panier" onClick={cartOpen} className="relative flex h-11 w-11 items-center justify-center">
            <BagIcon />
            {mounted && cartCount > 0 && <CountBadge count={cartCount} />}
          </button>
        </div>
      </div>

      <nav aria-label="Navigation principale" className="hidden border-t border-ligne lg:block">
        <ul className="mx-auto flex max-w-container justify-center gap-8 px-12">
          {navItems.map((item) => (
            <li
              key={item.label}
              onMouseEnter={() => setActiveMenu(item.label)}
              onMouseLeave={() => setActiveMenu(null)}
              className="relative"
            >
              <Link
                href={item.href}
                aria-expanded={activeMenu === item.label}
                onFocus={() => setActiveMenu(item.label)}
                className={cx(
                  "flex min-h-[48px] items-center border-b-2 text-[11px] uppercase tracking-[0.1em] transition-colors",
                  activeMenu === item.label ? "border-vert-profond text-vert-profond" : "border-transparent hover:text-vert-profond",
                )}
              >
                {item.label}
              </Link>
              {item.columns && <MegaMenu item={item} open={activeMenu === item.label} onClose={() => setActiveMenu(null)} />}
            </li>
          ))}
        </ul>
      </nav>

      <MobileNavDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}

function CountBadge({ count }: { count: number }) {
  return (
    <span className="absolute right-1 top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-vert-profond px-1 text-[9px] text-white">
      {count}
    </span>
  );
}

function SearchIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" aria-hidden="true">
      <circle cx="8.5" cy="8.5" r="6.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M13.5 13.5 18 18" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
function AccountIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" aria-hidden="true">
      <circle cx="9.5" cy="6" r="3.3" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2.5 17c1.5-4 4.2-6 7-6s5.5 2 7 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" aria-hidden="true">
      <path
        d="M9.5 16.5S2 12 2 6.9C2 4.2 4 2.5 6.3 2.5c1.5 0 2.7.8 3.2 1.7.5-.9 1.7-1.7 3.2-1.7C15 2.5 17 4.2 17 6.9c0 5.1-7.5 9.6-7.5 9.6Z"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  );
}
function BagIcon() {
  return (
    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" aria-hidden="true">
      <path d="M2 6.5h14l-1 11H3l-1-11Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M6 6.5v-1a3 3 0 0 1 6 0v1" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
