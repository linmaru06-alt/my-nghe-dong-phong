"use client";

import React from "react";
import { Search, X, Filter } from "lucide-react";
import categoriesData from "@/data/categories.json";
import { cn } from "@/lib/utils";

export interface ProductFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedWoodType: string;
  onSelectWoodType: (woodType: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  woodTypes: string[];
  totalResults: number;
}

export function ProductFilter({
  selectedCategory,
  onSelectCategory,
  selectedWoodType,
  onSelectWoodType,
  searchQuery,
  onSearchChange,
  woodTypes,
  totalResults,
}: ProductFilterProps) {
  return (
    <div className="space-y-4 mb-8">
      {/* Search and Secondary Select Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search Box */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm theo tên sản phẩm, mã SKU..."
            className="w-full bg-surface border border-border rounded-btn pl-9 pr-8 py-2 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Wood Type Selector & Result Counter */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-56">
            <select
              value={selectedWoodType}
              onChange={(e) => onSelectWoodType(e.target.value)}
              className="w-full bg-surface border border-border rounded-btn px-3 py-2 text-sm text-text focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
            >
              <option value="">Tất cả loại gỗ ({woodTypes.length})</option>
              {woodTypes.map((wood) => (
                <option key={wood} value={wood}>
                  {wood}
                </option>
              ))}
            </select>
            <Filter className="w-3.5 h-3.5 text-text-muted absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <span className="text-xs text-text-muted whitespace-nowrap">
            Đang hiển thị: <strong className="text-primary">{totalResults}</strong> tác phẩm
          </span>
        </div>
      </div>

      {/* Category Filter Chips (Horizontal scrollable) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none snap-x">
        <button
          type="button"
          onClick={() => onSelectCategory("")}
          className={cn(
            "px-4 py-2 rounded-pill text-xs font-semibold whitespace-nowrap transition-all duration-200 snap-start select-none",
            !selectedCategory
              ? "bg-primary text-white shadow-sm"
              : "bg-surface border border-border text-text hover:border-primary hover:text-primary"
          )}
        >
          Tất cả danh mục
        </button>

        {categoriesData.map((cat) => {
          const isActive = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={cn(
                "px-4 py-2 rounded-pill text-xs font-semibold whitespace-nowrap transition-all duration-200 snap-start flex items-center gap-1.5 select-none",
                isActive
                  ? "bg-primary text-white shadow-sm"
                  : "bg-surface border border-border text-text hover:border-primary hover:text-primary"
              )}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ProductFilter;
