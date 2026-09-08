import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  verifyAdminToken,
  getAdminConfig,
  saveAdminConfig,
  verifyCredentials,
  hashPasswordWithSalt,
  ADMIN_COOKIE_NAME,
} from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const cookieStore = cookies();
    let token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

    if (!token) {
      const authHeader = req.headers.get("Authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7);
      }
    }

    const { valid } = await verifyAdminToken(token);
    if (!valid) {
      return NextResponse.json(
        { success: false, error: "Bạn chưa đăng nhập hoặc phiên đã hết hạn." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        {
          success: false,
          error: "Vui lòng nhập đầy đủ mật khẩu hiện tại và mật khẩu mới.",
        },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        {
          success: false,
          error: "Mật khẩu mới phải chứa ít nhất 6 ký tự để đảm bảo an toàn.",
        },
        { status: 400 }
      );
    }

    const config = await getAdminConfig();

    // Xác thực mật khẩu cũ
    const isCurrentValid = await verifyCredentials(config.email, currentPassword);
    if (!isCurrentValid) {
      return NextResponse.json(
        { success: false, error: "Mật khẩu hiện tại không chính xác." },
        { status: 400 }
      );
    }

    // Băm mật khẩu mới với salt mới
    const { hash, salt } = await hashPasswordWithSalt(newPassword);

    const updatedConfig = {
      ...config,
      passwordHash: hash,
      salt: salt,
      updatedAt: new Date().toISOString(),
    };

    const saved = await saveAdminConfig(updatedConfig);
    if (!saved) {
      return NextResponse.json(
        { success: false, error: "Không thể lưu mật khẩu mới vào hệ thống." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Đổi mật khẩu tài khoản quản trị thành công!",
    });
  } catch (error: any) {
    console.error("[API change-password] Lỗi:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Lỗi máy chủ khi đổi mật khẩu." },
      { status: 500 }
    );
  }
}
