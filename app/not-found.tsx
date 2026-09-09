import React from "react";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import categoriesData from "@/data/categories.json";

export const metadata = {
  title: "404 — Không Tìm Thấy Trang | Mỹ Nghệ Đông Phong",
};

export default function NotFound() {
  return (
    <main className="flex-1 min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-bg select-none">
      <div className="max-w-md mx-auto">
        <span className="font-serif text-7xl md:text-8xl font-bold text-primary/40 block mb-2">
          404
        </span>

        <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-3">
          Không Tìm Thấy Trang
        </h1>

        <p className="text-sm text-text-muted leading-relaxed mb-8">
          Đường dẫn bạn yêu cầu có thể đã được chuyển dời hoặc không tồn tại. Mời bạn tham quan các danh mục sản phẩm đồ gỗ quý của chúng tôi:
        </p>

        {/* Category Quick Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categoriesData.map((cat) => (
            <Link
              key={cat.id}
              href={`/san-pham?category=${cat.id}`}
              className="px-3.5 py-1.5 rounded-pill text-xs bg-surface border border-border text-text hover:border-primary hover:text-primary transition-colors inline-block"
            >
              <span>{cat.name}</span>
            </Link>
          ))}
        </div>

        <div className="flex justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold px-6 py-3 rounded-btn transition-colors shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Về Trang Chủ</span>
          </Link>

          <Link
            href="/san-pham"
            className="inline-flex items-center gap-2 border border-border bg-surface hover:border-primary text-text hover:text-primary text-xs font-semibold px-6 py-3 rounded-btn transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Xem Sản Phẩm</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
