"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartLine, CartOptions } from "@/lib/types";

interface CartState {
  lines: CartLine[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  addLine: (line: Omit<CartLine, "id">) => void;
  removeLine: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  subtotal: () => number;
  count: () => number;
}

function lineId(productSlug: string, options: CartOptions): string {
  return `${productSlug}__${JSON.stringify(options)}`;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      addLine: (line) =>
        set((state) => {
          const id = lineId(line.productSlug, line.options);
          const existing = state.lines.find((l) => l.id === id);
          if (existing) {
            return {
              lines: state.lines.map((l) => (l.id === id ? { ...l, quantity: l.quantity + line.quantity } : l)),
              isOpen: true,
            };
          }
          return { lines: [...state.lines, { ...line, id }], isOpen: true };
        }),
      removeLine: (id) => set((state) => ({ lines: state.lines.filter((l) => l.id !== id) })),
      setQuantity: (id, quantity) =>
        set((state) => ({
          lines: quantity <= 0 ? state.lines.filter((l) => l.id !== id) : state.lines.map((l) => (l.id === id ? { ...l, quantity } : l)),
        })),
      subtotal: () => get().lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0),
      count: () => get().lines.reduce((sum, l) => sum + l.quantity, 0),
    }),
    { name: "elya-cart", partialize: (state) => ({ lines: state.lines }) },
  ),
);
