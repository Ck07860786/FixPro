import axios from "axios";

const BACKEND_URL = (import.meta.env.VITE_BACKEND_URL || "http://localhost:8000").replace(/\/+$/, "");
const API_URL = (import.meta.env.VITE_API_URL || `${BACKEND_URL}/api`).replace(/\/+$/, "");

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const state = JSON.parse(
      localStorage.getItem("fixpro-auth")
    );

    const token = state?.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export default api;