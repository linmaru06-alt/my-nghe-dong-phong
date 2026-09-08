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
  loadPosts: () => void;
  getPostBySlug: (slug: string) => Post | undefined;
  getPostById: (id: string) => Post | undefined;
  savePost: (post: Post) => void;
  addPost: (post: Post) => void;
  updatePost: (id: string, post: Partial<Post>) => void;
  deletePost: (id: string) => void;
  resetToDefault: () => void;
}

const STORAGE_KEY = "dongphong_posts_v2";

export const usePostsStore = create<PostsState>((set, get) => ({
  posts: initialPosts as Post[],
  isLoaded: false,

  loadPosts: () => {
    if (typeof window === "undefined") return;
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

  savePost: (post: Post) => {
    const list = [...get().posts];
    const index = list.findIndex((p) => p.id === post.id);

    if (index >= 0) {
      list[index] = post;
    } else {
      list.unshift(post);
    }

    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }
    set({ posts: list });
  },

  addPost: (post: Post) => {
    get().savePost(post);
  },

  updatePost: (id: string, updates: Partial<Post>) => {
    const existing = get().getPostById(id);
    if (existing) {
      get().savePost({ ...existing, ...updates });
    }
  },

  deletePost: (id: string) => {
    const list = get().posts.filter((p) => p.id !== id);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }
    set({ posts: list });
  },

  resetToDefault: () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialPosts));
    }
    set({ posts: initialPosts as Post[] });
  },
}));
