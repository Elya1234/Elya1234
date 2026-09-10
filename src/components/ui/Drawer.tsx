"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cx } from "@/lib/utils";

export function Drawer({
  open,
  onClose,
  title,
  children,
  side = "right",
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  side?: "right" | "left" | "bottom";
  footer?: ReactNode;
}) {
  // Retire le panneau fermé de l'arbre d'accessibilité et de l'ordre de tabulation,
  // tout en le laissant dans le DOM pour l'animation de fermeture.
  const rootRef = useRef<HTMLDivElement | null>(null);
  const setRootRef = (el: HTMLDivElement | null) => {
    rootRef.current = el;
    if (el) {
      if (open) el.removeAttribute("inert");
      else el.setAttribute("inert", "");
    }
  };
  useEffect(() => {
    const el = rootRef.current;
    if (el) {
      if (open) el.removeAttribute("inert");
      else el.setAttribute("inert", "");
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  const panelPosition = {
    right: "right-0 top-0 h-full w-full max-w-md",
    left: "left-0 top-0 h-full w-full max-w-md",
    bottom: "bottom-0 left-0 w-full max-h-[85dvh] rounded-t-2xl",
  }[side];

  const translateClosed = {
    right: "translate-x-full",
    left: "-translate-x-full",
    bottom: "translate-y-full",
  }[side];

  return createPortal(
    <div ref={setRootRef} className={cx("fixed inset-0 z-[100]", !open && "pointer-events-none")}>
      <div
        className={cx("absolute inset-0 bg-black/40 transition-opacity duration-300", open ? "opacity-100" : "opacity-0")}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cx(
          "absolute flex flex-col bg-white shadow-popover transition-transform duration-300 ease-out",
          panelPosition,
          open ? "translate-x-0 translate-y-0" : translateClosed,
        )}
        style={{ paddingBottom: side === "bottom" ? "env(safe-area-inset-bottom)" : undefined }}
      >
        <div className="flex min-h-[64px] items-center justify-between border-b border-ligne px-5">
          <h2 className="font-serif text-xl">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Fermer" className="flex h-11 w-11 items-center justify-center text-xl">
            ×
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>
        {footer && <div className="border-t border-ligne px-5 py-4">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}
