"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, LayoutGrid } from "lucide-react";
import categoriesData from "@/data/categories.json";
import productsData from "@/data/products.json";

export function CategoryGrid() {
  const getCount = (catId: string) => {
    return productsData.filter((p) => p.category === catId).length;
  };

  return (
    <section id="danh-muc" className="w-full max-w-[1320px] mx-auto px-4 md:px-8 py-16 md:py-24 select-none">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-12 md:mb-16">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary">
          Danh Mục Sản Phẩm
        </h2>
        <div className="w-16 h-0.5 mx-auto mt-2.5 mb-3 bg-secondary" />
        <p className="text-sm md:text-base text-text-muted leading-relaxed">
          Khám phá các tuyệt tác đồ gỗ mỹ nghệ phong thủy và chế tác gia dụng cao cấp từ gỗ tự nhiên lâu năm.
        </p>
      </div>

      {/* Grid: 4 cols on desktop, 2 cols on tablet/mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {categoriesData.map((cat, index) => {
          const count = getCount(cat.id);

          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
            >
              <Link
                href={`/san-pham?category=${cat.id}`}
                className="group flex flex-col p-4 rounded-xl bg-surface border border-border shadow-card hover:shadow-xl hover:-translate-y-1 hover:border-primary transition-all duration-300 h-full justify-between"
              >
                <div>
                  <div className="aspect-square w-full rounded-lg overflow-hidden relative mb-3 bg-[#f5efe6]">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="font-serif text-lg text-primary group-hover:text-secondary transition-colors font-bold">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-text-muted mt-1 line-clamp-1">
                    {cat.description}
                  </p>
                </div>

                <span className="inline-flex items-center justify-between text-xs text-secondary font-semibold mt-4 pt-2 border-t border-border/60">
                  <span>Xem {count} tác phẩm</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          );
        })}

        {/* 8th Card: View All */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.35 }}
        >
          <Link
            href="/san-pham"
            className="group flex flex-col items-center justify-center p-6 rounded-xl text-center border-2 border-dashed border-secondary/40 bg-bg hover:bg-accent-soft/50 hover:border-primary hover:-translate-y-1 transition-all duration-300 h-full min-h-[260px]"
          >
            <span className="w-14 h-14 rounded-full bg-surface flex items-center justify-center text-primary shadow-sm group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all mb-3">
              <LayoutGrid className="w-7 h-7" />
            </span>
            <h3 className="font-serif text-lg text-primary font-bold">
              Xem Tất Cả Danh Mục
            </h3>
            <p className="text-xs text-text-muted mt-1.5 max-w-[200px]">
              Hơn {productsData.length} tác phẩm và mẫu quà tặng thủ công
            </p>
            <span className="inline-flex items-center gap-1 text-xs text-primary font-bold mt-4">
              <span>Khám phá ngay</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default CategoryGrid;
