import { apiClient } from "./client";

export interface PostFilterParams {
  category?: string;
  search?: string;
  status?: "DRAFT" | "PUBLISHED";
  page?: number;
  limit?: number;
}

export const postApi = {
  getPosts: async (params?: PostFilterParams) => {
    return apiClient<any>("/posts", { params: params as any });
  },

  getBySlug: async (slug: string) => {
    return apiClient<any>(`/posts/${slug}`);
  },

  getAdminPosts: async (params?: PostFilterParams) => {
    return apiClient<any>("/posts/admin/list", { params: params as any });
  },

  getById: async (id: string) => {
    return apiClient<any>(`/posts/admin/${id}`);
  },

  create: async (data: any) => {
    return apiClient<any>("/posts", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: any) => {
    return apiClient<any>(`/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return apiClient<any>(`/posts/${id}`, {
      method: "DELETE",
    });
  },
};
