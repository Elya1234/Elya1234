"use client";
import { useId, type SelectHTMLAttributes } from "react";

export function Select({
  label,
  options,
  className,
  ...rest
}: {
  label: string;
  options: { value: string; label: string }[];
} & SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-[11px] uppercase tracking-[0.06em] text-gris-texte">
        {label}
      </label>
      <select
        id={id}
        className="min-h-[48px] w-full border border-ligne bg-white px-4 text-sm outline-none focus:border-vert-profond"
        {...rest}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
