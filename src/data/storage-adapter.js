import { initialProducts } from "./products";
import { initialArticles } from "./articles";
import { categories } from "./categories";
import { woodTypes } from "./wood-types";
import { siteConfig } from "../config/site-config";

const STORAGE_KEYS = {
  PRODUCTS: "dongphong_products_v1",
  ARTICLES: "dongphong_articles_v1",
  CONFIG: "dongphong_config_v1"
};

/**
 * StorageAdapter quản lý dữ liệu sản phẩm, bài viết và cấu hình thương hiệu.
 * Hỗ trợ lưu trữ persistent qua LocalStorage và tự động fallback về bộ dữ liệu mẫu chuẩn.
 */
class StorageAdapter {
  constructor() {
    this.init();
  }

  init() {
    if (typeof window === "undefined") return;

    if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(initialProducts));
    }

    if (!localStorage.getItem(STORAGE_KEYS.ARTICLES)) {
      localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(initialArticles));
    }

    if (!localStorage.getItem(STORAGE_KEYS.CONFIG)) {
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(siteConfig));
    }
  }

  // --- SẢN PHẨM ---
  getProducts(filters = {}) {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      let list = raw ? JSON.parse(raw) : initialProducts;

      // Lọc trạng thái (mặc định chỉ lấy 'published' cho khách)
      if (filters.status) {
        list = list.filter(p => p.status === filters.status);
      } else if (!filters.includeDrafts) {
        list = list.filter(p => p.status === "published");
      }

      // Lọc danh mục
      if (filters.categoryId && filters.categoryId !== "all") {
        list = list.filter(p => p.categoryId === filters.categoryId);
      }

      // Lọc loại gỗ
      if (filters.woodTypeId && filters.woodTypeId !== "all") {
        list = list.filter(p => p.woodTypeId === filters.woodTypeId);
      }

      // Lọc sản phẩm nổi bật
      if (filters.featuredOnly) {
        list = list.filter(p => p.isFeatured);
      }

      // Tìm kiếm từ khóa (tên, mã SKU, mô tả, loại gỗ)
      if (filters.search) {
        const q = filters.search.toLowerCase().trim();
        list = list.filter(p =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.woodType.toLowerCase().includes(q) ||
          (p.shortDesc && p.shortDesc.toLowerCase().includes(q))
        );
      }

      return list;
    } catch (e) {
      console.error("Lỗi đọc sản phẩm:", e);
      return initialProducts;
    }
  }

  getProductById(id) {
    const list = this.getProducts({ includeDrafts: true });
    return list.find(p => p.id === id || p.sku === id) || null;
  }

  saveProduct(product) {
    const list = this.getProducts({ includeDrafts: true });
    const index = list.findIndex(p => p.id === product.id);

    if (index >= 0) {
      list[index] = { ...list[index], ...product, updatedAt: new Date().toISOString() };
    } else {
      list.unshift({
        ...product,
        id: product.id || `sp-${Date.now()}`,
        createdAt: new Date().toISOString()
      });
    }

    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(list));
    return product;
  }

  deleteProduct(id) {
    let list = this.getProducts({ includeDrafts: true });
    list = list.filter(p => p.id !== id && p.sku !== id);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(list));
    return true;
  }

  // --- BÀI VIẾT ---
  getArticles(filters = {}) {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.ARTICLES);
      let list = raw ? JSON.parse(raw) : initialArticles;

      if (filters.status) {
        list = list.filter(a => a.status === filters.status);
      } else if (!filters.includeDrafts) {
        list = list.filter(a => a.status === "published");
      }

      if (filters.group && filters.group !== "all") {
        list = list.filter(a => a.group === filters.group);
      }

      if (filters.search) {
        const q = filters.search.toLowerCase().trim();
        list = list.filter(a =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q)
        );
      }

      return list;
    } catch (e) {
      console.error("Lỗi đọc bài viết:", e);
      return initialArticles;
    }
  }

  getArticleById(idOrSlug) {
    const list = this.getArticles({ includeDrafts: true });
    return list.find(a => a.id === idOrSlug || a.slug === idOrSlug) || null;
  }

  saveArticle(article) {
    const list = this.getArticles({ includeDrafts: true });
    const index = list.findIndex(a => a.id === article.id);

    if (index >= 0) {
      list[index] = { ...list[index], ...article, updatedAt: new Date().toISOString() };
    } else {
      list.unshift({
        ...article,
        id: article.id || `bv-${Date.now()}`,
        publishedAt: new Date().toISOString()
      });
    }

    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(list));
    return article;
  }

  // --- DANH MỤC & LOẠI GỖ ---
  getCategories() {
    return categories;
  }

  getWoodTypes() {
    return woodTypes;
  }

  // --- CẤU HÌNH DOANH NGHIỆP ---
  getConfig() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CONFIG);
      return raw ? JSON.parse(raw) : siteConfig;
    } catch {
      return siteConfig;
    }
  }

  updateConfig(newConfig) {
    const merged = { ...this.getConfig(), ...newConfig };
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(merged));
    return merged;
  }

  // Khôi phục dữ liệu gốc
  resetToDefaults() {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(initialProducts));
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(initialArticles));
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(siteConfig));
    return true;
  }
}

export const storage = new StorageAdapter();
