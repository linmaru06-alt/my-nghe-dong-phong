import type { Metadata } from "next";
import { Suspense } from "react";
import BlogClient from "./BlogClient";
import Skeleton from "@/components/ui/Skeleton";

export const metadata: Metadata = {
  title: "Cẩm Nang & Kiến Thức Gỗ Quý | Mỹ Nghệ Đông Phong",
  description:
    "Tổng hợp bài viết chuyên sâu về nhận biết gỗ Tử Đàn, Sưa đỏ, Nu bách xanh, cách chọn kích thước hạt vòng tay phong thủy chuẩn xác.",
};

export default function BlogPage() {
  return (
    <main className="flex-1 w-full bg-bg">
      <Suspense
        fallback={
          <div className="container mx-auto px-4 py-12">
            <div className="h-8 w-64 rounded bg-border/40 mb-8 animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Skeleton variant="blog-card" />
              <Skeleton variant="blog-card" />
            </div>
          </div>
        }
      >
        <BlogClient />
      </Suspense>
    </main>
  );
}
