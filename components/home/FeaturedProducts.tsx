"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import ScrollReveal, { ScrollRevealGroup } from "@/components/ui/ScrollReveal";
import type { Product } from "@/lib/server/products";
import productsData from "@/data/products.json";

interface FeaturedProductsProps {
  products?: Product[];
  totalCount?: number;
}

export function FeaturedProducts({ products, totalCount }: FeaturedProductsProps) {
  // Lấy sản phẩm nổi bật từ props nếu có, fallback lọc từ file tĩnh
  const featured =
    products && products.length > 0
      ? products.filter((p) => p.featured).slice(0, 8)
      : productsData.filter((p) => p.featured).slice(0, 8);

  const displayTotal = totalCount !== undefined ? totalCount : products?.length || productsData.length;

  return (
    <section className="py-16 md:py-24 bg-surface border-y border-border/60 select-none overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header with Scroll Reveal */}
        <ScrollReveal direction="up" delay={0}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold tracking-widest text-secondary uppercase block mb-2">
                Bộ Sưu Tập Tuyển Chọn
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-primary">
                Tác Phẩm Gỗ Quý Nổi Bật
              </h2>
              <p className="mt-2 text-sm text-text-muted">
                Những phôi gỗ lâu năm có vân hoa độc đáo, thớ gỗ đanh chắc và hương thơm quý phái.
              </p>
            </div>

            <Link
              href="/san-pham"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover transition-colors group flex-shrink-0"
            >
              <span>Xem tất cả ({displayTotal})</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Product Grid with Staggered Scroll Reveal */}
        <ScrollRevealGroup
          staggerDelay={70}
          direction="up"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6"
        >
          {featured.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </ScrollRevealGroup>
      </div>
    </section>
  );
}

export default FeaturedProducts;
