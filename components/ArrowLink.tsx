import Link from "next/link";
import type { ReactNode } from "react";
import { cx } from "@/lib/format";
import { ArrowRight, ArrowUpRight } from "./Icons";

type ArrowLinkProps = {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
};

export function ArrowLink({
  href,
  children,
  external = false,
  className,
}: ArrowLinkProps) {
  const classes = cx("arrowLink", className);

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>{children}</span>
        <ArrowUpRight />
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      <span>{children}</span>
      <ArrowRight />
    </Link>
  );
}
