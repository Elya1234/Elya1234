"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StoredUser {
  name: string;
  email: string;
  password: string;
}

interface AuthState {
  users: StoredUser[];
  currentEmail: string | null;
  register: (name: string, email: string, password: string) => { ok: boolean; error?: string };
  login: (email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
  currentUser: () => StoredUser | null;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      users: [],
      currentEmail: null,
      register: (name, email, password) => {
        const normalized = email.trim().toLowerCase();
        if (get().users.some((u) => u.email === normalized)) {
          return { ok: false, error: "Un compte existe déjà avec cette adresse e-mail." };
        }
        set((s) => ({ users: [...s.users, { name, email: normalized, password }], currentEmail: normalized }));
        return { ok: true };
      },
      login: (email, password) => {
        const normalized = email.trim().toLowerCase();
        const user = get().users.find((u) => u.email === normalized);
        if (!user || user.password !== password) {
          return { ok: false, error: "Adresse e-mail ou mot de passe incorrect." };
        }
        set({ currentEmail: normalized });
        return { ok: true };
      },
      logout: () => set({ currentEmail: null }),
      currentUser: () => get().users.find((u) => u.email === get().currentEmail) ?? null,
    }),
    { name: "elya-auth" },
  ),
);
