import { apiClient } from "./client";

export interface ProductFilterParams {
  category?: string;
  woodType?: string;
  priceRange?: string;
  search?: string;
  status?: "DRAFT" | "PUBLISHED";
  featured?: boolean;
  page?: number;
  limit?: number;
  sort?: string;
}

export const productApi = {
  getProducts: async (params?: ProductFilterParams) => {
    return apiClient<any>("/products", { params: params as any });
  },

  getFeatured: async () => {
    return apiClient<any>("/products/featured");
  },

  getBySlug: async (slug: string) => {
    return apiClient<any>(`/products/${slug}`);
  },

  getAdminProducts: async (params?: ProductFilterParams) => {
    return apiClient<any>("/products/admin/list", { params: params as any });
  },

  getById: async (id: string) => {
    return apiClient<any>(`/products/admin/${id}`);
  },

  create: async (data: any) => {
    return apiClient<any>("/products", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: any) => {
    return apiClient<any>(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  toggleFeatured: async (id: string) => {
    return apiClient<any>(`/products/${id}/featured`, {
      method: "PATCH",
    });
  },

  delete: async (id: string) => {
    return apiClient<any>(`/products/${id}`, {
      method: "DELETE",
    });
  },
};
