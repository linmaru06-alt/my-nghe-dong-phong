"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
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

export default function BlogClient() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "";
  const [activeTab, setActiveTab] = useState(initialTab);

  // Filter posts
  const filteredPosts = activeTab
    ? postsData.filter((p) => p.category === activeTab && p.status === "published")
    : postsData.filter((p) => p.status === "published");

  // First article as featured
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
                  : "bg-surface border border-border text-text hover:border-primary hover:text-primary"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Featured Article Card (Full-width prominence) */}
      {featuredPost && (
        <div className="mb-12 rounded-card bg-surface border border-border overflow-hidden shadow-card hover:shadow-xl transition-all duration-300 group">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto min-h-[260px] bg-accent-soft/30 overflow-hidden">
              <Image
                src={featuredPost.thumbnail}
                alt={featuredPost.title}
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="lg:col-span-6 p-6 md:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Badge variant="wood">Tiêu điểm</Badge>
                  <span className="text-xs text-text-muted flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(featuredPost.publishedAt)}
                  </span>
                  <span className="text-xs text-text-muted flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {featuredPost.readingTime} phút đọc
                  </span>
                </div>

                <Link href={`/bai-viet/${featuredPost.slug}`}>
                  <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-primary group-hover:text-primary-hover transition-colors mb-3 leading-snug">
                    {featuredPost.title}
                  </h2>
                </Link>

                <p className="text-sm text-text-muted leading-relaxed line-clamp-3 mb-6">
                  {featuredPost.excerpt}
                </p>
              </div>

              <Link
                href={`/bai-viet/${featuredPost.slug}`}
                className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-hover"
              >
                <span>Đọc toàn bộ bài viết</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Grid + Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8">
          <BlogGrid posts={remainingPosts} />
        </div>
        <div className="lg:col-span-4">
          <BlogSidebar />
        </div>
      </div>
    </div>
  );
}
