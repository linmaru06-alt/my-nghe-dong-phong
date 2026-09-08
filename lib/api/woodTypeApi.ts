import { apiClient } from "./client";

export const woodTypeApi = {
  getAll: async () => {
    return apiClient<any>("/wood-types");
  },

  getBySlug: async (slug: string) => {
    return apiClient<any>(`/wood-types/${slug}`);
  },

  create: async (data: any) => {
    return apiClient<any>("/wood-types", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: any) => {
    return apiClient<any>(`/wood-types/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return apiClient<any>(`/wood-types/${id}`, {
      method: "DELETE",
    });
  },
};
