import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BlogCard from "@/components/blog/BlogCard";
import postsData from "@/data/posts.json";

export function BlogPreview() {
  // Take 2 latest articles
  const latestPosts = postsData.slice(0, 2);

  return (
    <section className="py-16 md:py-24 bg-bg select-none">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold tracking-widest text-secondary uppercase block mb-2">
              Tri Thức Về Gỗ Quý
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-primary">
              Cẩm Nang & Văn Hóa Đồ Gỗ
            </h2>
            <p className="mt-2 text-sm text-text-muted">
              Chia sẻ chuyên sâu cách phân biệt vân gỗ, nhận biết mùi hương tự nhiên và kinh nghiệm chọn cỡ hạt.
            </p>
          </div>

          <Link
            href="/bai-viet"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover transition-colors group flex-shrink-0"
          >
            <span>Xem tất cả bài viết</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 2-Col Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {latestPosts.map((post) => (
            <BlogCard key={post.id} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlogPreview;
