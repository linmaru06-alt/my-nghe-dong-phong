import React from "react";
import Link from "next/link";
import { PackageOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "./Button";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
  onActionClick?: () => void;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionHref,
  actionLabel,
  onActionClick,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 md:p-12 rounded-card bg-surface border border-border/80 max-w-md mx-auto my-8",
        className
      )}
    >
      <div className="w-14 h-14 rounded-full bg-accent-soft flex items-center justify-center text-primary mb-4">
        {icon || <PackageOpen className="w-7 h-7" />}
      </div>
      <h3 className="font-serif text-lg font-bold text-text mb-2">{title}</h3>
      <p className="text-sm text-text-muted mb-6 leading-relaxed">{description}</p>

      {actionHref && actionLabel && (
        <Link href={actionHref}>
          <Button variant="primary" size="sm">
            {actionLabel}
          </Button>
        </Link>
      )}

      {!actionHref && actionLabel && onActionClick && (
        <Button variant="primary" size="sm" onClick={onActionClick}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export default EmptyState;
