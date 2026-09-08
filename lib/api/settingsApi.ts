import { apiClient } from "./client";

export const settingsApi = {
  getSettings: async () => {
    return apiClient<any>("/settings");
  },

  updateSettings: async (data: any) => {
    return apiClient<any>("/settings", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
};
