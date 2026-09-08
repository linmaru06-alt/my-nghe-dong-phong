"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MessageCircle, Sparkles, Eye } from "lucide-react";
import PriceDisplay from "./PriceDisplay";
import Badge from "@/components/ui/Badge";
import { QuickConsultSheet } from "./QuickConsultSheet";
import { Product } from "@/lib/useProducts";

export interface ProductCardProps {
  id: string;
  slug: string;
  name: string;
  code: string;
  category: string;
  woodType: string;
  images: string[];
  sizes: { label: string; price: number | null }[];
  featured?: boolean;
}

export const ProductCard = React.memo(function ProductCard({
  id,
  slug,
  name,
  code,
  category,
  woodType,
  images,
  sizes,
  featured,
}: ProductCardProps) {
  const router = useRouter();
  const [isConsultOpen, setIsConsultOpen] = useState(false);

  const firstPrice = sizes && sizes.length > 0 ? sizes[0].price : null;
  const imageUrl = images && images.length > 0 ? images[0] : "/images/placeholder.svg";

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button[data-action='consult']")) {
      return;
    }
    router.push(`/san-pham/${slug}`);
  };

  const productObject: Product = {
    id,
    slug,
    name,
    code,
    category,
    woodType,
    description: "",
    preservation: "",
    sizes,
    images,
    featured: !!featured,
    status: "published",
    createdAt: "",
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className="group flex flex-col rounded-2xl bg-white border border-[#C5A059]/25 hover:border-[#C5A059]/80 shadow-[0_4px_16px_rgba(44,26,14,0.06)] hover:shadow-[0_16px_36px_rgba(44,26,14,0.14)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden relative cursor-pointer"
      >
        {/* Product Image Container */}
        <div className="relative aspect-square w-full bg-[#FAF6F0] overflow-hidden block">
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
          />

          {/* Badges on Image */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
            <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1F1610]/80 text-white backdrop-blur-xs shadow-xs border border-white/20">
              {code}
            </span>
            {featured && (
              <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#1F1610] shadow-sm">
                ★ Tác Phẩm Nổi Bật
              </span>
            )}
          </div>

          {/* Quick Hover Action Overlay (Desktop) */}
          <div className="absolute inset-0 bg-[#2A160C]/20 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex items-center justify-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full bg-white/95 text-[#2A160C] text-xs font-semibold shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
              <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
              Chi tiết tác phẩm
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between bg-gradient-to-b from-white to-[#FAF6F0]/40">
          <div>
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="text-[11px] text-[#5C3A21] font-medium block truncate">
                {woodType}
              </span>
              <span className="text-[10px] text-[#C5A059] font-medium hidden sm:inline-block">
                Gỗ Quý
              </span>
            </div>
            <h3 className="font-serif text-sm sm:text-base font-bold text-[#1F1610] group-hover:text-[#5C3A21] transition-colors line-clamp-2 leading-snug">
              {name}
            </h3>
          </div>

          {/* Price & Action Row */}
          <div className="mt-3.5 pt-3 border-t border-[#C5A059]/20 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <span className="text-[10px] text-[#5A4A42] block">Định giá từ:</span>
              <PriceDisplay price={firstPrice} size="md" />
            </div>

            {/* Quick Consult Button */}
            <button
              type="button"
              data-action="consult"
              onClick={(e) => {
                e.stopPropagation();
                setIsConsultOpen(true);
              }}
              title="Nhận tư vấn & báo giá nhanh"
              className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl bg-[#0068FF]/10 hover:bg-[#0068FF] text-[#0068FF] hover:text-white transition-all duration-200 flex items-center gap-1.5 shrink-0 active:scale-95 shadow-2xs"
              aria-label={`Tư vấn sản phẩm ${code}`}
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span className="text-xs font-semibold hidden md:inline">Tư vấn</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Consult Bottom Sheet */}
      <QuickConsultSheet
        isOpen={isConsultOpen}
        onClose={() => setIsConsultOpen(false)}
        product={productObject}
        selectedSize={sizes?.[0]}
      />
    </>
  );
});

ProductCard.displayName = "ProductCard";
export default ProductCard;
