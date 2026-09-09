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

export interface Post {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  relatedProducts?: string[];
  status: "published" | "draft";
  publishedAt: string;
  readingTime: number;
}

const POSTS_FILE = path.join(process.cwd(), "data", "posts.json");

let memoryPostsCache: Post[] | null = null;
const TMP_POSTS_FILE = path.join(require("os").tmpdir(), "dongphong_posts.json");

/**
 * Đọc danh sách tất cả bài viết trực tiếp từ Cloudinary / data/posts.json / bộ nhớ /tmp trên Vercel
 */
export async function getAllPosts(): Promise<Post[]> {
  if (memoryPostsCache && memoryPostsCache.length > 0) {
    return memoryPostsCache;
  }

  // 1. Thử đọc từ Cloudinary đám mây nếu có CLOUD_NAME (dữ liệu mới nhất trên Vercel)
  if (CLOUD_NAME) {
    try {
      const cloudUrl = `https://res.cloudinary.com/${CLOUD_NAME}/raw/upload/dongphong_data/posts.json?t=${Date.now()}`;
      const res = await fetch(cloudUrl, { cache: "no-store" });
      if (res.ok) {
        const cloudPosts = await res.json();
        if (Array.isArray(cloudPosts) && cloudPosts.length > 0) {
          memoryPostsCache = cloudPosts;
          return cloudPosts;
        }
      }
    } catch {}
  }

  // 2. Thử đọc từ /tmp (nếu đang chạy trên Vercel và đã được ghi tạm)
  try {
    const tmpContent = await fs.readFile(TMP_POSTS_FILE, "utf-8");
    const posts: Post[] = JSON.parse(tmpContent);
    if (Array.isArray(posts) && posts.length > 0) {
      memoryPostsCache = posts;
      return posts;
    }
  } catch {}

  // 3. Đọc trực tiếp từ file data/posts.json
  try {
    const fileContent = await fs.readFile(POSTS_FILE, "utf-8");
    const posts: Post[] = JSON.parse(fileContent);
    if (Array.isArray(posts) && posts.length > 0) {
      memoryPostsCache = posts;
      return posts;
    }
  } catch (error) {
    console.warn("[Posts Server Layer] Không thể đọc trực tiếp data/posts.json:", error);
  }

  // 3. Fallback tĩnh từ module bundle
  try {
    const fallback = require("@/data/posts.json");
    return Array.isArray(fallback) ? fallback : [];
  } catch {
    return [];
  }
}

/**
 * Lấy danh sách bài viết đã xuất bản (status = 'published')
 */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((p) => p.status === "published");
}

/**
 * Lấy các bài viết mới nhất (cho Trang chủ hoặc Sidebar)
 */
export async function getLatestPosts(limit = 2): Promise<Post[]> {
  const published = await getPublishedPosts();
  const sorted = [...published].sort((a, b) => {
    const dateA = new Date(a.publishedAt || 0).getTime();
    const dateB = new Date(b.publishedAt || 0).getTime();
    return dateB - dateA;
  });
  return sorted.slice(0, limit);
}

/**
 * Tìm bài viết theo slug hoặc id
 */
export async function getPostBySlug(rawSlug: string): Promise<Post | undefined> {
  if (!rawSlug) return undefined;
  const decoded = decodeURIComponent(rawSlug).trim().toLowerCase();
  const posts = await getAllPosts();
  return (
    posts.find((p) => p.slug.toLowerCase() === decoded) ||
    posts.find((p) => p.id.toLowerCase() === decoded)
  );
}

/**
 * Lưu danh sách bài viết vào data/posts.json (hoặc /tmp trên Vercel) và xóa cache trang công khai
 */
export async function savePosts(posts: Post[]): Promise<{ success: boolean; total: number }> {
  memoryPostsCache = posts;

  // 1. Nếu có Cloudinary, đồng bộ thẳng lên Cloudinary Raw Storage đám mây
  if (isCloudinaryConfigured) {
    try {
      const base64Data = `data:application/json;base64,${Buffer.from(JSON.stringify(posts, null, 2)).toString("base64")}`;
      await cloudinary.uploader.upload(base64Data, {
        resource_type: "raw",
        public_id: "dongphong_data/posts.json",
        overwrite: true,
        invalidate: true,
      });
      console.log("[Posts Server Layer] Đã lưu và đồng bộ posts.json lên Cloudinary Raw Storage thành công");
    } catch (cloudErr: any) {
      console.warn("[Posts Server Layer] Lỗi tải posts.json lên Cloudinary:", cloudErr.message);
    }
  }

  // 2. Thử lưu vào data/posts.json trên đĩa cục bộ (Localhost)
  try {
    const dataDir = path.dirname(POSTS_FILE);
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(POSTS_FILE, JSON.stringify(posts, null, 2), "utf-8");
  } catch (err: any) {
    // 3. Nếu đĩa read-only trên Vercel, lưu tạm vào thư mục /tmp
    console.warn("[Posts Server Layer] Ổ đĩa Read-Only (Vercel), lưu vào /tmp:", err.message);
    try {
      await fs.writeFile(TMP_POSTS_FILE, JSON.stringify(posts, null, 2), "utf-8");
    } catch {}
  }

  // Kích hoạt on-demand revalidation để Next.js cập nhật trang chủ và trang bài viết ngay lập tức
  try {
    revalidatePath("/");
    revalidatePath("/bai-viet");
    revalidatePath("/bai-viet/[slug]", "page");
  } catch (err) {
    console.warn("[Posts Server Layer] Không thể revalidate path:", err);
  }

  return { success: true, total: posts.length };
}

