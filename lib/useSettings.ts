import { create } from "zustand";
import initialSettings from "../data/settings.json";

export interface SettingsState {
  settings: typeof initialSettings;
  isLoaded: boolean;
  loadSettings: () => Promise<void>;
  updateSettings: (newSettings: any) => Promise<boolean>;
}

const STORAGE_KEY = "dongphong_settings_v2";

export const useSettingsStore = create<SettingsState>((set, get) => ({
  settings: initialSettings,
  isLoaded: false,

  loadSettings: async () => {
    if (typeof window === "undefined") return;

    // 1. Nạp từ localStorage trước nếu có để phản hồi tức thì
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        set({ settings: JSON.parse(stored), isLoaded: true });
      }
    } catch {}

    // 2. Thử fetch dữ liệu mới nhất từ API backend
    try {
      const res = await fetch("/api/admin/settings");
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(json.data));
          set({ settings: json.data, isLoaded: true });
          return;
        }
      }
    } catch (e) {
      console.warn("[useSettings] Chưa kết nối được API settings, dùng cache:", e);
    }

    set({ isLoaded: true });
  },

  updateSettings: async (newValues: any) => {
    const current = get().settings;
    const merged = {
      ...current,
      ...newValues,
      brand: {
        ...(current.brand || {}),
        ...(newValues.brand || {}),
      },
    };

    // Cập nhật state và localStorage ngay lập tức
    set({ settings: merged });
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    }

    // Đồng bộ lên API backend
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newValues),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          set({ settings: json.data });
          if (typeof window !== "undefined") {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(json.data));
          }
          return true;
        }
      }
      return false;
    } catch (e) {
      console.error("[useSettings] Lỗi gửi API settings:", e);
      return false;
    }
  },
}));
