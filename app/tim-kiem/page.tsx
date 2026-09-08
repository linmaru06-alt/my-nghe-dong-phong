import { Suspense } from "react";
import SearchClient from "./SearchClient";
import Skeleton from "@/components/ui/Skeleton";

export const metadata = {
  title: "Tìm Kiếm Sản Phẩm & Bài Viết | Mỹ Nghệ Đông Phong",
  description: "Tra cứu nhanh các sản phẩm vòng tay gỗ quý, bút ký, gối đệm và kiến thức đồ gỗ tại Mỹ Nghệ Đông Phong.",
};

export default function SearchPage() {
  return (
    <main className="flex-1 w-full bg-bg">
      <Suspense
        fallback={
          <div className="container mx-auto px-4 md:px-6 py-12">
            <div className="h-10 w-96 rounded bg-border/40 mb-8 animate-pulse" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} variant="product-card" />
              ))}
            </div>
          </div>
        }
      >
        <SearchClient />
      </Suspense>
    </main>
  );
}
