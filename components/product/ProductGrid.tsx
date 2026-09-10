"use client";

import React from "react";
import ProductCard, { ProductCardProps } from "./ProductCard";
import Skeleton from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import { ScrollRevealGroup } from "@/components/ui/ScrollReveal";

export interface ProductGridProps {
  products: ProductCardProps[];
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
}

export function ProductGrid({
  products,
  isLoading = false,
  emptyTitle = "Không tìm thấy sản phẩm",
  emptyDescription = "Thử thay đổi bộ lọc loại gỗ, danh mục hoặc từ khóa tìm kiếm.",
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} variant="product-card" />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        actionHref="/san-pham"
        actionLabel="Xem tất cả sản phẩm"
      />
    );
  }

  return (
    <ScrollRevealGroup
      staggerDelay={60}
      direction="up"
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6"
    >
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </ScrollRevealGroup>
  );
}

export default ProductGrid;
