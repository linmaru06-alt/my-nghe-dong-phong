import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

export interface ProductSize {
  label: string;
  price: number | null;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  code: string;
  category: string;
  woodType: string;
  description: string;
  preservation: string;
  sizes: ProductSize[];
  images: string[];
  featured: boolean;
  status: "published" | "draft";
  relatedPosts?: string[];
  createdAt: string;
}

const PRODUCTS_FILE = path.join(process.cwd(), "data", "products.json");

/**
 * Đọc danh sách tất cả sản phẩm trực tiếp từ data/products.json trên ổ đĩa
 */
export async function getAllProducts(): Promise<Product[]> {
  try {
    const fileContent = await fs.readFile(PRODUCTS_FILE, "utf-8");
    const products: Product[] = JSON.parse(fileContent);
    return Array.isArray(products) ? products : [];
  } catch (error) {
    console.error("[Products Server Layer] Lỗi đọc data/products.json:", error);
    try {
      const fallback = require("@/data/products.json");
      return Array.isArray(fallback) ? fallback : [];
    } catch {
      return [];
    }
  }
}

/**
 * Lấy danh sách sản phẩm đã xuất bản
 */
export async function getPublishedProducts(): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter((p) => p.status === "published");
}

/**
 * Lấy danh sách sản phẩm nổi bật cho Trang chủ
 */
export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  const published = await getPublishedProducts();
  const featured = published.filter((p) => p.featured);
  return featured.slice(0, limit);
}

/**
 * Tìm sản phẩm theo slug hoặc id hoặc mã code
 */
export async function getProductBySlug(rawSlug: string): Promise<Product | undefined> {
  if (!rawSlug) return undefined;
  const decoded = decodeURIComponent(rawSlug).trim().toLowerCase();
  const products = await getAllProducts();
  return (
    products.find((p) => p.slug.toLowerCase() === decoded) ||
    products.find((p) => p.code.toLowerCase() === decoded) ||
    products.find((p) => p.id.toLowerCase() === decoded)
  );
}

/**
 * Lưu danh sách sản phẩm và xóa cache máy chủ tức thời
 */
export async function saveProducts(products: Product[]): Promise<{ success: boolean; total: number }> {
  const dataDir = path.dirname(PRODUCTS_FILE);
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2), "utf-8");

  try {
    revalidatePath("/");
    revalidatePath("/san-pham");
    revalidatePath("/san-pham/[slug]", "page");
  } catch (err) {
    console.warn("[Products Server Layer] Không thể revalidate path:", err);
  }

  return { success: true, total: products.length };
}
