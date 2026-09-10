import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getProduct, getRelatedProducts, products } from "@/lib/data/products";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Gallery } from "@/components/product/Gallery";
import { Configurator } from "@/components/product/Configurator";
import { ProductCarousel } from "@/components/home/ProductCarousel";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProduct(params.slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description.slice(0, 155),
    openGraph: { images: [product.images[0]] },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.code,
    image: `https://www.elya-joaillerie.fr${product.images[0]}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: product.basePrice,
      availability: "https://schema.org/InStock",
      url: `https://www.elya-joaillerie.fr/produit/${product.slug}`,
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.elya-joaillerie.fr/" },
      { "@type": "ListItem", position: 2, name: product.category.label, item: `https://www.elya-joaillerie.fr/bijoux/${product.category.slug}` },
      { "@type": "ListItem", position: 3, name: product.name, item: `https://www.elya-joaillerie.fr/produit/${product.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: product.category.label, href: `/bijoux/${product.category.slug}` },
          { label: product.name },
        ]}
      />
      <div className="mx-auto grid max-w-container gap-10 px-4 pb-28 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:pb-16">
        <Gallery images={product.images} name={product.name} />
        <Suspense fallback={null}>
          <Configurator product={product} />
        </Suspense>
      </div>

      {related.length > 0 && (
        <div className="border-t border-ligne">
          <ProductCarousel title="Vous aimerez aussi" seeAllHref={`/bijoux/${product.category.slug}`} products={related} />
        </div>
      )}
    </>
  );
}
