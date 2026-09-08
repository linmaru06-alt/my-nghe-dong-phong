"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Phone, Copy, Sparkles, Check, ShieldCheck } from "lucide-react";
import { Product, ProductSize } from "@/lib/useProducts";
import { formatPrice } from "@/lib/formatPrice";
import settingsData from "@/data/settings.json";
import { toast } from "@/components/ui/Toast";

export interface QuickConsultSheetProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  selectedSize?: ProductSize | null;
}

export function QuickConsultSheet({
  isOpen,
  onClose,
  product,
  selectedSize,
}: QuickConsultSheetProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!product) return null;

  const currentSize = selectedSize || product.sizes?.[0] || { label: "Chuẩn", price: null };
  const currentPrice = currentSize.price;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(product.code);
      toast.success(
        `Đã sao chép mã SKU: ${product.code}`,
        "Bạn có thể dán vào khung chat Zalo để được hỗ trợ nhanh nhất."
      );
    } catch {
      toast.info(`Mã sản phẩm: ${product.code}`);
    }
  };

  const consultMessage = encodeURIComponent(
    `Xin chào Mỹ Nghệ Đông Phong, tôi đang xem tác phẩm: ${product.name} (Mã: ${product.code}${
      currentSize.label ? `, Kích thước: ${currentSize.label}` : ""
    }). Nhờ nghệ nhân tư vấn chi tiết và thời giá giúp tôi!`
  );

  const zaloUrl = `${settingsData.brand.zaloLink}?text=${consultMessage}`;
  const phoneUrl = `tel:${settingsData.brand.phone.replace(/\s+/g, "")}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1F1610]/60 backdrop-blur-xs transition-opacity"
          />

          {/* Bottom Sheet Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100) onClose();
            }}
            className="relative w-full sm:max-w-lg bg-[#FAF6F0] rounded-t-3xl sm:rounded-3xl shadow-[0_25px_60px_rgba(44,26,14,0.3)] border border-[#C5A059]/40 p-5 sm:p-7 overflow-hidden z-10 max-h-[90dvh] overflow-y-auto"
            style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom, 1rem))" }}
          >
            {/* Thanh gạt kéo xuống trên Mobile */}
            <div className="w-12 h-1.5 bg-[#5C3A21]/20 rounded-full mx-auto mb-4 sm:hidden cursor-grab active:cursor-grabbing" />

            {/* Header Modal */}
            <div className="flex items-center justify-between border-b border-[#C5A059]/25 pb-3.5 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                <h3 className="font-serif text-lg font-bold text-[#2A160C]">
                  Tư Vấn Tác Phẩm Trực Tiếp
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full text-[#5A4A42] hover:text-[#1F1610] hover:bg-[#2A160C]/5 transition"
                aria-label="Đóng"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Product Summary Card */}
            <div className="flex items-start gap-3.5 bg-white/80 p-3.5 rounded-2xl border border-[#C5A059]/30 mb-5 shadow-2xs">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#2A160C]/5 shrink-0 border border-[#C5A059]/40">
                <Image
                  src={product.images[0] || "/images/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-serif font-bold text-sm text-[#1F1610] leading-snug line-clamp-2">
                  {product.name}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-[#5C3A21] bg-[#C5A059]/15 px-2 py-0.5 rounded-md font-medium">
                    {product.woodType}
                  </span>
                  {currentSize.label && (
                    <span className="text-xs text-[#5A4A42] border border-border px-2 py-0.5 rounded-md">
                      Size: {currentSize.label}
                    </span>
                  )}
                </div>

                {/* SKU Code with 1-tap Copy */}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-[#5A4A42]">Mã SKU:</span>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[#C5A059] bg-[#3D2314]/5 hover:bg-[#C5A059]/20 px-2 py-0.5 rounded transition active:scale-95"
                    title="Bấm để sao chép mã"
                  >
                    <span>{product.code}</span>
                    <Copy className="w-3 h-3 text-[#C5A059]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Price Preview */}
            <div className="flex items-center justify-between bg-[#C5A059]/10 px-4 py-3 rounded-xl border border-[#C5A059]/30 mb-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#5C3A21]">
                Đơn giá thẩm định
              </span>
              <span className="text-base sm:text-lg font-serif font-bold text-[#2A160C]">
                {formatPrice(currentPrice)}
              </span>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-[#5A4A42] mb-5">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Cam kết gỗ tự nhiên 100%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Kiểm tra hàng trước khi nhận</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5">
              {/* Primary: Zalo with prefilled SKU */}
              <a
                href={zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#0068FF] to-[#0054D1] text-white font-medium text-sm flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all active:scale-[0.99]"
              >
                <MessageCircle className="w-5 h-5 fill-white text-[#0068FF]" />
                <span>Nhắn Zalo Nhận Báo Giá (Kèm Mã SKU)</span>
              </a>

              {/* Secondary: Hotline Call */}
              <a
                href={phoneUrl}
                onClick={onClose}
                className="w-full py-3 px-4 rounded-xl bg-[#3D2314] hover:bg-[#2A160C] text-white font-medium text-sm flex items-center justify-center gap-2.5 shadow-md transition-all active:scale-[0.99]"
              >
                <Phone className="w-4 h-4 text-[#C5A059]" />
                <span>Gọi Hotline Nghệ Nhân: {settingsData.brand.phone}</span>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default QuickConsultSheet;
