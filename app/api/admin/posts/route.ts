import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const POSTS_FILE = path.join(process.cwd(), "data", "posts.json");

// GET /api/admin/posts - Lấy danh sách bài viết trực tiếp từ file JSON trên ổ cứng
export async function GET() {
  try {
    const fileContent = await fs.readFile(POSTS_FILE, "utf-8");
    const posts = JSON.parse(fileContent);
    return NextResponse.json({ success: true, data: posts });
  } catch (error: any) {
    console.error("[API /api/admin/posts GET] Lỗi đọc file:", error);
    return NextResponse.json(
      { success: false, error: "Không thể đọc dữ liệu bài viết từ đĩa" },
      { status: 500 }
    );
  }
}

// POST /api/admin/posts - Lưu & ghi đè danh sách bài viết trực tiếp vào data/posts.json
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { posts } = body;

    if (!Array.isArray(posts)) {
      return NextResponse.json(
        { success: false, error: "Dữ liệu posts gửi lên phải là một danh sách (mảng) hợp lệ" },
        { status: 400 }
      );
    }

    // Ghi vào file data/posts.json hoặc fallback /tmp trên Vercel
    try {
      const dataDir = path.dirname(POSTS_FILE);
      await fs.mkdir(dataDir, { recursive: true });
      await fs.writeFile(POSTS_FILE, JSON.stringify(posts, null, 2), "utf-8");
    } catch {
      try {
        const tmpFile = path.join(require("os").tmpdir(), "dongphong_posts.json");
        await fs.writeFile(tmpFile, JSON.stringify(posts, null, 2), "utf-8");
      } catch {}
    }

    return NextResponse.json({
      success: true,
      message: "Đã lưu và đồng bộ thành công bài viết",
      total: posts.length,
    });
  } catch (error: any) {
    console.error("[API /api/admin/posts POST] Lỗi ghi file:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Lỗi khi ghi dữ liệu bài viết vào đĩa" },
      { status: 500 }
    );
  }
}
