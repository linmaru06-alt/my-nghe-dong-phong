import { create } from "zustand";
import initialPosts from "../data/posts.json";

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

interface PostsState {
  posts: Post[];
  isLoaded: boolean;
  loadPosts: () => Promise<void>;
  getPostBySlug: (slug: string) => Post | undefined;
  getPostById: (id: string) => Post | undefined;
  savePost: (post: Post) => Promise<boolean>;
  addPost: (post: Post) => Promise<boolean>;
  updatePost: (id: string, post: Partial<Post>) => Promise<boolean>;
  deletePost: (id: string) => Promise<boolean>;
  resetToDefault: () => Promise<void>;
}

const STORAGE_KEY = "dongphong_posts_v2";

async function syncPostsToBackend(posts: Post[]): Promise<boolean> {
  if (typeof window === "undefined") return false;
  try {
    const res = await fetch("/api/admin/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ posts }),
    });
    if (!res.ok) {
      console.warn("[usePosts] API đồng bộ disk trả về mã lỗi:", res.status);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("[usePosts] Không thể đồng bộ bài viết vào backend disk:", err);
    return false;
  }
}

export const usePostsStore = create<PostsState>((set, get) => ({
  posts: initialPosts as Post[],
  isLoaded: false,

  loadPosts: async () => {
    if (typeof window === "undefined") return;
    try {
      const res = await fetch("/api/admin/posts", { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const localStored = localStorage.getItem(STORAGE_KEY);
          const localTimestamp = Number(localStorage.getItem(STORAGE_KEY + "_timestamp") || 0);
          const now = Date.now();
          // Nếu có chỉnh sửa cục bộ trong 2 phút vừa qua, ưu tiên giữ lại để tránh bị đè ngược
          if (localStored && now - localTimestamp < 120000) {
            try {
              const parsed = JSON.parse(localStored);
              if (Array.isArray(parsed) && parsed.length > 0) {
                set({ posts: parsed, isLoaded: true });
                return;
              }
            } catch {}
          }
          localStorage.setItem(STORAGE_KEY, JSON.stringify(json.data));
          set({ posts: json.data, isLoaded: true });
          return;
        }
      }
    } catch (e) {
      console.warn("[usePosts] Không kết nối được API, dùng dữ liệu lưu tạm:", e);
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        set({ posts: JSON.parse(stored), isLoaded: true });
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialPosts));
        set({ posts: initialPosts as Post[], isLoaded: true });
      }
    } catch {
      set({ posts: initialPosts as Post[], isLoaded: true });
    }
  },

  getPostBySlug: (slug: string) => {
    return get().posts.find((p) => p.slug === slug);
  },

  getPostById: (id: string) => {
    return get().posts.find((p) => p.id === id);
  },

  savePost: async (post: Post) => {
    const list = [...get().posts];
    const index = list.findIndex((p) => p.id === post.id);

    if (index >= 0) {
      list[index] = post;
    } else {
      list.unshift(post);
    }

    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      localStorage.setItem(STORAGE_KEY + "_timestamp", Date.now().toString());
    }
    set({ posts: list });
    return await syncPostsToBackend(list);
  },

  addPost: async (post: Post) => {
    return await get().savePost(post);
  },

  updatePost: async (id: string, updates: Partial<Post>) => {
    const existing = get().getPostById(id);
    if (existing) {
      return await get().savePost({ ...existing, ...updates });
    }
    return false;
  },

  deletePost: async (id: string) => {
    const list = get().posts.filter((p) => p.id !== id);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      localStorage.setItem(STORAGE_KEY + "_timestamp", Date.now().toString());
    }
    set({ posts: list });
    return await syncPostsToBackend(list);
  },

  resetToDefault: async () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialPosts));
    }
    set({ posts: initialPosts as Post[] });
    await syncPostsToBackend(initialPosts as Post[]);
  },
}));

