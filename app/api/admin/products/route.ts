import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const PRODUCTS_FILE = path.join(process.cwd(), "data", "products.json");

// GET /api/admin/products - Lấy danh sách sản phẩm trực tiếp từ file JSON trên ổ cứng
export async function GET() {
  try {
    const fileContent = await fs.readFile(PRODUCTS_FILE, "utf-8");
    const products = JSON.parse(fileContent);
    return NextResponse.json({ success: true, data: products });
  } catch (error: any) {
    console.error("[API /api/admin/products GET] Lỗi đọc file:", error);
    return NextResponse.json(
      { success: false, error: "Không thể đọc dữ liệu sản phẩm từ đĩa" },
      { status: 500 }
    );
  }
}

// POST /api/admin/products - Lưu & ghi đè danh sách sản phẩm trực tiếp vào data/products.json
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { products } = body;

    if (!Array.isArray(products)) {
      return NextResponse.json(
        { success: false, error: "Dữ liệu products gửi lên phải là một danh sách (mảng) hợp lệ" },
        { status: 400 }
      );
    }

    // Đảm bảo thư mục data tồn tại
    const dataDir = path.dirname(PRODUCTS_FILE);
    await fs.mkdir(dataDir, { recursive: true });

    // Ghi đè vào file data/products.json với định dạng chuẩn 2 spaces
    await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      message: "Đã lưu và đồng bộ thành công vào data/products.json",
      total: products.length,
    });
  } catch (error: any) {
    console.error("[API /api/admin/products POST] Lỗi ghi file:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Lỗi khi ghi dữ liệu sản phẩm vào đĩa" },
      { status: 500 }
    );
  }
}
