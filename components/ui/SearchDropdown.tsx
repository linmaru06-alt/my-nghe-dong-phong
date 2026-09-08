"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight, BookOpen, Package } from "lucide-react";
import productsData from "@/data/products.json";
import postsData from "@/data/posts.json";
import { formatPrice } from "@/lib/formatPrice";

export interface SearchDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchDropdown({ isOpen, onClose }: SearchDropdownProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      setQuery("");
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Debounced search logic
  const trimmed = query.trim().toLowerCase();

  const filteredProducts = trimmed
    ? productsData
        .filter(
          (p) =>
            p.name.toLowerCase().includes(trimmed) ||
            p.code.toLowerCase().includes(trimmed) ||
            p.woodType.toLowerCase().includes(trimmed)
        )
        .slice(0, 4)
    : [];

  const filteredPosts = trimmed
    ? postsData
        .filter(
          (p) =>
            p.title.toLowerCase().includes(trimmed) ||
            p.excerpt.toLowerCase().includes(trimmed)
        )
        .slice(0, 3)
    : [];

  const hasResults = filteredProducts.length > 0 || filteredPosts.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trimmed) {
      onClose();
      router.push(`/tim-kiem?q=${encodeURIComponent(trimmed)}`);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center p-4 md:p-12 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-text/50 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="relative w-full max-w-2xl bg-surface rounded-card shadow-2xl border border-border overflow-hidden z-10 my-auto md:my-8"
        >
          {/* Search Input Bar */}
          <form onSubmit={handleSubmit} className="relative flex items-center border-b border-border px-4 py-3.5">
            <Search className="w-5 h-5 text-text-muted mr-3 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm kiếm vòng tay, bút ký, loại gỗ (Tử Đàn, Sưa...)..."
              className="w-full bg-transparent text-base text-text placeholder:text-text-muted focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="p-1 rounded-full text-text-muted hover:text-text mr-2"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-semibold px-2 py-1 rounded bg-accent-soft text-primary hover:bg-accent-soft/80"
            >
              ESC
            </button>
          </form>

          {/* Results Area */}
          <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
            {!trimmed ? (
              <div className="py-8 text-center text-text-muted">
                <p className="text-sm font-medium mb-2">Gợi ý tìm kiếm phổ biến:</p>
                <div className="flex flex-wrap justify-center gap-2 mt-3">
                  {["Vòng tay Tử Đàn", "Bút ký Nu Huyết Long", "Gỗ Sưa", "Nu Bách Xanh", "Đũa mun"].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setQuery(tag)}
                      className="px-3 py-1 rounded-pill text-xs bg-bg border border-border hover:border-primary hover:text-primary transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            ) : !hasResults ? (
              <div className="py-12 text-center text-text-muted">
                <p className="text-base font-serif font-semibold text-text mb-1">
                  Không tìm thấy kết quả cho &quot;{trimmed}&quot;
                </p>
                <p className="text-xs">Vui lòng thử lại với từ khóa khác hoặc liên hệ Zalo để được tư vấn.</p>
              </div>
            ) : (
              <>
                {/* Products Section */}
                {filteredProducts.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-secondary uppercase tracking-wider mb-3">
                      <Package className="w-3.5 h-3.5" />
                      <span>Sản phẩm ({filteredProducts.length})</span>
                    </div>
                    <div className="space-y-2">
                      {filteredProducts.map((p) => {
                        const firstPrice = p.sizes[0]?.price;
                        return (
                          <Link
                            key={p.id}
                            href={`/san-pham/${p.slug}`}
                            onClick={onClose}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-bg transition-colors group"
                          >
                            <div className="relative w-12 h-12 rounded-md overflow-hidden bg-accent-soft flex-shrink-0 border border-border/60">
                              <Image
                                src={p.images[0] || "/images/placeholder.jpg"}
                                alt={p.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-mono text-secondary">{p.code}</span>
                                <h4 className="text-sm font-medium text-text group-hover:text-primary transition-colors truncate">
                                  {p.name}
                                </h4>
                              </div>
                              <p className="text-xs text-text-muted truncate">{p.woodType}</p>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <span className="text-xs font-semibold text-primary">
                                {formatPrice(firstPrice)}
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Posts Section */}
                {filteredPosts.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-secondary uppercase tracking-wider mb-3">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Bài viết kiến thức ({filteredPosts.length})</span>
                    </div>
                    <div className="space-y-2">
                      {filteredPosts.map((post) => (
                        <Link
                          key={post.id}
                          href={`/bai-viet/${post.slug}`}
                          onClick={onClose}
                          className="block p-2 rounded-lg hover:bg-bg transition-colors group"
                        >
                          <h4 className="text-sm font-medium text-text group-hover:text-primary transition-colors line-clamp-1">
                            {post.title}
                          </h4>
                          <p className="text-xs text-text-muted line-clamp-1 mt-0.5">{post.excerpt}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer of modal */}
          {trimmed && hasResults && (
            <div className="p-3 bg-bg border-t border-border text-center">
              <Link
                href={`/tim-kiem?q=${encodeURIComponent(trimmed)}`}
                onClick={onClose}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-hover"
              >
                <span>Xem tất cả kết quả cho &quot;{trimmed}&quot;</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default SearchDropdown;
