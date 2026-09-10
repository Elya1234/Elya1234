import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prendre rendez-vous",
  description: "Prenez rendez-vous avec un joaillier-conseil Elya, en boutique, par téléphone ou en visioconférence.",
};

export default function AppointmentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
