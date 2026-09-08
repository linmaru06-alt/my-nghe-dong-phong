import { prisma } from "../../config/database";
import { getCache, setCache, deleteCache } from "../../shared/utils/cache.util";
import { CACHE_KEYS } from "../../shared/constants/cache.keys";

const DEFAULT_SETTINGS = {
  brand: {
    name: "Mỹ Nghệ Đông Phong",
    tagline: "Tinh Hoa Gỗ Quý Việt Nam",
    phone: "0912 345 678",
    zaloPhone: "0912345678",
    zaloLink: "https://zalo.me/0912345678",
    address: "Làng nghề Chạm Khắc Gỗ Truyền Thống, Thường Tín, TP. Hà Nội",
    email: "dongphong.woodart@gmail.com",
    openingHours: "08:00 - 21:00 (Tất cả các ngày trong tuần)",
  },
  policies: {
    warranty: "Cam kết chuẩn danh mộc tự nhiên 100%, bảo hành trọn đời thớ gỗ và vân gỗ.",
    shipping: "Miễn phí giao hàng toàn quốc với đơn hàng từ 1.000.000 ₫, đồng kiểm trước khi thanh toán.",
  },
};

export class SettingsService {
  static async getSettings() {
    const cached = await getCache(CACHE_KEYS.SETTINGS);
    if (cached) return cached;

    const settingRecord = await prisma.setting.findUnique({
      where: { key: "general_settings" },
    });

    if (!settingRecord) {
      return DEFAULT_SETTINGS;
    }

    const value = settingRecord.value as any;
    await setCache(CACHE_KEYS.SETTINGS, value, 86400);
    return value;
  }

  static async updateSettings(data: any) {
    const updated = await prisma.setting.upsert({
      where: { key: "general_settings" },
      create: {
        key: "general_settings",
        value: data,
      },
      update: {
        value: data,
      },
    });

    await deleteCache(CACHE_KEYS.SETTINGS);
    return updated.value;
  }
}
