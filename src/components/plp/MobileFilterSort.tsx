"use client";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Drawer } from "@/components/ui/Drawer";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { ShapeIcon } from "@/components/ui/ShapeIcon";
import { MetalSwatch, metalLabel } from "@/components/ui/MetalSwatch";
import { shapeLabels } from "@/lib/data/shapes";
import type { Metal, Shape } from "@/lib/types";
import { priceRanges, sortOptions, type SortKey } from "@/lib/filters";
import { cx } from "@/lib/utils";
import { applyFilters, parseFilters } from "@/lib/filters";
import { products as allProducts } from "@/lib/data/products";
import type { Product } from "@/lib/types";

export function MobileFilterSort({ categorySlug, availableShapes, availableMetals }: { categorySlug: string; availableShapes: Shape[]; availableMetals: Metal[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [sheet, setSheet] = useState<"filter" | "sort" | null>(null);

  useEffect(() => {
    document.documentElement.style.setProperty("--mobile-bar-offset", "52px");
    return () => document.documentElement.style.setProperty("--mobile-bar-offset", "0px");
  }, []);

  const currentFormes = (searchParams.get("forme")?.split(",").filter(Boolean) as Shape[]) ?? [];
  const currentMetaux = (searchParams.get("metal")?.split(",").filter(Boolean) as Metal[]) ?? [];
  const currentPrix = searchParams.get("prix") ?? "";
  const currentTri = (searchParams.get("tri") as SortKey) ?? "recommandes";

  const [formes, setFormes] = useState<Shape[]>(currentFormes);
  const [metaux, setMetaux] = useState<Metal[]>(currentMetaux);
  const [prix, setPrix] = useState(currentPrix);

  const previewCount = useMemo(() => {
    const params: Record<string, string> = {};
    if (formes.length) params.forme = formes.join(",");
    if (metaux.length) params.metal = metaux.join(",");
    if (prix) params.prix = prix;
    if (currentTri !== "recommandes") params.tri = currentTri;
    const catProducts: Product[] = allProducts.filter((p) => p.category.slug === categorySlug);
    return applyFilters(catProducts, parseFilters(params)).length;
  }, [formes, metaux, prix, currentTri, categorySlug]);

  const activeFilterCount = currentFormes.length + currentMetaux.length + (currentPrix ? 1 : 0);

  function commitFilters() {
    const params = new URLSearchParams(searchParams.toString());
    formes.length ? params.set("forme", formes.join(",")) : params.delete("forme");
    metaux.length ? params.set("metal", metaux.join(",")) : params.delete("metal");
    prix ? params.set("prix", prix) : params.delete("prix");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    setSheet(null);
  }

  function commitSort(value: SortKey) {
    const params = new URLSearchParams(searchParams.toString());
    value === "recommandes" ? params.delete("tri") : params.set("tri", value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    setSheet(null);
  }

  return (
    <>
      <div
        className="fixed inset-x-0 bottom-0 z-40 flex border-t border-ligne bg-white lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <button type="button" onClick={() => setSheet("filter")} className="flex min-h-[52px] flex-1 items-center justify-center gap-2 border-r border-ligne text-xs uppercase tracking-[0.08em]">
          ⚙ Filtrer {activeFilterCount > 0 && `(${activeFilterCount})`}
        </button>
        <button type="button" onClick={() => setSheet("sort")} className="flex min-h-[52px] flex-1 items-center justify-center gap-2 text-xs uppercase tracking-[0.08em]">
          ↕ Trier
        </button>
      </div>

      <Drawer
        open={sheet === "filter"}
        onClose={() => setSheet(null)}
        title="Filtrer"
        side="bottom"
        footer={
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setFormes([]);
                setMetaux([]);
                setPrix("");
              }}
              className="text-xs uppercase tracking-[0.06em] text-gris-texte underline"
            >
              Tout effacer
            </button>
            <Button fullWidth onClick={commitFilters}>
              Voir les {previewCount} résultats
            </Button>
          </div>
        }
      >
        <div className="space-y-8">
          {availableShapes.length > 0 && (
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.08em] text-gris-texte">Forme</p>
              <div className="flex flex-wrap gap-2">
                {availableShapes.map((s) => (
                  <Chip key={s} active={formes.includes(s)} icon={<ShapeIcon shape={s} className="h-4 w-4" />} onClick={() => setFormes((l) => (l.includes(s) ? l.filter((x) => x !== s) : [...l, s]))}>
                    {shapeLabels[s]}
                  </Chip>
                ))}
              </div>
            </div>
          )}
          {availableMetals.length > 0 && (
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.08em] text-gris-texte">Métal</p>
              <div className="flex flex-col gap-3">
                {availableMetals.map((m) => (
                  <label key={m} className="flex min-h-[40px] cursor-pointer items-center gap-3 text-sm">
                    <input type="checkbox" checked={metaux.includes(m)} onChange={() => setMetaux((l) => (l.includes(m) ? l.filter((x) => x !== m) : [...l, m]))} className="h-4 w-4" />
                    <MetalSwatch metal={m} size="sm" />
                    {metalLabel[m]}
                  </label>
                ))}
              </div>
            </div>
          )}
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.08em] text-gris-texte">Prix</p>
            <div className="flex flex-col gap-1">
              {priceRanges.map((r) => (
                <label key={r.value} className="flex min-h-[40px] cursor-pointer items-center gap-3 text-sm">
                  <input type="radio" name="mobile-prix" checked={prix === r.value} onChange={() => setPrix(r.value)} className="h-4 w-4" />
                  {r.label}
                </label>
              ))}
            </div>
          </div>
        </div>
      </Drawer>

      <Drawer open={sheet === "sort"} onClose={() => setSheet(null)} title="Trier par" side="bottom">
        <div className="flex flex-col">
          {sortOptions.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => commitSort(o.value)}
              className={cx("flex min-h-[52px] items-center justify-between border-b border-ligne text-left text-sm", currentTri === o.value && "text-vert-profond")}
            >
              {o.label}
              {currentTri === o.value && <span aria-hidden="true">✓</span>}
            </button>
          ))}
        </div>
      </Drawer>
    </>
  );
}
