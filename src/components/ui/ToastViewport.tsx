"use client";
import { useToastStore } from "@/lib/store/toast";
import { cx } from "@/lib/utils";

export function ToastViewport() {
  const { toasts, dismiss } = useToastStore();
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed inset-x-0 bottom-24 z-[200] flex flex-col items-center gap-2 px-4 lg:bottom-8"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className={cx(
            "pointer-events-auto flex items-center gap-3 rounded-sm px-4 py-3 text-sm text-white shadow-popover animate-fade-in-up",
            t.tone === "success" && "bg-vert-profond",
            t.tone === "error" && "bg-red-800",
            t.tone === "info" && "bg-noir-texte",
          )}
        >
          {t.message}
          <button type="button" onClick={() => dismiss(t.id)} aria-label="Fermer la notification" className="text-white/70 hover:text-white">
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
