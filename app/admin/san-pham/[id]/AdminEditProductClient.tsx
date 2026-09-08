"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProductForm from "@/components/admin/ProductForm";
import { useProductsStore } from "@/lib/useProducts";

export interface AdminEditProductClientProps {
  id: string;
}

export default function AdminEditProductClient({ id }: AdminEditProductClientProps) {
  const { products } = useProductsStore();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="p-12 text-center bg-surface rounded-card border border-border">
        <h2 className="text-lg font-serif font-bold text-text mb-2">
          Không tìm thấy sản phẩm #{id}
        </h2>
        <p className="text-xs text-text-muted mb-4">
          Tác phẩm này có thể đã bị xóa hoặc không tồn tại.
        </p>
        <Link
          href="/admin/san-pham"
          className="text-xs font-semibold text-primary hover:underline"
        >
          ← Quay lại danh sách
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/san-pham"
          className="inline-flex items-center gap-1 text-xs text-text-muted hover:text-primary transition-colors mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Quay lại danh sách sản phẩm</span>
        </Link>
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary">
          Chỉnh Sửa: {product.name} ({product.code})
        </h1>
      </div>

      <ProductForm initialData={product as any} isEdit={true} />
    </div>
  );
}
