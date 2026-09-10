import Link from "next/link";
import { cx } from "@/lib/utils";
import type { AnchorHTMLAttributes, ReactNode } from "react";

export function UnderlineLink({
  href,
  children,
  className,
  ...rest
}: { href: string; children: ReactNode; className?: string } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <Link href={href} className={cx("underline-link text-xs uppercase tracking-[0.1em]", className)} {...rest}>
      {children}
    </Link>
  );
}
