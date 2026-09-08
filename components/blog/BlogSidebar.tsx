import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, ArrowRight, Sparkles } from "lucide-react";
import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";
import settingsData from "@/data/settings.json";
import { formatPrice } from "@/lib/formatPrice";

export interface BlogSidebarProps {
  relatedProductIds?: string[];
}

export function BlogSidebar({ relatedProductIds = [] }: BlogSidebarProps) {
  // Find related products or pick top 3 featured products
  const products = relatedProductIds.length > 0
    ? productsData.filter((p) => relatedProductIds.includes(p.id))
    : productsData.filter((p) => p.featured).slice(0, 3);

  return (
    <aside className="space-y-8 select-none">
      {/* 1. Direct Consultation Box */}
      <div className="p-6 rounded-card bg-accent-soft/60 border border-border">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-secondary mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Tư Vấn Phong Thủy</span>
        </div>
        <h3 className="font-serif text-lg font-bold text-primary mb-2">
          Bạn cần tìm sản phẩm hợp mệnh?
        </h3>
        <p className="text-xs text-text-muted leading-relaxed mb-4">
          Nghệ nhân Đông Phong hỗ trợ kiểm tra năm sinh, cung mệnh để chọn loại gỗ và số hạt tốt nhất.
        </p>
        <a
          href={settingsData.brand.zaloLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-btn bg-zalo hover:brightness-105 text-white text-xs font-bold shadow-sm transition-all"
        >
          <MessageCircle className="w-4 h-4 fill-white text-zalo" />
          <span>Nhắn Zalo Ngay</span>
        </a>
      </div>

      {/* 2. Related Products Box */}
      {products.length > 0 && (
        <div className="p-6 rounded-card bg-surface border border-border">
          <h3 className="font-serif text-base font-bold text-text mb-4 pb-2 border-b border-border">
            Tác Phẩm Đề Xuất
          </h3>
          <div className="space-y-3">
            {products.map((p) => {
              const price = p.sizes[0]?.price;
              return (
                <Link
                  key={p.id}
                  href={`/san-pham/${p.slug}`}
                  className="flex items-center gap-3 group p-1 rounded-lg hover:bg-bg transition-colors"
                >
                  <div className="relative w-14 h-14 rounded-md overflow-hidden bg-accent-soft flex-shrink-0 border border-border/60">
                    <Image
                      src={p.images[0] || "/images/placeholder.jpg"}
                      alt={p.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-mono text-secondary block">
                      {p.code}
                    </span>
                    <h4 className="text-xs font-semibold text-text group-hover:text-primary transition-colors line-clamp-1">
                      {p.name}
                    </h4>
                    <span className="text-xs font-bold text-primary block mt-0.5">
                      {formatPrice(price)}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Categories Navigation */}
      <div className="p-6 rounded-card bg-surface border border-border">
        <h3 className="font-serif text-base font-bold text-text mb-4 pb-2 border-b border-border">
          Danh Mục Gỗ Quý
        </h3>
        <div className="space-y-1.5">
          {categoriesData.map((cat) => (
            <Link
              key={cat.id}
              href={`/san-pham?category=${cat.id}`}
              className="flex items-center justify-between py-1.5 text-xs text-text-muted hover:text-primary transition-colors group"
            >
              <span className="flex items-center gap-2">
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-primary" />
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default BlogSidebar;
