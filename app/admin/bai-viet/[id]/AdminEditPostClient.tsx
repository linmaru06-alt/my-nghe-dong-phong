"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BlogForm from "@/components/admin/BlogForm";
import { usePostsStore } from "@/lib/usePosts";

export interface AdminEditPostClientProps {
  id: string;
}

export default function AdminEditPostClient({ id }: AdminEditPostClientProps) {
  const { posts } = usePostsStore();
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="p-12 text-center bg-surface rounded-card border border-border">
        <h2 className="text-lg font-serif font-bold text-text mb-2">
          Không tìm thấy bài viết #{id}
        </h2>
        <p className="text-xs text-text-muted mb-4">
          Bài viết có thể đã bị xóa hoặc không tồn tại.
        </p>
        <Link
          href="/admin/bai-viet"
          className="text-xs font-semibold text-primary hover:underline"
        >
          ← Quay lại danh sách bài viết
        </Link>
      </div>
    );
  }

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
          Chỉnh Sửa: {post.title}
        </h1>
      </div>

      <BlogForm initialData={post as any} isEdit={true} />
    </div>
  );
}
