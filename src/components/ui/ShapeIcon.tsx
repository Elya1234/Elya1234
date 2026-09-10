import type { Shape } from "@/lib/types";

const paths: Record<Shape, string> = {
  rond: '<circle cx="12" cy="12" r="8" />',
  princesse: '<rect x="5" y="5" width="14" height="14" />',
  coussin: '<rect x="5" y="5" width="14" height="14" rx="5" />',
  emeraude: '<rect x="4" y="6" width="16" height="12" rx="2" />',
  poire: '<path d="M12 4c4 3 6 6 6 9a6 6 0 1 1-12 0c0-3 2-6 6-9Z" />',
  ovale: '<ellipse cx="12" cy="12" rx="6" ry="8" />',
  radiant: '<rect x="4" y="6" width="16" height="12" rx="1.5" />',
  marquise: '<path d="M12 3c4 4.5 7 7.5 7 9s-3 4.5-7 9c-4-4.5-7-7.5-7-9s3-4.5 7-9Z" />',
  coeur: '<path d="M12 20s-7-4.5-7-9.5C5 7 7 5 9.5 5 11 5 12 6 12 6s1-1 2.5-1C17 5 19 7 19 10.5 19 15.5 12 20 12 20Z" />',
  asscher: '<rect x="5" y="5" width="14" height="14" transform="rotate(0 12 12)" />',
};

export function ShapeIcon({ shape, className }: { shape: Shape; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      className={className}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: paths[shape] }}
    />
  );
}
