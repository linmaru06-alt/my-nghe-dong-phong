"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Badge from "@/components/ui/Badge";
import BlogGrid from "@/components/blog/BlogGrid";
import BlogSidebar from "@/components/blog/BlogSidebar";
import postsData from "@/data/posts.json";
import { formatDate } from "@/lib/utils";

const tabs = [
  { id: "", label: "Tất cả bài viết" },
  { id: "kien-thuc-ve-go", label: "Kiến thức về gỗ" },
  { id: "huong-dan-lua-chon", label: "Hướng dẫn lựa chọn" },
  { id: "bao-quan-san-pham", label: "Bảo quản sản phẩm" },
];

export interface BlogClientProps {
  initialTab?: string;
}

export default function BlogClient({ initialTab = "" }: BlogClientProps) {
  const [activeTab, setActiveTab] = useState(initialTab);

  // Lọc bài viết
  const filteredPosts = activeTab
    ? postsData.filter((p) => p.category === activeTab && p.status === "published")
    : postsData.filter((p) => p.status === "published");

  // Bài viết tiêu điểm đầu tiên
  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: "Bài viết & Cẩm nang" }]} />

      {/* Page Header */}
      <div className="mb-8 max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-3">
          Cẩm Nang & Văn Hóa Đồ Gỗ Quý
        </h1>
        <p className="text-sm md:text-base text-text-muted leading-relaxed">
          Góc chia sẻ kiến thức chuyên sâu về nhận biết danh mộc, ý nghĩa phong thủy và kinh nghiệm giữ vân gỗ bền đẹp theo năm tháng.
        </p>
      </div>

      {/* Tabs Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none mb-10 select-none">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-pill text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? "bg-primary text-white shadow-sm"
                  : "bg-surface border border-border text-text hover:border-primary"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Layout: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        {/* Left Column: Articles (8 cols) */}
        <div className="lg:col-span-8 space-y-10">
          {/* Featured Post Card (Big) */}
          {featuredPost && (
            <article className="group rounded-card bg-surface border border-border/70 overflow-hidden shadow-card hover:shadow-xl transition-all duration-300">
              <Link
                href={`/bai-viet/${featuredPost.slug}`}
                className="relative aspect-16/9 w-full block bg-accent-soft/40 overflow-hidden"
              >
                <Image
                  src={featuredPost.thumbnail || "/images/placeholder.svg"}
                  alt={featuredPost.title}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  sizes="(max-width: 1024px) 100vw, 65vw"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="gold">Tiêu điểm</Badge>
                </div>
              </Link>

              <div className="p-5 md:p-8">
                <div className="flex items-center gap-4 text-xs text-text-muted mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(featuredPost.publishedAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {featuredPost.readingTime} phút đọc
                  </span>
                </div>

                <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-text group-hover:text-primary transition-colors leading-snug mb-3">
                  <Link href={`/bai-viet/${featuredPost.slug}`}>
                    {featuredPost.title}
                  </Link>
                </h2>

                <p className="text-xs sm:text-sm text-text-muted leading-relaxed line-clamp-3 mb-6">
                  {featuredPost.excerpt}
                </p>

                <Link
                  href={`/bai-viet/${featuredPost.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-primary-hover group/link"
                >
                  <span>Đọc bài viết chi tiết</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </article>
          )}

          {/* Remaining Articles Grid (2 cols) */}
          {remainingPosts.length > 0 && (
            <div>
              <h3 className="font-serif text-xl font-bold text-primary mb-6">
                Bài Viết Mới Nhất
              </h3>
              <BlogGrid posts={remainingPosts} />
            </div>
          )}
        </div>

        {/* Right Column: Sidebar (4 cols) */}
        <div className="lg:col-span-4">
          <div className="sticky top-24">
            <BlogSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
