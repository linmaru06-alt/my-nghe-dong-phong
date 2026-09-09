import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

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
 * Đọc danh sách tất cả bài viết trực tiếp từ file data/posts.json hoặc bộ nhớ /tmp trên Vercel
 */
export async function getAllPosts(): Promise<Post[]> {
  if (memoryPostsCache && memoryPostsCache.length > 0) {
    return memoryPostsCache;
  }

  // 1. Thử đọc từ /tmp (nếu đang chạy trên Vercel và đã được ghi tạm)
  try {
    const tmpContent = await fs.readFile(TMP_POSTS_FILE, "utf-8");
    const posts: Post[] = JSON.parse(tmpContent);
    if (Array.isArray(posts) && posts.length > 0) {
      memoryPostsCache = posts;
      return posts;
    }
  } catch {}

  // 2. Đọc trực tiếp từ file data/posts.json
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

  // 1. Thử lưu vào data/posts.json trên đĩa cục bộ
  try {
    const dataDir = path.dirname(POSTS_FILE);
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(POSTS_FILE, JSON.stringify(posts, null, 2), "utf-8");
  } catch (err: any) {
    // 2. Nếu đĩa read-only trên Vercel, lưu tạm vào thư mục /tmp
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

