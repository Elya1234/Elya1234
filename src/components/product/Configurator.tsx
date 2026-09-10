"use client";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { CartOptions, Certificate, Clarity, ColorGrade, Metal, Product, Shape } from "@/lib/types";
import { calculatePrice, defaultOptions, estimateInstallments } from "@/lib/pricing";
import { formatPrice, formatPriceDecimal } from "@/lib/utils";
import { Chip } from "@/components/ui/Chip";
import { MetalSwatch, metalLabel } from "@/components/ui/MetalSwatch";
import { ShapeIcon } from "@/components/ui/ShapeIcon";
import { shapeLabels } from "@/lib/data/shapes";
import { ringSizes } from "@/lib/data/sizes";
import { OptionRow } from "@/components/product/OptionRow";
import { Button } from "@/components/ui/Button";
import { EngravingModal } from "@/components/product/EngravingModal";
import { SizeGuideModal } from "@/components/product/SizeGuideModal";
import { Accordion } from "@/components/ui/Accordion";
import { brand } from "@/lib/data/brand";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";
import { useToastStore } from "@/lib/store/toast";

export function Configurator({ product }: { product: Product }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [options, setOptions] = useState<CartOptions>(() => {
    const base = defaultOptions(product);
    return {
      ...base,
      metal: (searchParams.get("metal") as Metal) ?? base.metal,
      stoneOrigin: (searchParams.get("pierre") as CartOptions["stoneOrigin"]) ?? base.stoneOrigin,
      shape: (searchParams.get("forme") as Shape) ?? base.shape,
      carat: searchParams.get("carat") ?? base.carat,
      clarity: (searchParams.get("clarte") as Clarity) ?? base.clarity,
      colorGrade: (searchParams.get("couleur") as ColorGrade) ?? base.colorGrade,
      certificate: (searchParams.get("certificat") as Certificate) ?? base.certificate,
      size: product.sizeGuide ? searchParams.get("taille") ?? undefined : undefined,
      engraving: undefined,
    };
  });
  const [engravingOpen, setEngravingOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const addLine = useCartStore((s) => s.addLine);
  const isSaved = useWishlistStore((s) => s.isSaved(product.slug));
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const pushToast = useToastStore((s) => s.push);

  useEffect(() => {
    document.documentElement.style.setProperty("--mobile-bar-offset", "84px");
    return () => document.documentElement.style.setProperty("--mobile-bar-offset", "0px");
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (options.metal) params.set("metal", options.metal);
    if (options.stoneOrigin) params.set("pierre", options.stoneOrigin);
    if (options.shape) params.set("forme", options.shape);
    if (options.carat) params.set("carat", options.carat);
    if (options.clarity) params.set("clarte", options.clarity);
    if (options.colorGrade) params.set("couleur", options.colorGrade);
    if (options.certificate) params.set("certificat", options.certificate);
    if (options.size) params.set("taille", options.size);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.metal, options.stoneOrigin, options.shape, options.carat, options.clarity, options.colorGrade, options.certificate, options.size]);

  const certificateAvailable = Number(options.carat ?? "0") >= 0.3;
  const effectiveOptions = useMemo<CartOptions>(
    () => ({ ...options, certificate: certificateAvailable ? options.certificate : undefined }),
    [options, certificateAvailable],
  );

  const price = calculatePrice(product, effectiveOptions);
  const installments = estimateInstallments(price);
  const sizeMissing = product.sizeGuide && !options.size;

  function update<K extends keyof CartOptions>(key: K, value: CartOptions[K]) {
    setOptions((o) => ({ ...o, [key]: value }));
  }

  function handleAddToCart() {
    if (sizeMissing) {
      pushToast("Veuillez choisir une taille avant d'ajouter au panier.", "error");
      return;
    }
    addLine({
      productSlug: product.slug,
      name: product.name,
      image: product.images[0],
      unitPrice: price,
      quantity: 1,
      options: effectiveOptions,
    });
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  }

  return (
    <div className="lg:sticky lg:top-32">
      <p className="text-xs uppercase tracking-[0.08em] text-gris-texte">{product.subtitle}</p>
      <h1 className="mt-1 font-serif text-3xl lg:text-4xl">{product.name}</h1>
      <p className="mt-3 text-2xl">{formatPrice(price)}</p>

      {product.sizeGuide && (
        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.06em] text-gris-texte">Choisissez votre taille</p>
            <button type="button" onClick={() => setSizeGuideOpen(true)} className="underline-link text-xs">
              Guide des tailles
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {ringSizes.map((s) => (
              <Chip key={s} active={options.size === s} onClick={() => update("size", s)}>
                {s}
              </Chip>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6">
        <OptionRow label="Métal" currentValueLabel={metalLabel[options.metal!]} tooltip="L'or 18 carats et le platine sont hypoallergéniques et ne se déforment pas dans le temps.">
          <div className="flex flex-wrap gap-3">
            {product.metals.map((m) => (
              <button key={m} type="button" onClick={() => update("metal", m)} className="flex flex-col items-center gap-1.5">
                <MetalSwatch metal={m} active={options.metal === m} />
                <span className="text-[11px] text-gris-texte">{metalLabel[m]}</span>
              </button>
            ))}
          </div>
        </OptionRow>

        <OptionRow
          label="Type de pierre"
          currentValueLabel={options.stoneOrigin === "naturel" ? "Diamant naturel" : "Diamant de synthèse"}
          tooltip="Le diamant de synthèse a les mêmes propriétés physiques et chimiques que le diamant naturel, pour un prix généralement inférieur."
          defaultOpen
        >
          <div className="grid grid-cols-2 gap-2">
            <Chip active={options.stoneOrigin === "synthese"} onClick={() => update("stoneOrigin", "synthese")}>
              Synthèse
            </Chip>
            <Chip active={options.stoneOrigin === "naturel"} onClick={() => update("stoneOrigin", "naturel")}>
              Naturel
            </Chip>
          </div>
        </OptionRow>

        <OptionRow label="Forme" currentValueLabel={shapeLabels[options.shape!]} tooltip="La forme de la pierre influence sa brillance et son allure générale.">
          <div className="flex flex-wrap gap-2">
            {product.shapes.map((s) => (
              <Chip key={s} active={options.shape === s} icon={<ShapeIcon shape={s} className="h-4 w-4" />} onClick={() => update("shape", s)}>
                {shapeLabels[s]}
              </Chip>
            ))}
          </div>
        </OptionRow>

        <OptionRow label="Total carat" currentValueLabel={`${options.carat} ct`} tooltip="Le carat mesure le poids du diamant : 1 carat équivaut à 0,2 gramme.">
          <div className="flex flex-wrap gap-2">
            {product.availableCarats.map((c) => (
              <Chip key={c} active={options.carat === c} onClick={() => update("carat", c)}>
                {c}
              </Chip>
            ))}
          </div>
        </OptionRow>

        <OptionRow label="Clarté" currentValueLabel={options.clarity ?? ""} tooltip="La clarté évalue la pureté du diamant : moins il y a d'inclusions visibles, plus la clarté est élevée.">
          <div className="flex flex-wrap gap-2">
            {product.availableClarities.map((c) => (
              <Chip key={c} active={options.clarity === c} onClick={() => update("clarity", c)}>
                {c}
              </Chip>
            ))}
          </div>
        </OptionRow>

        <OptionRow label="Couleur" currentValueLabel={options.colorGrade ?? ""} tooltip="L'échelle de couleur va de D (incolore) à Z (teinté) ; plus la lettre est proche de D, plus le diamant est recherché.">
          <div className="flex flex-wrap gap-2">
            {product.availableColorGrades.map((c) => (
              <Chip key={c} active={options.colorGrade === c} onClick={() => update("colorGrade", c)}>
                {c}
              </Chip>
            ))}
          </div>
        </OptionRow>

        <OptionRow
          label="Certificat"
          currentValueLabel={certificateAvailable ? options.certificate ?? "" : "Non applicable"}
          tooltip={product.certificateInfo}
        >
          {certificateAvailable ? (
            <div className="flex flex-wrap gap-2">
              {product.availableCertificates.map((c) => (
                <Chip key={c} active={options.certificate === c} onClick={() => update("certificate", c)}>
                  {c}
                </Chip>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gris-texte">Certificat disponible à partir de 0,30 carat.</p>
          )}
        </OptionRow>
      </div>

      <p className="mt-4 text-xs text-gris-texte">Réf. {product.code}</p>

      <button
        type="button"
        onClick={() => setEngravingOpen(true)}
        className="mt-4 flex min-h-[44px] w-full items-center justify-between border-t border-ligne pt-3 text-left text-sm"
      >
        <span>Ajouter une gravure <span className="text-gris-texte">(Offert)</span></span>
        <span className="text-gris-texte">{options.engraving ? `« ${options.engraving} » ›` : "›"}</span>
      </button>

      <p className="mt-3 border-t border-ligne pt-3 text-xs text-gris-texte">{product.shipping}</p>

      <div className="mt-6 flex flex-col gap-3 lg:static">
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-ligne bg-white p-4 lg:static lg:border-none lg:p-0" style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 1rem)" }}>
          <Button fullWidth onClick={handleAddToCart}>
            {formatPrice(price)} · Ajouter au panier
          </Button>
          {addedFeedback && (
            <p role="status" className="mt-2 text-center text-xs text-vert-profond">
              Ajouté au panier ✓
            </p>
          )}
        </div>
        <Button variant="secondary" fullWidth href="/rendez-vous">
          Prendre rendez-vous
        </Button>
        <button
          type="button"
          onClick={() => toggleWishlist(product.slug)}
          aria-pressed={isSaved}
          className="flex min-h-[44px] items-center justify-center gap-2 text-xs uppercase tracking-[0.06em] text-gris-texte underline"
        >
          {isSaved ? "Retirer de ma liste d'envies" : "Ajouter à ma liste d'envies"}
        </button>
      </div>

      <div className="mt-4 border-t border-ligne pt-4 text-xs text-gris-texte">
        Paiement en {installments.count}x sans frais : {formatPriceDecimal(installments.first)} puis {installments.count - 1} x {formatPriceDecimal(installments.rest)}
      </div>

      <p className="mt-3 text-xs text-gris-texte">
        Une question ?{" "}
        <a href={brand.phoneHref} className="underline-link">
          Appelez-nous au {brand.phone}
        </a>
      </p>
      <p className="mt-2 text-xs text-gris-texte">Des colis discrets — pour préserver la surprise.</p>

      <div className="mt-10">
        <Accordion
          items={[
            { title: "Description", content: <p>{product.description}</p> },
            { title: "Bague & détails du diamant", content: <p>{product.detailsRing}</p> },
            { title: "Livraison & retours", content: <p>{product.shipping} Retours gratuits sous 30 jours.</p> },
            { title: "Entretien", content: <p>{product.care}</p> },
            { title: "Certificat", content: <p>{product.certificateInfo}</p> },
          ]}
        />
      </div>

      <EngravingModal open={engravingOpen} onClose={() => setEngravingOpen(false)} value={options.engraving ?? ""} onSave={(v) => update("engraving", v || undefined)} />
      <SizeGuideModal open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
    </div>
  );
}
