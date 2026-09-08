"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, RotateCcw } from "lucide-react";
import categoriesData from "@/data/categories.json";

export interface MobileFilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedWoodType: string;
  onSelectWoodType: (woodType: string) => void;
  woodTypes: string[];
  totalResults: number;
}

export function MobileFilterSheet({
  isOpen,
  onClose,
  selectedCategory,
  onSelectCategory,
  selectedWoodType,
  onSelectWoodType,
  woodTypes,
  totalResults,
}: MobileFilterSheetProps) {
  // Lock body scroll when bottom sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleReset = () => {
    onSelectCategory("");
    onSelectWoodType("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center select-none">
          {/* Modal Scrim Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#2C1A0E]/55 backdrop-blur-[2px]"
          />

          {/* Bottom Sheet Surface (~75% viewport height max) */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="relative w-full max-w-lg bg-[#FFF8F5] rounded-t-[24px] shadow-[0_-8px_32px_rgba(44,26,14,0.25)] overflow-hidden flex flex-col max-h-[85vh] z-10"
          >
            {/* Grabber Header */}
            <div className="flex flex-col items-center pt-3 pb-2 px-4 border-b border-border/40 bg-surface">
              <div className="w-10 h-1 rounded-full bg-border mb-2" />
              <div className="w-full flex items-center justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center text-text-muted hover:text-text rounded-full hover:bg-bg"
                  aria-label="Đóng bộ lọc"
                >
                  <X className="w-5 h-5" />
                </button>
                <h2 className="font-serif text-lg text-primary font-bold tracking-tight text-center flex-1">
                  Bộ Lọc Tác Phẩm
                </h2>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-secondary hover:text-primary transition-colors py-1 px-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Đặt lại</span>
                </button>
              </div>
              <p className="text-[11px] text-text-muted text-center mt-1">
                Tuyển chọn theo thớ gỗ, phẩm cấp và kích thước chuẩn phong thủy
              </p>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
              {/* 1. Danh mục chế tác */}
              <section className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-primary font-bold">
                    Danh mục chế tác
                  </span>
                  <span className="text-[11px] text-text-muted">Chạm để chọn</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectCategory("")}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium transition-all ${
                      !selectedCategory
                        ? "bg-primary text-white shadow-sm font-semibold"
                        : "bg-surface border border-border text-text hover:border-primary"
                    }`}
                  >
                    {!selectedCategory && <Check className="w-3.5 h-3.5" />}
                    <span>Tất cả danh mục</span>
                  </button>

                  {categoriesData.map((cat) => {
                    const isActive = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => onSelectCategory(cat.id)}
                        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs transition-all ${
                          isActive
                            ? "bg-primary text-white shadow-sm font-semibold"
                            : "bg-surface border border-border text-text hover:border-primary"
                        }`}
                      >
                        {isActive && <Check className="w-3.5 h-3.5" />}
                        <span>{cat.name}</span>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* 2. Chủng loại gỗ quý */}
              <section className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-primary font-bold">
                    Chủng loại gỗ quý
                  </span>
                  <span className="text-[11px] text-secondary font-medium">Phôi lâu năm</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectWoodType("")}
                    className={`flex items-center justify-between p-3 rounded-xl border text-left text-xs transition-all ${
                      !selectedWoodType
                        ? "bg-primary/5 border-primary text-primary font-semibold"
                        : "bg-surface border-border text-text hover:border-primary/50"
                    }`}
                  >
                    <span>Tất cả loại gỗ</span>
                    {!selectedWoodType && <Check className="w-4 h-4 text-primary" />}
                  </button>

                  {woodTypes.map((wood) => {
                    const isActive = selectedWoodType === wood;
                    return (
                      <button
                        key={wood}
                        type="button"
                        onClick={() => onSelectWoodType(wood)}
                        className={`flex items-center justify-between p-3 rounded-xl border text-left text-xs transition-all ${
                          isActive
                            ? "bg-primary/5 border-primary text-primary font-semibold"
                            : "bg-surface border-border text-text hover:border-primary/50"
                        }`}
                      >
                        <span className="truncate pr-1">{wood}</span>
                        {isActive && <Check className="w-4 h-4 text-primary shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </section>
            </div>

            {/* Bottom Sticky Action Button */}
            <div className="p-4 border-t border-border/50 bg-surface flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 px-6 rounded-btn bg-primary hover:bg-primary-hover text-white font-bold text-sm shadow-md active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                <span>Xem {totalResults} tác phẩm phù hợp</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default MobileFilterSheet;
