"use client";
import { useId, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cx } from "@/lib/utils";

interface BaseProps {
  label: string;
  error?: string;
  hint?: string;
}

type InputProps = BaseProps & InputHTMLAttributes<HTMLInputElement> & { as?: "input" };
type TextareaProps = BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement> & { as: "textarea" };

export function FormField(props: InputProps | TextareaProps) {
  const id = useId();
  const { label, error, hint, className, ...rest } = props;
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  const fieldClasses = cx(
    "peer w-full min-h-[52px] border bg-white px-4 pt-5 pb-2 text-base outline-none transition-colors placeholder:text-transparent",
    error ? "border-red-700" : "border-ligne focus:border-vert-profond",
    className,
  );

  return (
    <div className="relative">
      {props.as === "textarea" ? (
        <textarea
          id={id}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          placeholder={label}
          rows={4}
          className={cx(fieldClasses, "pt-6")}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={id}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          placeholder={label}
          className={fieldClasses}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-1.5 text-[11px] uppercase tracking-[0.06em] text-gris-texte transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-[0.06em]"
      >
        {label}
      </label>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-700">
          {error}
        </p>
      )}
      {!error && hint && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-gris-texte">
          {hint}
        </p>
      )}
    </div>
  );
}
