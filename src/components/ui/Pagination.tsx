import Link from "next/link";
import { cx } from "@/lib/utils";

export function Pagination({
  totalPages,
  currentPage,
  buildHref,
}: {
  totalPages: number;
  currentPage: number;
  buildHref: (page: number) => string;
}) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-2">
      <Link
        href={buildHref(Math.max(1, currentPage - 1))}
        aria-disabled={currentPage === 1}
        aria-label="Page précédente"
        className={cx("flex h-11 w-11 items-center justify-center", currentPage === 1 && "pointer-events-none opacity-30")}
      >
        ‹
      </Link>
      {pages.map((p) => (
        <Link
          key={p}
          href={buildHref(p)}
          aria-current={p === currentPage ? "page" : undefined}
          className={cx(
            "flex h-11 w-11 items-center justify-center text-sm",
            p === currentPage ? "bg-bleu-roi text-white" : "hover:underline",
          )}
        >
          {p}
        </Link>
      ))}
      <Link
        href={buildHref(Math.min(totalPages, currentPage + 1))}
        aria-disabled={currentPage === totalPages}
        aria-label="Page suivante"
        className={cx("flex h-11 w-11 items-center justify-center", currentPage === totalPages && "pointer-events-none opacity-30")}
      >
        ›
      </Link>
    </nav>
  );
}
