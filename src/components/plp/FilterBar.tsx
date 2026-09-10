"use client";
import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Popover } from "@/components/ui/Popover";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { ShapeIcon } from "@/components/ui/ShapeIcon";
import { MetalSwatch, metalLabel } from "@/components/ui/MetalSwatch";
import { allShapes, shapeLabels } from "@/lib/data/shapes";
import type { Metal, Shape } from "@/lib/types";
import { priceRanges, sortOptions, type SortKey } from "@/lib/filters";
import { cx } from "@/lib/utils";

const allMetals: Metal[] = ["or-jaune", "or-blanc", "or-rose", "platine"];

export function FilterBar({ availableShapes, availableMetals, resultCount }: { availableShapes: Shape[]; availableMetals: Metal[]; resultCount: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentFormes = useMemo(() => (searchParams.get("forme")?.split(",").filter(Boolean) as Shape[]) ?? [], [searchParams]);
  const currentMetaux = useMemo(() => (searchParams.get("metal")?.split(",").filter(Boolean) as Metal[]) ?? [], [searchParams]);
  const currentPrix = searchParams.get("prix") ?? "";
  const currentTri = (searchParams.get("tri") as SortKey) ?? "recommandes";

  function updateParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function clearAll() {
    router.push(pathname, { scroll: false });
  }

  const hasActiveFilters = currentFormes.length > 0 || currentMetaux.length > 0 || !!currentPrix;

  return (
    <div className="sticky top-[65px] z-30 border-b border-ligne bg-white lg:top-[113px]">
      <div className="mx-auto flex max-w-container flex-wrap items-center justify-between gap-3 px-4 py-3 lg:px-12">
        <div className="hidden flex-wrap items-center gap-1 lg:flex">
          {availableShapes.length > 0 && (
            <ShapePopover shapes={availableShapes} selected={currentFormes} onApply={(v) => updateParam("forme", v.length ? v.join(",") : null)} />
          )}
          {availableMetals.length > 0 && (
            <MetalPopover metals={availableMetals} selected={currentMetaux} onApply={(v) => updateParam("metal", v.length ? v.join(",") : null)} />
          )}
          <PricePopover selected={currentPrix} onApply={(v) => updateParam("prix", v)} />
        </div>

        <p className="text-xs text-gris-texte lg:hidden">{resultCount} RÉSULTATS</p>

        <div className="flex items-center gap-3">
          <p className="hidden text-xs text-gris-texte lg:block">{resultCount} RÉSULTATS</p>
          <label className="hidden items-center gap-2 text-xs uppercase tracking-[0.06em] text-gris-texte lg:flex">
            Trier par
            <select
              value={currentTri}
              onChange={(e) => updateParam("tri", e.target.value === "recommandes" ? null : e.target.value)}
              className="min-h-[44px] border-none bg-transparent text-noir-texte outline-none"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mx-auto flex max-w-container flex-wrap items-center gap-2 px-4 pb-3 lg:px-12">
          {currentFormes.map((f) => (
            <ActiveChip key={f} label={shapeLabels[f]} onRemove={() => updateParam("forme", currentFormes.filter((x) => x !== f).join(",") || null)} />
          ))}
          {currentMetaux.map((m) => (
            <ActiveChip key={m} label={metalLabel[m]} onRemove={() => updateParam("metal", currentMetaux.filter((x) => x !== m).join(",") || null)} />
          ))}
          {currentPrix && <ActiveChip label={priceRanges.find((r) => r.value === currentPrix)?.label ?? currentPrix} onRemove={() => updateParam("prix", null)} />}
          <button type="button" onClick={clearAll} className="ml-1 text-xs uppercase tracking-[0.06em] text-gris-texte underline">
            Tout effacer
          </button>
        </div>
      )}
    </div>
  );
}

function ActiveChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="flex items-center gap-1.5 rounded-full border border-ligne px-3 py-1.5 text-xs">
      {label}
      <button type="button" onClick={onRemove} aria-label={`Retirer le filtre ${label}`} className="text-gris-texte hover:text-noir-texte">
        ×
      </button>
    </span>
  );
}

function ShapePopover({ shapes, selected, onApply }: { shapes: Shape[]; selected: Shape[]; onApply: (v: Shape[]) => void }) {
  const [local, setLocal] = useState<Shape[]>(selected);
  return (
    <Popover label="Forme" active={selected.length > 0}>
      {(close) => (
        <>
          <div className="grid grid-cols-3 gap-2">
            {shapes.map((s) => (
              <Chip key={s} active={local.includes(s)} icon={<ShapeIcon shape={s} className="h-4 w-4" />} onClick={() => setLocal((l) => (l.includes(s) ? l.filter((x) => x !== s) : [...l, s]))}>
                {shapeLabels[s]}
              </Chip>
            ))}
          </div>
          <PopoverActions
            onClear={() => {
              setLocal([]);
              onApply([]);
              close();
            }}
            onApply={() => {
              onApply(local);
              close();
            }}
          />
        </>
      )}
    </Popover>
  );
}

function MetalPopover({ metals, selected, onApply }: { metals: Metal[]; selected: Metal[]; onApply: (v: Metal[]) => void }) {
  const [local, setLocal] = useState<Metal[]>(selected);
  return (
    <Popover label="Métal" active={selected.length > 0}>
      {(close) => (
        <>
          <div className="flex flex-col gap-3">
            {metals.map((m) => (
              <label key={m} className="flex min-h-[40px] cursor-pointer items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={local.includes(m)}
                  onChange={() => setLocal((l) => (l.includes(m) ? l.filter((x) => x !== m) : [...l, m]))}
                  className="h-4 w-4"
                />
                <MetalSwatch metal={m} size="sm" />
                {metalLabel[m]}
              </label>
            ))}
          </div>
          <PopoverActions
            onClear={() => {
              setLocal([]);
              onApply([]);
              close();
            }}
            onApply={() => {
              onApply(local);
              close();
            }}
          />
        </>
      )}
    </Popover>
  );
}

function PricePopover({ selected, onApply }: { selected: string; onApply: (v: string | null) => void }) {
  const [local, setLocal] = useState(selected);
  return (
    <Popover label="Prix" active={!!selected}>
      {(close) => (
        <>
          <div className="flex flex-col gap-1">
            {priceRanges.map((r) => (
              <label key={r.value} className="flex min-h-[40px] cursor-pointer items-center gap-3 text-sm">
                <input type="radio" name="prix" checked={local === r.value} onChange={() => setLocal(r.value)} className="h-4 w-4" />
                {r.label}
              </label>
            ))}
          </div>
          <PopoverActions
            onClear={() => {
              setLocal("");
              onApply(null);
              close();
            }}
            onApply={() => {
              onApply(local || null);
              close();
            }}
          />
        </>
      )}
    </Popover>
  );
}

function PopoverActions({ onClear, onApply }: { onClear: () => void; onApply: () => void }) {
  return (
    <div className="mt-4 flex items-center justify-between border-t border-ligne pt-4">
      <button type="button" onClick={onClear} className="text-xs uppercase tracking-[0.06em] text-gris-texte underline">
        Effacer
      </button>
      <Button size="sm" onClick={onApply}>
        Appliquer
      </Button>
    </div>
  );
}

export { allMetals, allShapes };
