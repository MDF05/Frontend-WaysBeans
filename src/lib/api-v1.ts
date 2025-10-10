import axios from "axios";

export const apiV1 = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API,
});

apiV1.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const adminApi = {
  async getAnalytics(range: "daily" | "weekly" | "monthly" | "yearly") {
    const res = await apiV1.get(`/admin/analytics`, { params: { range } });
    return res.data;
  },
  async getSalesHistory(range: "daily" | "weekly" | "monthly", limit = 50) {
    const res = await apiV1.get(`/admin/sales-history`, { params: { range, limit } });
    return res.data;
  },
};
