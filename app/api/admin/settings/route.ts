import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import os from "os";

const SETTINGS_FILE = path.join(process.cwd(), "data", "settings.json");
const TMP_SETTINGS_FILE = path.join(os.tmpdir(), "dongphong_settings.json");

// In-memory cache cho môi trường serverless (Vercel)
declare global {
  var __dongphongSettingsCache: any | undefined;
}

// Hàm đọc cài đặt an toàn
async function readSettingsSafe() {
  if (global.__dongphongSettingsCache) {
    return global.__dongphongSettingsCache;
  }

  // Thử đọc từ /tmp trước (nếu đã từng lưu trên Vercel)
  try {
    const tmpContent = await fs.readFile(TMP_SETTINGS_FILE, "utf-8");
    const parsed = JSON.parse(tmpContent);
    global.__dongphongSettingsCache = parsed;
    return parsed;
  } catch {}

  // Đọc từ data/settings.json gốc
  try {
    const fileContent = await fs.readFile(SETTINGS_FILE, "utf-8");
    const parsed = JSON.parse(fileContent);
    global.__dongphongSettingsCache = parsed;
    return parsed;
  } catch {
    return {};
  }
}

// Hàm ghi cài đặt an toàn (hỗ trợ cả Local disk và Vercel EROFS)
async function writeSettingsSafe(data: any) {
  global.__dongphongSettingsCache = data;

  let savedToDisk = false;

  // 1. Thử ghi vào data/settings.json gốc (Local/Server có quyền ghi)
  try {
    const dataDir = path.dirname(SETTINGS_FILE);
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(SETTINGS_FILE, JSON.stringify(data, null, 2), "utf-8");
    savedToDisk = true;
  } catch (err: any) {
    // Trên Vercel ổ đĩa là read-only (EROFS), bỏ qua lỗi này
  }

  // 2. Thử ghi vào /tmp để giữ cache trên instance Lambda
  try {
    await fs.writeFile(TMP_SETTINGS_FILE, JSON.stringify(data, null, 2), "utf-8");
    savedToDisk = true;
  } catch {}

  return savedToDisk;
}

// GET /api/admin/settings
export async function GET() {
  try {
    const settings = await readSettingsSafe();
    return NextResponse.json({ success: true, data: settings });
  } catch (error: any) {
    return NextResponse.json({ success: true, data: {} });
  }
}

// POST /api/admin/settings
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const currentSettings = await readSettingsSafe();

    const {
      siteName,
      phone,
      zaloLink,
      facebookLink,
      shopeeLink,
      address,
      businessHours,
      email,
    } = body;

    const cleanPhone = phone ? phone.replace(/[^0-9+]/g, "") : "";
    const cleanZalo = zaloLink ? zaloLink.replace(/.*zalo\.me\//, "").replace(/[^0-9+]/g, "") : "";

    const updatedSettings = {
      ...currentSettings,
      siteName: siteName || currentSettings.siteName || "Mỹ Nghệ Đông Phong",
      hotline: phone || currentSettings.hotline || "096 8888 972",
      hotlineRaw: cleanPhone || currentSettings.hotlineRaw || "0968888972",
      zalo: cleanZalo || currentSettings.zalo || "0968888972",
      zaloLink: zaloLink || currentSettings.zaloLink || "https://zalo.me/0968888972",
      facebook: facebookLink || currentSettings.facebook || "https://www.facebook.com/phong.nk.12",
      shopeeLink: shopeeLink || currentSettings.shopeeLink || "https://vn.shp.ee/JdnPvA3B",
      address: address || currentSettings.address || "Hà Nội, Việt Nam",
      workingHours: businessHours || currentSettings.workingHours || "08:00 - 21:00",
      email: email || currentSettings.email || "lienhe@mynghedongphong.vn",
      socialLinks: {
        ...(currentSettings.socialLinks || {}),
        facebook: facebookLink || currentSettings.socialLinks?.facebook || "https://www.facebook.com/phong.nk.12",
        zalo: zaloLink || currentSettings.socialLinks?.zalo || "https://zalo.me/0968888972",
        shopee: shopeeLink || currentSettings.socialLinks?.shopee || "https://vn.shp.ee/JdnPvA3B",
      },
      brand: {
        ...(currentSettings.brand || {}),
        name: siteName || currentSettings.brand?.name || "Mỹ Nghệ Đông Phong",
        phone: phone || currentSettings.brand?.phone || "096 8888 972",
        zaloLink: zaloLink || currentSettings.brand?.zaloLink || "https://zalo.me/0968888972",
        facebook: facebookLink || currentSettings.brand?.facebook || "https://www.facebook.com/phong.nk.12",
        shopeeLink: shopeeLink || currentSettings.brand?.shopeeLink || "https://vn.shp.ee/JdnPvA3B",
        address: address || currentSettings.brand?.address || "Hà Nội, Việt Nam",
        businessHours: businessHours || currentSettings.brand?.businessHours || "08:00 - 21:00",
      },
    };

    await writeSettingsSafe(updatedSettings);

    return NextResponse.json({
      success: true,
      message: "Đã lưu và đồng bộ cài đặt hệ thống thành công!",
      data: updatedSettings,
    });
  } catch (error: any) {
    console.error("[API /api/admin/settings POST] Lỗi:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Lỗi khi lưu cài đặt" },
      { status: 500 }
    );
  }
}
