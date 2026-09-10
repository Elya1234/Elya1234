import { cx } from "@/lib/utils";

export function Stepper({ steps, currentIndex }: { steps: string[]; currentIndex: number }) {
  return (
    <ol className="flex items-start" aria-label="Étapes">
      {steps.map((step, i) => (
        <li key={step} className={cx("flex flex-1 flex-col items-center gap-2", i === 0 && "items-start", i === steps.length - 1 && "items-end")}>
          <div className="flex w-full items-center">
            <span
              aria-current={i === currentIndex ? "step" : undefined}
              className={cx(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs",
                i < currentIndex && "border-vert-profond bg-vert-profond text-white",
                i === currentIndex && "border-vert-profond text-vert-profond",
                i > currentIndex && "border-ligne text-gris-texte",
              )}
            >
              {i < currentIndex ? "✓" : i + 1}
            </span>
            {i < steps.length - 1 && (
              <span className={cx("mx-1 h-px flex-1", i < currentIndex ? "bg-vert-profond" : "bg-ligne")} aria-hidden="true" />
            )}
          </div>
          <span
            className={cx(
              "hidden text-center text-[10px] uppercase tracking-[0.06em] sm:block",
              i === currentIndex ? "text-vert-profond" : "text-gris-texte",
            )}
          >
            {step}
          </span>
        </li>
      ))}
    </ol>
  );
}
