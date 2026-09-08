"use client";

import React from "react";
import { motion } from "framer-motion";
import ProductCard, { ProductCardProps } from "./ProductCard";
import Skeleton from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";

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
    <motion.div
      layout
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6"
    >
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.25, delay: Math.min(index * 0.04, 0.3) }}
        >
          <ProductCard {...product} />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default ProductGrid;
