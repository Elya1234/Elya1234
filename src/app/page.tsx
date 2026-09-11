import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { ReassuranceBar } from "@/components/home/ReassuranceBar";
import { Manifesto } from "@/components/home/Manifesto";
import { StartCards } from "@/components/home/StartCards";
import { ShapeSelector } from "@/components/home/ShapeSelector";
import { ProductCarousel } from "@/components/home/ProductCarousel";
import { EditorialGift } from "@/components/home/EditorialGift";
import { GiftOccasions } from "@/components/home/GiftOccasions";
import { TrustSection } from "@/components/home/TrustSection";
import { Reviews } from "@/components/home/Reviews";
import { CollectionsScroller } from "@/components/home/CollectionsScroller";
import { BoutiquesSection } from "@/components/home/BoutiquesSection";
import { AVosCotesSection } from "@/components/home/AVosCotesSection";
import { SocialQuote } from "@/components/home/SocialQuote";
import { Newsletter } from "@/components/home/Newsletter";
import { products } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Bagues de fiançailles, alliances et joaillerie sur mesure",
  description: "Découvrez la collection Elya Joaillerie : bagues de fiançailles, alliances et joaillerie façonnées à la main, en diamants naturels ou de synthèse.",
};

export default function Home() {
  const iconic = products.filter((p) => p.category.slug === "bagues-de-fiancailles");
  const alliances = products.filter((p) => p.category.slug === "alliances");
  const newArrivals = products.filter((p) => p.isNew);

  return (
    <>
      <Hero />
      <ReassuranceBar />
      <Manifesto />
      <StartCards />
      <ShapeSelector />
      <ProductCarousel title="Nos bagues iconiques" seeAllHref="/bijoux/bagues-de-fiancailles" products={iconic} />
      <ProductCarousel title="Alliances" seeAllHref="/bijoux/alliances" products={alliances} />
      <ProductCarousel title="Nouveautés" seeAllHref="/bijoux/bagues-de-fiancailles?tri=nouveautes" products={newArrivals} />
      <EditorialGift />
      <GiftOccasions />
      <TrustSection />
      <CollectionsScroller />
      <BoutiquesSection />
      <AVosCotesSection />
      <SocialQuote />
      <Reviews />
      <Newsletter />
    </>
  );
}
