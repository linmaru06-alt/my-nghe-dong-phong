import React from "react";
import BlogCard, { BlogCardProps } from "./BlogCard";
import Skeleton from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";

export interface BlogGridProps {
  posts: BlogCardProps[];
  isLoading?: boolean;
}

export function BlogGrid({ posts, isLoading = false }: BlogGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} variant="blog-card" />
        ))}
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <EmptyState
        title="Chưa có bài viết nào"
        description="Chúng tôi đang chuẩn bị các nội dung kiến thức chuyên sâu về gỗ quý."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {posts.map((post) => (
        <BlogCard key={post.id} {...post} />
      ))}
    </div>
  );
}

export default BlogGrid;
