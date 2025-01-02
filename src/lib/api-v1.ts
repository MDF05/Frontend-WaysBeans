import axios from "axios";

export const apiV1 = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API,
});

apiV1.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
