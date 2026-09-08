import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const SETTINGS_FILE = path.join(process.cwd(), "data", "settings.json");

// GET /api/admin/settings - Đọc dữ liệu cài đặt từ file data/settings.json
export async function GET() {
  try {
    const fileContent = await fs.readFile(SETTINGS_FILE, "utf-8");
    const settings = JSON.parse(fileContent);
    return NextResponse.json({ success: true, data: settings });
  } catch (error: any) {
    console.error("[API /api/admin/settings GET] Lỗi đọc file:", error);
    return NextResponse.json(
      { success: false, error: "Không thể đọc dữ liệu cài đặt từ đĩa" },
      { status: 500 }
    );
  }
}

// POST /api/admin/settings - Cập nhật và lưu lại dữ liệu vào data/settings.json
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Đọc cài đặt gốc hiện tại
    let currentSettings: any = {};
    try {
      const fileContent = await fs.readFile(SETTINGS_FILE, "utf-8");
      currentSettings = JSON.parse(fileContent);
    } catch {
      currentSettings = {};
    }

    const {
      siteName,
      phone,
      zaloLink,
      address,
      businessHours,
      email,
    } = body;

    // Trích xuất số điện thoại / zalo thuần số
    const cleanPhone = phone ? phone.replace(/[^0-9+]/g, "") : "";
    const cleanZalo = zaloLink ? zaloLink.replace(/.*zalo\.me\//, "").replace(/[^0-9+]/g, "") : "";

    const updatedSettings = {
      ...currentSettings,
      siteName: siteName || currentSettings.siteName || "Mỹ Nghệ Đông Phong",
      hotline: phone || currentSettings.hotline || "0912 345 678",
      hotlineRaw: cleanPhone || currentSettings.hotlineRaw || "0912345678",
      zalo: cleanZalo || currentSettings.zalo || "0912345678",
      zaloLink: zaloLink || currentSettings.zaloLink || "https://zalo.me/0912345678",
      address: address || currentSettings.address || "Hà Nội, Việt Nam",
      workingHours: businessHours || currentSettings.workingHours || "08:00 - 21:00",
      email: email || currentSettings.email || "lienhe@mynghedongphong.vn",
      brand: {
        ...(currentSettings.brand || {}),
        name: siteName || currentSettings.brand?.name || "Mỹ Nghệ Đông Phong",
        phone: phone || currentSettings.brand?.phone || "0912 345 678",
        zaloLink: zaloLink || currentSettings.brand?.zaloLink || "https://zalo.me/0912345678",
        address: address || currentSettings.brand?.address || "Hà Nội, Việt Nam",
        businessHours: businessHours || currentSettings.brand?.businessHours || "08:00 - 21:00",
      },
    };

    // Đảm bảo thư mục data tồn tại
    const dataDir = path.dirname(SETTINGS_FILE);
    await fs.mkdir(dataDir, { recursive: true });

    // Ghi đè file settings.json
    await fs.writeFile(SETTINGS_FILE, JSON.stringify(updatedSettings, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      message: "Đã lưu và đồng bộ cài đặt hệ thống thành công!",
      data: updatedSettings,
    });
  } catch (error: any) {
    console.error("[API /api/admin/settings POST] Lỗi lưu file:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Lỗi khi lưu cài đặt vào máy chủ" },
      { status: 500 }
    );
  }
}
