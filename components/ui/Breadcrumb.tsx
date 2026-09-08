import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  showHomeIcon?: boolean;
}

export function Breadcrumb({
  items,
  className,
  showHomeIcon = true,
}: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center text-xs md:text-sm text-text-muted py-3", className)}
    >
      <ol className="flex items-center flex-wrap gap-1 md:gap-1.5">
        <li className="inline-flex items-center">
          <Link
            href="/"
            className="hover:text-primary transition-colors flex items-center gap-1"
          >
            {showHomeIcon && <Home className="w-3.5 h-3.5" />}
            <span>Trang chủ</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="inline-flex items-center gap-1 md:gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-border" />
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-primary transition-colors truncate max-w-[150px] md:max-w-xs"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(
                    "truncate max-w-[180px] md:max-w-md",
                    isLast ? "font-semibold text-primary" : ""
                  )}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
