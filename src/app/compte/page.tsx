"use client";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store/auth";
import { AuthForms } from "@/components/account/AuthForms";
import { AccountDashboard } from "@/components/account/AccountDashboard";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export default function AccountPage() {
  const [mounted, setMounted] = useState(false);
  const isLoggedIn = useAuthStore((s) => !!s.currentEmail);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Mon compte" }]} />
      {isLoggedIn ? <AccountDashboard /> : <AuthForms />}
    </>
  );
}
