import React from "react";

export default function Loading() {
  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center min-h-[50vh] py-16 select-none">
      {/* Top indeterminate gold progress line */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C5A059]/20 via-[#C5A059] to-[#3D2314] animate-pulse z-50 pointer-events-none" />

      {/* Centered subtle brand indicator */}
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-[#C5A059]/30 border-t-[#C5A059] animate-spin" />
        <span className="font-serif text-xs tracking-widest uppercase text-[#5C3A21] font-semibold">
          Đang tải tuyệt tác...
        </span>
      </div>
    </div>
  );
}
