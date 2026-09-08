import { NextResponse } from "next/server";
import {
  verifyCredentials,
  createAdminToken,
  getAdminConfig,
  ADMIN_COOKIE_NAME,
} from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { identifier, email, username, password } = body;

    const userLogin = identifier || email || username;

    if (!userLogin || !password) {
      return NextResponse.json(
        {
          success: false,
          error: "Vui lòng nhập đầy đủ tên đăng nhập/email và mật khẩu.",
        },
        { status: 400 }
      );
    }

    const isValid = await verifyCredentials(userLogin, password);

    if (!isValid) {
      return NextResponse.json(
        {
          success: false,
          error: "Tài khoản hoặc mật khẩu không chính xác. Vui lòng kiểm tra lại.",
        },
        { status: 401 }
      );
    }

    const config = await getAdminConfig();
    const token = await createAdminToken(config.email);

    const response = NextResponse.json({
      success: true,
      message: "Đăng nhập hệ thống quản trị thành công!",
      token,
      user: {
        email: config.email,
        username: config.username,
        name: config.name,
      },
    });

    // Cài đặt cookie bảo mật HTTP-Only
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 ngày
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("[API /api/admin/auth/login] Lỗi đăng nhập:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Lỗi máy chủ trong quá trình xác thực.",
      },
      { status: 500 }
    );
  }
}
