"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MessageCircle } from "lucide-react";
import PriceDisplay from "./PriceDisplay";
import Badge from "@/components/ui/Badge";
import { createZaloLink } from "@/lib/formatPrice";
import settingsData from "@/data/settings.json";

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
  slug,
  name,
  code,
  woodType,
  images,
  sizes,
  featured,
}: ProductCardProps) {
  const router = useRouter();

  // Find first size price or lowest price
  const firstPrice = sizes && sizes.length > 0 ? sizes[0].price : null;
  const imageUrl = images && images.length > 0 ? images[0] : "/images/placeholder.svg";
  const zaloUrl = createZaloLink(settingsData.brand.zaloLink, code, name);

  const handleCardClick = (e: React.MouseEvent) => {
    // If user clicked directly on or inside the Zalo button, don't navigate to product
    const target = e.target as HTMLElement;
    if (target.closest("a[data-zalo='true']")) {
      return;
    }
    router.push(`/san-pham/${slug}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group flex flex-col rounded-card bg-surface border border-border/70 hover:border-primary/50 shadow-card hover:shadow-xl transition-all duration-300 overflow-hidden relative cursor-pointer"
    >
      {/* Product Image Container */}
      <div className="relative aspect-square w-full bg-accent-soft/40 overflow-hidden block">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Badges on Image */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-pill bg-text/80 text-white backdrop-blur-xs">
            {code}
          </span>
          {featured && (
            <Badge variant="gold" className="text-[10px] py-0 px-2">
              Nổi bật
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-3.5 md:p-4 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[11px] text-text-muted font-medium block truncate mb-1">
            {woodType}
          </span>
          <h3 className="font-serif text-sm md:text-base font-bold text-text group-hover:text-primary transition-colors line-clamp-2 leading-snug">
            {name}
          </h3>
        </div>

        {/* Price & Action Row */}
        <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <span className="text-[10px] text-text-muted block">Giá chỉ từ:</span>
            <PriceDisplay price={firstPrice} size="md" />
          </div>

          <a
            href={zaloUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-zalo="true"
            onClick={(e) => e.stopPropagation()}
            title={`Tư vấn Zalo mã ${code}`}
            className="p-2 rounded-full bg-zalo/10 hover:bg-zalo text-zalo hover:text-white transition-all duration-200 flex-shrink-0 z-10"
            aria-label={`Chat Zalo về sản phẩm ${code}`}
          >
            <MessageCircle className="w-4 h-4 fill-current" />
          </a>
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = "ProductCard";
export default ProductCard;
