import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BlogForm from "@/components/admin/BlogForm";

export const metadata = {
  title: "Thêm Bài Viết Mới | Quản Trị Đông Phong",
};

export default function AdminAddPostPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/bai-viet"
          className="inline-flex items-center gap-1 text-xs text-text-muted hover:text-primary transition-colors mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Quay lại danh sách bài viết</span>
        </Link>
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary">
          Soạn Thảo Bài Viết Mới
        </h1>
      </div>

      <BlogForm isEdit={false} />
    </div>
  );
}
