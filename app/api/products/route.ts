import { NextResponse } from "next/server";
import { getPublishedProducts, getProductBySlug } from "@/lib/server/products";

export const dynamic = "force-dynamic";

// GET /api/products - API công khai lấy danh sách sản phẩm đã xuất bản
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const category = searchParams.get("category");
    const woodType = searchParams.get("woodType");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");
    const limit = searchParams.get("limit");

    if (slug) {
      const product = await getProductBySlug(slug);
      if (!product || product.status !== "published") {
        return NextResponse.json(
          { success: false, error: "Không tìm thấy tác phẩm" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: product });
    }

    let products = await getPublishedProducts();

    if (featured === "true") {
      products = products.filter((p) => p.featured);
    }

    if (category) {
      products = products.filter((p) => p.category === category);
    }

    if (woodType) {
      products = products.filter((p) =>
        p.woodType.toLowerCase().includes(woodType.toLowerCase())
      );
    }

    if (search) {
      const q = search.toLowerCase().trim();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.code.toLowerCase().includes(q) ||
          p.woodType.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (limit) {
      const count = parseInt(limit, 10);
      if (!isNaN(count) && count > 0) {
        products = products.slice(0, count);
      }
    }

    return NextResponse.json({
      success: true,
      data: products,
      total: products.length,
    });
  } catch (error: any) {
    console.error("[API /api/products GET] Lỗi lấy danh sách sản phẩm:", error);
    return NextResponse.json(
      { success: false, error: "Lỗi hệ thống khi tải sản phẩm" },
      { status: 500 }
    );
  }
}
