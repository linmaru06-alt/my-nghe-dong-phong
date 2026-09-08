import { Suspense } from "react";
import ProductsClient from "./ProductsClient";
import Skeleton from "@/components/ui/Skeleton";

export const metadata = {
  title: "Danh Mục Sản Phẩm Đồ Gỗ Quý | Mỹ Nghệ Đông Phong",
  description:
    "Khám phá các sản phẩm vòng tay Tử Đàn, Sưa đỏ, Nu bách xanh, bút ký phong thủy và đồ thủ công cao cấp Mỹ Nghệ Đông Phong.",
};

export default function ProductsPage() {
  return (
    <main className="flex-1 w-full bg-bg">
      <Suspense
        fallback={
          <div className="container mx-auto px-4 md:px-6 py-12">
            <div className="h-8 w-64 rounded bg-border/40 mb-8 animate-pulse" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} variant="product-card" />
              ))}
            </div>
          </div>
        }
      >
        <ProductsClient />
      </Suspense>
    </main>
  );
}
