import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "wood" | "category" | "status-published" | "status-draft" | "gold" | "outline";
}

export function Badge({
  className,
  variant = "category",
  children,
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center px-2.5 py-0.5 rounded-pill text-xs font-medium transition-colors select-none";

  const variantStyles = {
    wood: "bg-[#F3EBE1] text-primary border border-border/80",
    category: "bg-surface text-text-muted border border-border",
    "status-published": "bg-emerald-50 text-emerald-700 border border-emerald-200",
    "status-draft": "bg-stone-100 text-stone-600 border border-stone-200",
    gold: "bg-amber-50 text-amber-800 border border-amber-200",
    outline: "bg-transparent text-text border border-border",
  };

  return (
    <span className={cn(baseStyles, variantStyles[variant], className)} {...props}>
      {children}
    </span>
  );
}

export default Badge;
