"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CookieConsentState {
  choice: "accepted" | "refused" | null;
  setChoice: (choice: "accepted" | "refused") => void;
}

export const useCookieConsentStore = create<CookieConsentState>()(
  persist((set) => ({ choice: null, setChoice: (choice) => set({ choice }) }), { name: "elya-cookie-consent" }),
);
