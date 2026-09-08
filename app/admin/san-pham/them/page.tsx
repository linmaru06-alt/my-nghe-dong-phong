import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProductForm from "@/components/admin/ProductForm";

export const metadata = {
  title: "Thêm Sản Phẩm Mới | Quản Trị Đông Phong",
};

export default function AdminAddProductPage() {
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
          Thêm Tác Phẩm Mộc Mới
        </h1>
      </div>

      <ProductForm isEdit={false} />
    </div>
  );
}
