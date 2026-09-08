import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminToken, getAdminConfig, ADMIN_COOKIE_NAME } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const cookieStore = cookies();
    let token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

    if (!token) {
      const authHeader = req.headers.get("Authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7);
      }
    }

    const { valid, payload } = await verifyAdminToken(token);

    if (!valid || !payload) {
      return NextResponse.json(
        {
          success: false,
          error: "Phiên đăng nhập không hợp lệ hoặc đã hết hạn.",
        },
        { status: 401 }
      );
    }

    const config = await getAdminConfig();

    return NextResponse.json({
      success: true,
      user: {
        email: config.email,
        username: config.username,
        name: config.name,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Lỗi kiểm tra phiên đăng nhập." },
      { status: 500 }
    );
  }
}
