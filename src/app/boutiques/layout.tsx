import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nos boutiques",
  description: "Retrouvez nos boutiques Elya Joaillerie à Paris, Lyon, Bordeaux et Toulouse.",
};

export default function StoresLayout({ children }: { children: React.ReactNode }) {
  return children;
}
