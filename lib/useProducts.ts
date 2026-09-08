import { create } from "zustand";
import initialProducts from "../data/products.json";

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

interface ProductsState {
  products: Product[];
  isLoaded: boolean;
  loadProducts: () => void;
  getProductBySlug: (slug: string) => Product | undefined;
  getProductById: (id: string) => Product | undefined;
  saveProduct: (product: Product) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleFeatured: (id: string) => void;
  toggleStatus: (id: string) => void;
  resetToDefault: () => void;
}

const STORAGE_KEY = "dongphong_products_v2";

async function syncProductsToBackend(products: Product[]) {
  if (typeof window === "undefined") return;
  try {
    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ products }),
    });
    if (!res.ok) {
      console.warn("[useProducts] API đồng bộ disk trả về mã lỗi:", res.status);
    }
  } catch (err) {
    console.warn("[useProducts] Không thể đồng bộ sản phẩm vào backend disk:", err);
  }
}

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: initialProducts as Product[],
  isLoaded: false,

  loadProducts: async () => {
    if (typeof window === "undefined") return;
    try {
      // Thử nạp dữ liệu trực tiếp từ file data/products.json qua API
      const res = await fetch("/api/admin/products");
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(json.data));
          set({ products: json.data, isLoaded: true });
          return;
        }
      }
    } catch (e) {
      console.warn("[useProducts] Không kết nối được API, dùng dữ liệu lưu tạm:", e);
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        set({ products: JSON.parse(stored), isLoaded: true });
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
        set({ products: initialProducts as Product[], isLoaded: true });
      }
    } catch {
      set({ products: initialProducts as Product[], isLoaded: true });
    }
  },

  getProductBySlug: (slug: string) => {
    return get().products.find((p) => p.slug === slug);
  },

  getProductById: (id: string) => {
    return get().products.find((p) => p.id === id);
  },

  saveProduct: (product: Product) => {
    const list = [...get().products];
    const index = list.findIndex((p) => p.id === product.id);

    if (index >= 0) {
      list[index] = product;
    } else {
      list.unshift(product);
    }

    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }
    set({ products: list });
    syncProductsToBackend(list);
  },

  addProduct: (product: Product) => {
    get().saveProduct(product);
  },

  updateProduct: (id: string, updates: Partial<Product>) => {
    const existing = get().getProductById(id);
    if (existing) {
      get().saveProduct({ ...existing, ...updates });
    }
  },

  deleteProduct: (id: string) => {
    const list = get().products.filter((p) => p.id !== id);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }
    set({ products: list });
    syncProductsToBackend(list);
  },

  toggleFeatured: (id: string) => {
    const list = get().products.map((p) =>
      p.id === id ? { ...p, featured: !p.featured } : p
    );
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }
    set({ products: list });
    syncProductsToBackend(list);
  },

  toggleStatus: (id: string) => {
    const list = get().products.map((p) =>
      p.id === id
        ? { ...p, status: (p.status === "published" ? "draft" : "published") as "published" | "draft" }
        : p
    );
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }
    set({ products: list });
    syncProductsToBackend(list);
  },

  resetToDefault: () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
    }
    set({ products: initialProducts as Product[] });
    syncProductsToBackend(initialProducts as Product[]);
  },
}));
