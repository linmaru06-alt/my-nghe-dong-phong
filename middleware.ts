// middleware.ts
// Lớp bảo vệ máy chủ (Edge Runtime) cho toàn bộ hệ thống Quản Trị CMS Đông Phong

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAdminToken, ADMIN_COOKIE_NAME } from "@/lib/auth-token";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Ngoại lệ công khai: Trang đăng nhập và API đăng nhập
  if (pathname === "/admin/login" || pathname === "/api/admin/auth/login") {
    // Nếu người dùng đã có token hợp lệ mà lại vào /admin/login thì điều hướng thẳng vào /admin
    if (pathname === "/admin/login") {
      const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
      const { valid } = await verifyAdminToken(token);
      if (valid) {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
    }
    return NextResponse.next();
  }

  // 2. Lấy token xác thực từ Cookie hoặc Authorization header
  let token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) {
    const authHeader = req.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }
  }

  // 3. Kiểm tra tính hợp lệ của token
  const { valid } = await verifyAdminToken(token);

  // 4. Bảo vệ các trang Quản trị (/admin/*)
  if (pathname.startsWith("/admin")) {
    if (!valid) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // 5. Bảo vệ các API Quản trị (/api/admin/*)
  if (pathname.startsWith("/api/admin")) {
    // Cho phép GET danh sách sản phẩm hoặc bài viết nếu cần đọc công khai
    // Nhưng các lệnh POST, PUT, DELETE, và các API cài đặt/auth/me bắt buộc phải có token
    if (!valid) {
      return NextResponse.json(
        {
          success: false,
          error: "Yêu cầu quyền Quản trị viên. Vui lòng đăng nhập hệ thống.",
        },
        { status: 401 }
      );
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
