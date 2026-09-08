import React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "box" | "product-card" | "blog-card" | "product-detail" | "text";
}

export function Skeleton({ className, variant = "box", ...props }: SkeletonProps) {
  const shimmerClasses =
    "relative overflow-hidden bg-[#E8DDD3]/60 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.8s_infinite] before:bg-gradient-to-r before:from-transparent before:via-[#FAF5EF]/80 before:to-transparent";

  if (variant === "product-card") {
    return (
      <div className="flex flex-col rounded-card bg-surface p-3 border border-border/60 shadow-card">
        <div className={cn("w-full aspect-square rounded-lg mb-3", shimmerClasses)} />
        <div className={cn("h-3 w-1/3 rounded mb-2", shimmerClasses)} />
        <div className={cn("h-5 w-3/4 rounded mb-2", shimmerClasses)} />
        <div className={cn("h-4 w-1/2 rounded mt-auto", shimmerClasses)} />
      </div>
    );
  }

  if (variant === "blog-card") {
    return (
      <div className="flex flex-col rounded-card bg-surface overflow-hidden border border-border/60 shadow-card">
        <div className={cn("w-full aspect-[16/9]", shimmerClasses)} />
        <div className="p-4 space-y-2">
          <div className={cn("h-3 w-1/4 rounded", shimmerClasses)} />
          <div className={cn("h-5 w-full rounded", shimmerClasses)} />
          <div className={cn("h-4 w-5/6 rounded", shimmerClasses)} />
        </div>
      </div>
    );
  }

  if (variant === "product-detail") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className={cn("w-full aspect-square rounded-xl", shimmerClasses)} />
        <div className="space-y-4">
          <div className={cn("h-4 w-1/4 rounded", shimmerClasses)} />
          <div className={cn("h-8 w-3/4 rounded", shimmerClasses)} />
          <div className={cn("h-6 w-1/3 rounded", shimmerClasses)} />
          <div className={cn("h-24 w-full rounded", shimmerClasses)} />
          <div className="flex gap-2">
            <div className={cn("h-10 w-20 rounded", shimmerClasses)} />
            <div className={cn("h-10 w-20 rounded", shimmerClasses)} />
          </div>
        </div>
      </div>
    );
  }

  return <div className={cn("rounded", shimmerClasses, className)} {...props} />;
}

export default Skeleton;
