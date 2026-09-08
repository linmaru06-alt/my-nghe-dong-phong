import type { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Cẩm Nang & Kiến Thức Gỗ Quý | Mỹ Nghệ Đông Phong",
  description:
    "Tổng hợp bài viết chuyên sâu về nhận biết gỗ Tử Đàn, Sưa đỏ, Nu bách xanh, cách chọn kích thước hạt vòng tay phong thủy chuẩn xác.",
};

interface BlogPageProps {
  searchParams?: {
    tab?: string;
  };
}

export default function BlogPage({ searchParams }: BlogPageProps) {
  return (
    <main className="flex-1 w-full bg-bg">
      <BlogClient initialTab={searchParams?.tab || ""} />
    </main>
  );
}
