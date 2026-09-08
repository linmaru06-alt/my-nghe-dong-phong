"use client";

import React from "react";
import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";

export interface ProductSizeItem {
  label: string;
  price: number | null;
}

export interface SizeSelectorProps {
  sizes: ProductSizeItem[];
  selectedIndex: number;
  onSelectSize: (index: number) => void;
}

export function SizeSelector({
  sizes,
  selectedIndex,
  onSelectSize,
}: SizeSelectorProps) {
  if (!sizes || sizes.length <= 1) return null;

  return (
    <div className="space-y-2 mb-6 select-none">
      <label className="text-xs font-semibold uppercase tracking-wider text-text-muted block">
        Chọn kích thước / quy cách hạt:
      </label>
      <div className="flex flex-wrap gap-2.5">
        {sizes.map((size, index) => {
          const isSelected = selectedIndex === index;
          const formatted = formatPrice(size.price);

          return (
            <button
              key={size.label}
              type="button"
              onClick={() => onSelectSize(index)}
              className={cn(
                "px-4 py-2 rounded-btn text-xs font-medium border transition-all duration-200 text-left flex flex-col min-w-[72px]",
                isSelected
                  ? "border-primary bg-primary text-white shadow-sm scale-105"
                  : "border-border bg-surface text-text hover:border-primary/50"
              )}
            >
              <span className="font-bold text-sm">{size.label}</span>
              <span
                className={cn(
                  "text-[10px]",
                  isSelected ? "text-white/80" : "text-text-muted"
                )}
              >
                {formatted === "Liên hệ báo giá" ? "Liên hệ" : formatted}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default SizeSelector;
