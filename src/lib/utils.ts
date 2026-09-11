export function formatPrice(value: number, locale: string = "fr-FR", currency: string = "EUR"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPriceDecimal(value: number, locale: string = "fr-FR", currency: string = "EUR"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Convertit un numéro français au format national ("01 42 33 55 10") en lien tel: au format
 * international E.164 ("tel:+33142335510"), seul format fiable sur tous les téléphones/pays. */
export function toTelHref(phone: string, countryCode = "33"): string {
  const digits = phone.replace(/\D/g, "");
  const national = digits.startsWith("0") ? digits.slice(1) : digits;
  return `tel:+${countryCode}${national}`;
}
