import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

export interface BlogCardProps {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  thumbnail: string;
  publishedAt: string;
  readingTime: number;
}

export const BlogCard = React.memo(function BlogCard({
  slug,
  title,
  category,
  excerpt,
  thumbnail,
  publishedAt,
  readingTime,
}: BlogCardProps) {
  const categoryLabels: Record<string, string> = {
    "kien-thuc-ve-go": "Kiến thức gỗ",
    "huong-dan-lua-chon": "Hướng dẫn chọn",
    "bao-quan-san-pham": "Bảo quản gỗ",
  };

  return (
    <article className="group flex flex-col rounded-card bg-surface border border-border/80 hover:border-primary/50 shadow-card hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Thumbnail */}
      <Link
        href={`/bai-viet/${slug}`}
        className="relative aspect-[16/10] w-full bg-accent-soft/40 overflow-hidden block"
      >
        <Image
          src={thumbnail || "/images/placeholder.svg"}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="wood" className="text-xs">
            {categoryLabels[category] || category}
          </Badge>
        </div>
      </Link>

      {/* Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata Row */}
          <div className="flex items-center gap-3 text-xs text-text-muted mb-2.5">
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(publishedAt)}
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {readingTime} phút đọc
            </span>
          </div>

          <Link href={`/bai-viet/${slug}`}>
            <h3 className="font-serif text-lg font-bold text-text group-hover:text-primary transition-colors line-clamp-2 leading-snug mb-2">
              {title}
            </h3>
          </Link>

          <p className="text-sm text-text-muted line-clamp-2 leading-relaxed">
            {excerpt}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-border/40">
          <Link
            href={`/bai-viet/${slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:text-primary-hover"
          >
            <span>Đọc tiếp</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
});

BlogCard.displayName = "BlogCard";
export default BlogCard;
