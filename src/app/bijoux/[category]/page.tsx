import type { Metadata } from "next";
import { Fragment } from "react";
import { notFound } from "next/navigation";
import { getCategory, categories } from "@/lib/data/categories";
import { getProductsByCategory } from "@/lib/data/products";
import { applyFilters, parseFilters } from "@/lib/filters";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CategoryIntro } from "@/components/plp/CategoryIntro";
import { FilterBar } from "@/components/plp/FilterBar";
import { MobileFilterSort } from "@/components/plp/MobileFilterSort";
import { EditorialTile } from "@/components/plp/EditorialTile";
import { ProductCard } from "@/components/product/ProductCard";
import { Pagination } from "@/components/ui/Pagination";
import { Button } from "@/components/ui/Button";
import type { Metal, Shape } from "@/lib/types";

const PAGE_SIZE = 8;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const category = getCategory(params.category);
  if (!category) return {};
  return {
    title: category.label,
    description: category.intro.slice(0, 155),
  };
}

export default function CategoryPage({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const category = getCategory(params.category);
  if (!category) notFound();

  const categoryProducts = getProductsByCategory(category.slug);
  const filters = parseFilters(searchParams);
  const filtered = applyFilters(categoryProducts, filters);

  const page = Math.max(1, Number(searchParams.page) || 1);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageProducts = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const availableShapes = Array.from(new Set(categoryProducts.flatMap((p) => p.shapes))) as Shape[];
  const availableMetals = Array.from(new Set(categoryProducts.flatMap((p) => p.metals))) as Metal[];

  function buildPageHref(p: number) {
    const params = new URLSearchParams();
    if (filters.formes.length) params.set("forme", filters.formes.join(","));
    if (filters.metaux.length) params.set("metal", filters.metaux.join(","));
    if (filters.types.length) params.set("type", filters.types.join(","));
    if (filters.prixMin !== undefined || filters.prixMax !== undefined) params.set("prix", `${filters.prixMin ?? 0}-${filters.prixMax ?? 999999}`);
    if (filters.tri !== "recommandes") params.set("tri", filters.tri);
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return `/bijoux/${category!.slug}${qs ? `?${qs}` : ""}`;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.elya-joaillerie.fr/" },
      { "@type": "ListItem", position: 2, name: "Joaillerie", item: "https://www.elya-joaillerie.fr/bijoux" },
      { "@type": "ListItem", position: 3, name: category.label, item: `https://www.elya-joaillerie.fr/bijoux/${category.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Joaillerie", href: "/bijoux" }, { label: category.label }]} />
      <CategoryIntro label={category.label} intro={category.intro} />
      <FilterBar availableShapes={availableShapes} availableMetals={availableMetals} resultCount={filtered.length} />

      <div className="mx-auto max-w-container px-4 pb-28 pt-8 lg:px-12 lg:pb-16">
        {pageProducts.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-24 text-center">
            <p className="font-serif text-2xl">Aucun résultat</p>
            <p className="max-w-sm text-sm text-gris-texte">Aucune pièce ne correspond à ces filtres. Essayez d&apos;élargir votre recherche.</p>
            <Button href={`/bijoux/${category.slug}`} variant="secondary">
              Réinitialiser les filtres
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
              {pageProducts.map((product, i) => (
                <Fragment key={product.slug}>
                  <ProductCard product={product} />
                  {i > 0 && (i + 1) % 8 === 0 && <EditorialTile />}
                </Fragment>
              ))}
            </div>
            <Pagination totalPages={totalPages} currentPage={page} buildHref={buildPageHref} />
          </>
        )}
      </div>

      <MobileFilterSort categorySlug={category.slug} availableShapes={availableShapes} availableMetals={availableMetals} />
    </>
  );
}
