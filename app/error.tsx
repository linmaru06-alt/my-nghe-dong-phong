"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Home, MessageCircle, AlertTriangle } from "lucide-react";
import settingsData from "@/data/settings.json";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console for debugging
    console.error("Next.js Client Error caught by error boundary:", error);
  }, [error]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-6 bg-bg select-none">
      <div className="max-w-md w-full mx-auto p-8 rounded-card bg-surface border border-border shadow-card text-center space-y-6">
        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-accent-soft text-secondary flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8 text-primary" />
        </div>

        {/* Text */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-secondary">
            Thông Báo Hệ Thống
          </span>
          <h1 className="font-serif text-2xl font-bold text-primary">
            Trang Đang Được Làm Mới
          </h1>
          <p className="text-xs md:text-sm text-text-muted leading-relaxed">
            Hệ thống đang kết nối và làm mới lại thông tin tác phẩm. Quý khách vui lòng nhấn nút bên dưới để tải lại hoặc kết nối trực tiếp với nghệ nhân.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold px-5 py-3 rounded-btn shadow-sm transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Thử Tải Lại Trang</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 border border-border bg-surface hover:border-primary text-text text-xs font-semibold px-5 py-3 rounded-btn transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Về Trang Chủ</span>
          </Link>
        </div>

        {/* Hotline & Zalo Helper */}
        <div className="pt-4 border-t border-border/60 text-xs text-text-muted">
          <span>Cần hỗ trợ ngay? </span>
          <a
            href={settingsData.brand.zaloLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-bold hover:underline inline-flex items-center gap-1 ml-1"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-zalo text-transparent" />
            <span>Nhắn Zalo tư vấn</span>
          </a>
        </div>
      </div>
    </div>
  );
}
