"use client";

import React from "react";
import { create } from "zustand";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
}

interface ToastState {
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, "id">) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newToast: ToastItem = { ...toast, id };

    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));

    const duration = toast.duration || 3500;
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, duration);
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));

// Quick global helper
export const toast = {
  success: (title: string, description?: string, duration?: number) => {
    useToastStore.getState().addToast({ type: "success", title, description, duration });
  },
  error: (title: string, description?: string, duration?: number) => {
    useToastStore.getState().addToast({ type: "error", title, description, duration });
  },
  info: (title: string, description?: string, duration?: number) => {
    useToastStore.getState().addToast({ type: "info", title, description, duration });
  },
  warning: (title: string, description?: string, duration?: number) => {
    useToastStore.getState().addToast({ type: "warning", title, description, duration });
  },
};

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  const getIcon = (type: ToastType) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-[#C5A059] shrink-0" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />;
      default:
        return <Info className="w-5 h-5 text-amber-800 shrink-0" />;
    }
  };

  return (
    <div
      className="fixed z-50 right-0 md:right-6 left-0 md:left-auto flex flex-col items-center md:items-end gap-2.5 pointer-events-none px-4 max-w-sm sm:max-w-md w-full bottom-20 md:bottom-6"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
            className="pointer-events-auto w-full bg-[#FAF6F0]/95 backdrop-blur-md rounded-2xl shadow-[0_12px_32px_rgba(44,26,14,0.14)] border border-[#C5A059]/40 p-4 flex items-start gap-3 text-left"
          >
            {getIcon(t.type)}
            <div className="flex-1 pr-2">
              <h4 className="text-sm font-serif font-bold text-[#2A160C] leading-snug">
                {t.title}
              </h4>
              {t.description && (
                <p className="text-xs text-[#5C3A21] mt-0.5 leading-relaxed font-sans">
                  {t.description}
                </p>
              )}
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="text-[#5C3A21]/60 hover:text-[#2A160C] p-1 rounded-lg hover:bg-[#2A160C]/5 transition"
              aria-label="Đóng thông báo"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default ToastContainer;
