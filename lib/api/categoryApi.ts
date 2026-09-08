import { apiClient } from "./client";

export const categoryApi = {
  getAll: async () => {
    return apiClient<any>("/categories");
  },

  getBySlug: async (slug: string) => {
    return apiClient<any>(`/categories/${slug}`);
  },

  create: async (data: any) => {
    return apiClient<any>("/categories", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: any) => {
    return apiClient<any>(`/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return apiClient<any>(`/categories/${id}`, {
      method: "DELETE",
    });
  },
};
