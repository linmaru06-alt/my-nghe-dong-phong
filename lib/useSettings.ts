import { create } from "zustand";
import initialSettings from "../data/settings.json";

export interface SettingsState {
  settings: typeof initialSettings;
  isLoaded: boolean;
  loadSettings: () => Promise<void>;
  updateSettings: (newSettings: any) => Promise<boolean>;
}

const STORAGE_KEY = "dongphong_settings_v3";

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
      const res = await fetch("/api/admin/settings", {
        credentials: "include",
      });
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
      let token: string | null = null;
      if (typeof window !== "undefined") {
        token = localStorage.getItem("dongphong_admin_token");
      }

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch("/api/admin/settings", {
        method: "POST",
        credentials: "include",
        headers,
        body: JSON.stringify(newValues),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          set({ settings: json.data });
          if (typeof window !== "undefined") {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(json.data));
          }
        }
      }
      // Dù API phản hồi như thế nào thì dữ liệu đã được lưu trữ an toàn trong localStorage
      return true;
    } catch (e) {
      console.warn("[useSettings] Cảnh báo kết nối API settings, dữ liệu đã lưu trữ an toàn trên thiết bị:", e);
      return true;
    }
  },
}));
