import type { Shape } from "@/lib/types";

// Chaque forme est dessinée comme une pierre à facettes réelles (silhouette + lignes de
// taille internes), inspiré des icônes de diamant du site de référence — pas de simples
// contours pleins.
const paths: Record<Shape, string> = {
  rond: `
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="3" />
    <path d="M20 12L15 12M17.66 17.66L14.12 14.12M12 20L12 15M6.34 17.66L9.88 14.12M4 12L9 12M6.34 6.34L9.88 9.88M12 4L12 9M17.66 6.34L14.12 9.88" />
  `,
  princesse: `
    <path d="M5 5H19V19H5Z" />
    <path d="M12 8L16 12L12 16L8 12Z" />
    <path d="M5 5L8 12M19 5L16 12M19 19L16 12M5 19L8 12" />
  `,
  coussin: `
    <rect x="5" y="5" width="14" height="14" rx="5" />
    <circle cx="12" cy="12" r="3.2" />
    <path d="M6.5 6.5L9.7 9.7M17.5 6.5L14.3 9.7M17.5 17.5L14.3 14.3M6.5 17.5L9.7 14.3" />
  `,
  emeraude: `
    <path d="M8 5H16L19 8V16L16 19H8L5 16V8Z" />
    <rect x="8" y="8" width="8" height="8" />
    <path d="M8 5L8 8M16 5L16 8M8 19L8 16M16 19L16 16" />
  `,
  poire: `
    <path d="M12 4c3.6 3 5.5 5.8 5.5 8.8a5.5 5.5 0 1 1-11 0C6.5 9.8 8.4 7 12 4Z" />
    <path d="M12 4V15M12 15L8.3 10.2M12 15L15.7 10.2M9 13.2L12 15L15 13.2" />
  `,
  ovale: `
    <ellipse cx="12" cy="12" rx="6.5" ry="8.5" />
    <ellipse cx="12" cy="12" rx="2.6" ry="3.4" />
    <path d="M12 3.5L12 8.6M16.2 5.8L13.7 9.6M18.5 12L14.6 12M16.2 18.2L13.7 14.4M12 20.5L12 15.4M7.8 18.2L10.3 14.4M5.5 12L9.4 12M7.8 5.8L10.3 9.6" />
  `,
  radiant: `
    <path d="M8 5H16L19 8V16L16 19H8L5 16V8Z" />
    <path d="M8 5L16 19M16 5L8 19" />
  `,
  marquise: `
    <path d="M12 3c4 4.5 7 7.5 7 9s-3 4.5-7 9c-4-4.5-7-7.5-7-9s3-4.5 7-9Z" />
    <path d="M12 3V21M6.5 10L17.5 10M6.2 14L17.8 14" />
  `,
  coeur: `
    <path d="M12 20s-7-4.5-7-9.5C5 7 7 5 9.5 5 11 5 12 6 12 6s1-1 2.5-1C17 5 19 7 19 10.5 19 15.5 12 20 12 20Z" />
    <path d="M12 6V20M9.5 5L12 11L14.5 5M6.3 12L12 11L17.7 12" />
  `,
  asscher: `
    <path d="M8.5 5H15.5L19 8.5V15.5L15.5 19H8.5L5 15.5V8.5Z" />
    <path d="M9.5 8H14.5L16 9.5V14.5L14.5 16H9.5L8 14.5V9.5Z" />
    <path d="M8.5 5L9.5 8M15.5 5L14.5 8M19 8.5L16 9.5M19 15.5L16 14.5M15.5 19L14.5 16M8.5 19L9.5 16M5 15.5L8 14.5M5 8.5L8 9.5" />
  `,
};

export function ShapeIcon({ shape, className }: { shape: Shape; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.75"
      strokeLinejoin="round"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: paths[shape] }}
    />
  );
}
