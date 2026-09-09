import { NextResponse } from "next/server";
import { getAllProducts, saveProducts } from "@/lib/server/products";

// GET /api/admin/products - Lấy danh sách sản phẩm trực tiếp từ Server Data Layer
export async function GET() {
  try {
    const products = await getAllProducts();
    return NextResponse.json({ success: true, data: products });
  } catch (error: any) {
    console.error("[API /api/admin/products GET] Lỗi đọc sản phẩm:", error);
    return NextResponse.json(
      { success: false, error: "Không thể đọc dữ liệu sản phẩm từ đĩa" },
      { status: 500 }
    );
  }
}

// POST /api/admin/products - Lưu & ghi đè danh sách sản phẩm và revalidate trang chủ & sản phẩm
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

    const result = await saveProducts(products);

    return NextResponse.json({
      success: true,
      message: "Đã lưu và đồng bộ thành công sản phẩm lên trang chính",
      total: result.total,
    });
  } catch (error: any) {
    console.error("[API /api/admin/products POST] Lỗi ghi file:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Lỗi khi ghi dữ liệu sản phẩm vào đĩa" },
      { status: 500 }
    );
  }
}

