"use client";

import React from "react";
import "./globals.css";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-[#FDFAF6] text-[#2C1A0E] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white p-8 rounded-xl border border-[#E8DDD3] shadow-lg text-center space-y-5">
          <div className="w-14 h-14 rounded-full bg-[#F0E6DA] text-[#6B3F1F] flex items-center justify-center mx-auto text-2xl font-bold">
            !
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#6B3F1F]">
            Mỹ Nghệ Đông Phong
          </h1>
          <p className="text-sm text-[#8C7B6E] leading-relaxed">
            Hệ thống đang được làm mới để đảm bảo trải nghiệm tốt nhất. Xin vui lòng thử tải lại trang.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="w-full py-3 px-5 rounded-lg bg-[#6B3F1F] text-white font-bold text-sm shadow hover:bg-[#4E2D12] transition-colors"
          >
            Tải lại trang
          </button>
        </div>
      </body>
    </html>
  );
}
