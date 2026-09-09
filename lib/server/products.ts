import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

const isCloudinaryConfigured = Boolean(CLOUD_NAME && API_KEY && API_SECRET);

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
    secure: true,
  });
}

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

let memoryProductsCache: Product[] | null = null;
const TMP_PRODUCTS_FILE = path.join(require("os").tmpdir(), "dongphong_products.json");

/**
 * Đọc danh sách tất cả sản phẩm trực tiếp từ Cloudinary / data/products.json / bộ nhớ /tmp trên Vercel
 */
export async function getAllProducts(): Promise<Product[]> {
  if (memoryProductsCache && memoryProductsCache.length > 0) {
    return memoryProductsCache;
  }

  // 1. Thử đọc từ Cloudinary đám mây nếu có CLOUD_NAME (dữ liệu mới nhất trên Vercel)
  if (CLOUD_NAME) {
    try {
      const cloudUrl = `https://res.cloudinary.com/${CLOUD_NAME}/raw/upload/dongphong_data/products.json?t=${Date.now()}`;
      const res = await fetch(cloudUrl, { cache: "no-store" });
      if (res.ok) {
        const cloudProducts = await res.json();
        if (Array.isArray(cloudProducts) && cloudProducts.length > 0) {
          memoryProductsCache = cloudProducts;
          return cloudProducts;
        }
      }
    } catch {}
  }

  // 2. Thử đọc từ /tmp (nếu trên Vercel đã lưu tạm)
  try {
    const tmpContent = await fs.readFile(TMP_PRODUCTS_FILE, "utf-8");
    const products: Product[] = JSON.parse(tmpContent);
    if (Array.isArray(products) && products.length > 0) {
      memoryProductsCache = products;
      return products;
    }
  } catch {}

  // 3. Thử đọc trực tiếp từ file data/products.json
  try {
    const fileContent = await fs.readFile(PRODUCTS_FILE, "utf-8");
    const products: Product[] = JSON.parse(fileContent);
    if (Array.isArray(products) && products.length > 0) {
      memoryProductsCache = products;
      return products;
    }
  } catch (error) {
    console.warn("[Products Server Layer] Không thể đọc trực tiếp data/products.json:", error);
  }

  // 3. Fallback tĩnh từ module bundle
  try {
    const fallback = require("@/data/products.json");
    return Array.isArray(fallback) ? fallback : [];
  } catch {
    return [];
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
  memoryProductsCache = products;

  // 1. Nếu có Cloudinary, đồng bộ thẳng lên Cloudinary Raw Storage đám mây
  if (isCloudinaryConfigured) {
    try {
      const base64Data = `data:application/json;base64,${Buffer.from(JSON.stringify(products, null, 2)).toString("base64")}`;
      await cloudinary.uploader.upload(base64Data, {
        resource_type: "raw",
        public_id: "dongphong_data/products.json",
        overwrite: true,
        invalidate: true,
      });
      console.log("[Products Server Layer] Đã lưu và đồng bộ products.json lên Cloudinary Raw Storage thành công");
    } catch (cloudErr: any) {
      console.warn("[Products Server Layer] Lỗi tải products.json lên Cloudinary:", cloudErr.message);
    }
  }

  // 2. Thử lưu vào data/products.json trên đĩa (Localhost)
  try {
    const dataDir = path.dirname(PRODUCTS_FILE);
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2), "utf-8");
  } catch (err: any) {
    // 3. Nếu đĩa read-only trên Vercel, lưu vào /tmp
    console.warn("[Products Server Layer] Ổ đĩa Read-Only (Vercel), lưu tạm vào /tmp:", err.message);
    try {
      await fs.writeFile(TMP_PRODUCTS_FILE, JSON.stringify(products, null, 2), "utf-8");
    } catch {}
  }

  try {
    revalidatePath("/");
    revalidatePath("/san-pham");
    revalidatePath("/san-pham/[slug]", "page");
  } catch (err) {
    console.warn("[Products Server Layer] Không thể revalidate path:", err);
  }

  return { success: true, total: products.length };
}

