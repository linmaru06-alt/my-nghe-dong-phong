import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  actionHref,
  actionLabel,
  align = "left",
  className,
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-12",
        isCenter ? "text-center md:flex-col md:items-center" : "",
        className
      )}
    >
      <div className={cn("max-w-2xl", isCenter ? "mx-auto" : "")}>
        {eyebrow && (
          <span className="text-xs md:text-sm tracking-wider uppercase font-semibold text-secondary mb-2 block">
            {eyebrow}
          </span>
        )}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-primary leading-tight">
          {title}
        </h2>
        {description && (
          <p className="mt-2.5 text-sm md:text-base text-text-muted leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {actionHref && actionLabel && (
        <div className={cn("flex-shrink-0", isCenter ? "mt-2" : "")}>
          <Link
            href={actionHref}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-hover group transition-colors"
          >
            <span>{actionLabel}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      )}
    </div>
  );
}

export default SectionHeader;
