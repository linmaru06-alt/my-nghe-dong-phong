import { apiClient } from "./client";

export const authApi = {
  login: async (credentials: { email: string; password: string }) => {
    const res = await apiClient<any>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    if (res.data?.accessToken && typeof window !== "undefined") {
      localStorage.setItem("dongphong_admin_token", res.data.accessToken);
    }
    return res;
  },

  me: async () => {
    return apiClient<any>("/auth/me");
  },

  logout: async () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("dongphong_admin_token");
    }
    return apiClient<any>("/auth/logout", {
      method: "POST",
    });
  },

  changePassword: async (data: { currentPassword: string; newPassword: string }) => {
    return apiClient<any>("/auth/change-password", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
};
