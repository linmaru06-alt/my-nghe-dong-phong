import React from "react";
import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";

export interface PriceDisplayProps {
  price?: number | bigint | null;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function PriceDisplay({
  price,
  className,
  size = "md",
}: PriceDisplayProps) {
  const formatted = formatPrice(price);
  const isContact = formatted === "Liên hệ báo giá";

  const sizeClasses = {
    sm: "text-sm",
    md: "text-base md:text-lg font-bold",
    lg: "text-2xl md:text-3xl font-bold font-serif",
  };

  return (
    <span
      className={cn(
        sizeClasses[size],
        isContact
          ? "text-[#C5A059] font-serif font-bold text-sm sm:text-base tracking-wide"
          : "text-primary tracking-tight",
        className
      )}
    >
      {formatted}
    </span>
  );
}

export default PriceDisplay;
