"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  scrollToTop?: boolean;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
  scrollToTop = true,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const handlePage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
    if (scrollToTop && typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getPages = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <nav
      aria-label="Pagination Navigation"
      className={cn("flex items-center justify-center gap-1.5 py-8", className)}
    >
      <button
        type="button"
        onClick={() => handlePage(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-full border border-border text-text hover:border-primary hover:text-primary disabled:opacity-40 disabled:pointer-events-none transition-colors"
        aria-label="Trang trước"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {getPages().map((page, index) => {
        if (typeof page === "string") {
          return (
            <span key={`ellipsis-${index}`} className="px-2 text-text-muted select-none">
              ...
            </span>
          );
        }

        const isActive = page === currentPage;
        return (
          <button
            key={`page-${page}`}
            type="button"
            onClick={() => handlePage(page)}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "w-9 h-9 rounded-full text-sm font-medium transition-all duration-200 flex items-center justify-center select-none",
              isActive
                ? "bg-primary text-white shadow-sm font-bold scale-105"
                : "text-text hover:bg-accent-soft/50 hover:text-primary"
            )}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        onClick={() => handlePage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-full border border-border text-text hover:border-primary hover:text-primary disabled:opacity-40 disabled:pointer-events-none transition-colors"
        aria-label="Trang sau"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}

export default Pagination;
